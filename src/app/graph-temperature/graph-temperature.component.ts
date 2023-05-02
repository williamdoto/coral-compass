import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { DatabaseService } from '../database.service';
import { GenusNameCount } from '../../models/taxon';

@Component({
  selector: 'app-graph-temperature',
  templateUrl: './graph-temperature.component.html',
  styleUrls: ['./graph-temperature.component.css']
})
export class GraphTemperatureComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  db: GenusNameCount[] = []
  constructor(private dbService: DatabaseService) { }

  public temperatureOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: "Year"
        }
      },
      y: {
        title: {
          display: true,
          text: "Temperature"
        }
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      // datalabels: {
      //   anchor: 'end',
      //   align: 'end'
      // }
    }
  };
  public temperatureType: ChartType = 'line';
  public temperatureData: ChartData<'line'> = {
    datasets: [{
      data: [
        {x: 0, y: 0},
        {x: 1, y: 1}
      ]
    }]
  };

  public temperaturePlugins = [
    DatalabelsPlugin
  ];

  /**
 * Requests data on the number of samples of each species from the server and displays it on the pie chart.
 */
  loadData(): void {
    this.dbService.getTemperatures().subscribe((data: any) => {
      // Have got the data
      this.db = data;
      console.log(data); // TODO: Remove

      // Convert the data to labels and values
      // this.barChartData.labels = this.db.map(species => species._id);
      // this.barChartData.datasets[0].data = this.db.map(species => species.count);

      // Get the number of genuses in the other category.
      // this.otherGenusCount = this.db.find(value => value.genusesContained)?.genusesContained ?? 0;

      // Add the most popular genus
      // this.mostPopular = this.db[0]._id;

      this.chart?.update();
    });
  }

  ngAfterViewInit() {
    this.loadData();
  }
}
