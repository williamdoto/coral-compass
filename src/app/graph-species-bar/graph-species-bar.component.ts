import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { DatabaseService } from '../database.service';
import { TaxonCountMany, GenusColourPair } from '../../models/taxon';
import { Subject, distinctUntilChanged } from 'rxjs';
import { GraphColourSchemeService } from '../graph-colour-scheme.service';

// Based off https://valor-software.com/ng2-charts/#PieChart

@Component({
  selector: 'app-graph-species-bar',
  templateUrl: './graph-species-bar.component.html',
  styleUrls: ['./graph-species-bar.component.css'],
  providers: [GraphColourSchemeService]
})
export class GraphSpeciesBarComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() genusSubject: Subject<GenusColourPair> = new Subject();

  db: TaxonCountMany = {
    taxons: [],
    otherCount: 0,
    otherTaxonCount: 0
  };
  colourScheme: string[];
  constructor(private dbService: DatabaseService, csService: GraphColourSchemeService) {
    this.colourScheme = csService.colourScheme;
  }

  /**
   * Options for displaying the species bar chart.
   */
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Scientific name"
        }
      },
      y: {
        title: {
          display: true,
          text: "Number sampled"
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      },
      tooltip: {
        enabled: false
      }
    },
  };
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: []
    }]
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DatalabelsPlugin
  ];

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public genus: string = "Acropora";
  public dataLimit: number = 0;
  public otherSpeciesComment: string = "";
  public mostPopular: string = "";

  /**
  * Requests data on the number of samples of each species from the server and displays it on the pie chart.
  */
  loadData(genusColour: GenusColourPair): void {
    console.log("Requesting data for genus ", genusColour.genus);
    const IDEAL_DATA_LIMIT = 20;
    this.dbService.getSpeciesNames(IDEAL_DATA_LIMIT, genusColour.genus).subscribe((data: any) => {
      // Have got the data
      this.db = data;

      // Convert the data to labels and values
      this.barChartData.labels = this.db.taxons.map(species => species._id);
      this.barChartData.datasets[0].data = this.db.taxons.map(species => species.count);
      this.barChartData.datasets[0].backgroundColor = genusColour.colour;
      this.barChartData.datasets[0].borderColor = genusColour.colour;

      // Add the most popular genus
      this.mostPopular = this.db.taxons[0]._id;

      // Set the data limit to what it actually is
      this.dataLimit = this.db.taxons.length;
      this.genus = genusColour.genus;

      if (this.db.otherTaxonCount <= 0) {
        // Don't show the fact about the number of other as there aren't any
        this.otherSpeciesComment = `${this.mostPopular} is the most common species.`;
      } else {
        // Sufficiently other to show this as a fact.
        this.otherSpeciesComment = `Whilst ${this.mostPopular} is the most common species, there is significant diversity of corals. There are ${this.db.otherTaxonCount} species recorded that are not shown on this graph!`;
      }

      this.chart?.update();
    });
  }

  /**
   * Requests the initial default data and subscribes to changes send from the
   * parent component.
   */
  ngAfterViewInit() {
    // Initial default data
    this.loadData({
      genus: this.genus,
      colour: this.colourScheme[0]
    });

    // Subscribing to requesting changes of species.
    this.genusSubject.pipe(
      // If already showing the data, don't request again.
      distinctUntilChanged((prev, cur) => prev.genus === cur.genus)
    ).subscribe(genus => this.loadData(genus)); // Can't eta reduce due to issues with the `this` pointer.
  }
}
