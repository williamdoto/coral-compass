import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import 'chartjs-adapter-date-fns';
import { DatabaseService } from '../database.service';
import { Temperatures } from '../../models/temperature';
import { GraphColourSchemeService } from '../graph-colour-scheme.service';

@Component({
  selector: 'app-graph-temperature',
  templateUrl: './graph-temperature.component.html',
  styleUrls: ['./graph-temperature.component.css'],
  providers: [GraphColourSchemeService]
})
export class GraphTemperatureComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  db: Temperatures[] = []
  colourScheme: string[];
  constructor(private dbService: DatabaseService, csService: GraphColourSchemeService) {
    this.colourScheme = csService.colourScheme;
  }

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
      this.temperatureData.datasets = this.db.map((dataset, index) => {
        return {
          data: dataset.temperatures.map(point => {
            return {
              x: (point.x - 1970) * 365.25*24*3600*1000,
              y: point.y
            };
          }),
          label: dataset._id,
          backgroundColor: this.colourScheme[2*index+1], // Slightly darker
          borderColor: this.colourScheme[2*index]
        }
      })

      this.chart?.update();
    });
  }

  ngAfterViewInit() {
    this.loadData();
  }
}
