import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { DatabaseService } from '../database.service';
import { GenusSpeciesNameCount, GenusColourPair } from '../../models/taxon';
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

  db: GenusSpeciesNameCount[] = []
  colourScheme: string[];
  constructor(private dbService: DatabaseService, csService: GraphColourSchemeService) {
    this.colourScheme = csService.colourScheme;
  }

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
  public dataLimit: number = 20;
  public otherSpeciesCount: number = 0;
  public mostPopular: string = "";

  /**
 * Requests data on the number of samples of each species from the server and displays it on the pie chart.
 */
  loadData(genusColour: GenusColourPair): void {
    console.log("Requesting data for genus ", genusColour.genus);
    this.dbService.getSpeciesNames(this.dataLimit, genusColour.genus).subscribe((data: any) => {
      // Have got the data
      this.db = data;
      console.log(data); // TODO: Remove

      // Convert the data to labels and values
      this.barChartData.labels = this.db.map(species => species._id);
      this.barChartData.datasets[0].data = this.db.map(species => species.count);
      this.barChartData.datasets[0].backgroundColor = genusColour.colour;
      this.barChartData.datasets[0].borderColor = genusColour.colour;

      // Get the number of genuses in the other category.
      this.otherSpeciesCount = this.db.find(value => value.otherContains)?.otherContains ?? 0;

      // Add the most popular genus
      this.mostPopular = this.db[0]._id;

      this.chart?.update();
      this.genus = genusColour.genus;
    });
  }

  ngAfterViewInit() {
    this.loadData({
      genus: this.genus,
      colour: this.colourScheme[0]
    });
    this.genusSubject.pipe(
      // If already showing the data, don't request again.
      distinctUntilChanged((prev, cur) => prev.genus === cur.genus)
    ).subscribe(genus => this.loadData(genus)); // Can't just use this.loadData as the function due to issues with the `this` pointer.
  }
}
