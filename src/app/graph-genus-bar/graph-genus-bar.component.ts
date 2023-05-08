import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { DatabaseService } from '../database.service';
import { TaxonCountMany, GenusColourPair } from '../../models/taxon';
import { GraphColourSchemeService } from '../graph-colour-scheme.service';

// Based off https://valor-software.com/ng2-charts/#PieChart

@Component({
  selector: 'app-graph-genus-bar',
  templateUrl: './graph-genus-bar.component.html',
  styleUrls: ['./graph-genus-bar.component.css'],
  providers: [GraphColourSchemeService]
})
export class GraphGenusBarComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Events to ask for a change of genus and colour
  // Based on https://stackoverflow.com/a/54245245
  @Output() genusChangeEvent = new EventEmitter<GenusColourPair>();

  db: TaxonCountMany = {
    taxons: [],
    otherCount: 0,
    otherTaxonCount: 0
  };
  colourScheme: string[];


  constructor(private dbService: DatabaseService, csService: GraphColourSchemeService) { 
    this.colourScheme = csService.colourScheme;
    this.barChartData.datasets[0].backgroundColor = this.colourScheme;
    this.barChartData.datasets[0].borderColor = this.colourScheme;
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
      data: [],
      backgroundColor: [],
      borderColor: []
    }],
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DatalabelsPlugin
  ];

  /**
   * Event that handles a bar being clicked to change the genus displayed on the filter graph.
   */
  public chartClicked({ event, active }: { event?: ChartEvent, active?: { index?: number }[] }): void {
    // console.log(event, active);
    if (active && active.length > 0 && active[0].index !== undefined && this.barChartData.labels) {
      const genus: string = <string>this.barChartData.labels[active[0].index];
      const colour: string = this.colourScheme[active[0].index];
      console.log(`Emitting event to change to genus '${genus}'`);
      this.genusChangeEvent.emit({
        genus: genus,
        colour: colour
      });
    }
  }

  public dataLimit: number = 20;
  public otherGenusCount: number = 0;
  public otherCount: number = 0;
  public mostPopular: string = "";

  /**
 * Requests data on the number of samples of each genus from the server and displays it on the pie chart.
 */
  loadData(): void {
    this.dbService.getGenusNames(this.dataLimit).subscribe((data: any) => {
      // Have got the data
      this.db = data;
      console.log(data); // TODO: Remove

      // Convert the data to labels and values
      this.barChartData.labels = this.db.taxons.map(genus => genus._id);
      this.barChartData.datasets[0].data = this.db.taxons.map(genus => genus.count);

      // Get the number of genuses in the other category.
      this.otherGenusCount = this.db.otherTaxonCount;
      this.otherCount = this.db.otherCount;

      // Add the most popular genus
      this.mostPopular = this.db.taxons[0]._id;

      this.chart?.update();
    });
  }

  ngAfterViewInit() {
    this.loadData();
  }
}
