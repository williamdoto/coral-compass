import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { DatabaseService } from '../database.service';
import { GenusSpeciesNameCount } from '../../models/taxon';

// Based off https://valor-software.com/ng2-charts/#PieChart

@Component({
  selector: 'app-graph-pie-chart',
  templateUrl: './graph-pie-chart.component.html',
  styleUrls: ['./graph-pie-chart.component.css']
})
export class GraphPieChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  db: GenusSpeciesNameCount[] = []
  constructor(private dbService: DatabaseService) { }

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'left',
      },
      datalabels: {
        display: false
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{
      data: []
    }]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];
  public dataLimit: number = 5;

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
    this.dbService.getGenusNames(this.dataLimit).subscribe((data: any) => {
      // Have got the data
      this.db = data;
      console.log(data);

      // Convert the data to labels and values
      this.pieChartData.labels = this.db.map(species => species._id);
      this.pieChartData.datasets[0].data = this.db.map(species => species.count);

      this.chart?.update();
    });
  }

  addSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.push(['Line 1', 'Line 2', 'Line 3']);
    }

    this.pieChartData.datasets[0].data.push(400);

    this.chart?.update();
  }

  ngAfterViewInit() {
    this.loadData();
  }
}
