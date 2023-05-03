import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { DatabaseService } from '../database.service';
import { GenusSpeciesNameCount } from '../../models/taxon';

// Based off https://valor-software.com/ng2-charts/#PieChart

@Component({
  selector: 'app-graph-genus-bar',
  templateUrl: './graph-genus-bar.component.html',
  styleUrls: ['./graph-genus-bar.component.css']
})
export class GraphGenusBarComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  db: GenusSpeciesNameCount[] = []
  constructor(private dbService: DatabaseService) { }

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

  public dataLimit: number = 20;
  public otherGenusCount: number = 0;
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
      this.barChartData.labels = this.db.map(genus => genus._id);
      this.barChartData.datasets[0].data = this.db.map(genus => genus.count);

      // Get the number of genuses in the other category.
      this.otherGenusCount = this.db.find(value => value.otherContains)?.otherContains ?? 0;

      // Add the most popular genus
      this.mostPopular = this.db[0]._id;

      this.chart?.update();
    });
  }

  ngAfterViewInit() {
    this.loadData();
  }
}
