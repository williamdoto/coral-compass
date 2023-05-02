import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import 'chartjs-adapter-date-fns';
import { DatabaseService } from '../database.service';
import { Temperatures } from '../../models/temperature';

@Component({
  selector: 'app-graph-temperature',
  templateUrl: './graph-temperature.component.html',
  styleUrls: ['./graph-temperature.component.css']
})
export class GraphTemperatureComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  db: Temperatures[] = []
  constructor(private dbService: DatabaseService) { }

  public temperatureOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        // https://stackoverflow.com/a/60222136
        type: 'time',
        time: {
          unit: 'year',
          tooltipFormat: 'Y'
        },
        title: {
          display: true,
          text: "Year"
        }
      },
      y: {
        title: {
          display: true,
          text: "Sea surface temperature anomaly (°C)"
        }
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        display: false
      }
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };
  public temperatureType: ChartType = 'line';
  public temperatureData: ChartData<'line'> = {
    datasets: []
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
      this.temperatureData.datasets = this.db.map(dataset => {
        return {
          data: dataset.temperatures.map(point => {
            return {
              x: (point.x - 1970) * 365.25*24*3600*1000,
              y: point.y
            };
          }),
          label: dataset._id
        }
      })

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
