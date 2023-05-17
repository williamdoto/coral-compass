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

  /**
   * Options and settings for the temperature graph.
   */
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
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}°C`
        }
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
  * Requests data on the temperature and displays it.
  */
  loadData(): void {
    this.dbService.getTemperatures().subscribe((data: any) => {
      // Have got the data
      this.db = data;

      // Convert the data to labels and values
      this.temperatureData.datasets = this.db.map((dataset, index) => {
        // For each region, create the series on the graph.
        return {
          // Create the array of points in the format {x: unix timestamp in ms, y: temperature}
          data: dataset.temperatures.map(point => {
            return {
              x: (point.x - 1970) * 365.25*24*3600*1000, // Convert years to unix time in ms.
              y: point.y
            };
          }),
          label: dataset._id,
          backgroundColor: this.colourScheme[2*index+1], // Slightly darker than the
          borderColor: this.colourScheme[2*index]
        }
      })

      // Draw the changes on the screen.
      this.chart?.update();
    });
  }

  /**
   * Loads the data on page load.
   */
  ngAfterViewInit() {
    this.loadData();
  }
}
