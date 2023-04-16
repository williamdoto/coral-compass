import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { DatabaseService } from '../database.service';

// Based off https://valor-software.com/ng2-charts/#PieChart
type ScientificNameCount = {
  _id: string;
  count: number;
};

@Component({
  selector: 'app-graph-species-bar',
  templateUrl: './graph-species-bar.component.html',
  styleUrls: ['./graph-species-bar.component.css']
})
export class GraphSpeciesBarComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  db: ScientificNameCount[] = []
  constructor(private dbService: DatabaseService) { }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
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
    }
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

  /**
 * Requests data on the number of samples of each species from the server and displays it on the pie chart.
 */
  loadData(): void {
    this.dbService.getScientificNames().subscribe((data: any) => {
      // Have got the data
      this.db = data;
      console.log(data);

      // Convert the data to labels and values
      this.barChartData.labels = this.db.map(species => species._id);
      this.barChartData.datasets[0].data = this.db.map(species => species.count);

      this.chart?.update();
    });
  }

  ngAfterViewInit() {
    this.loadData();
  }
}
