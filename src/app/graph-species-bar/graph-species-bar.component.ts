import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { DatabaseService } from '../database.service';
import { GenusSpeciesNameCount } from '../../models/taxon';

// Based off https://valor-software.com/ng2-charts/#PieChart

@Component({
  selector: 'app-graph-species-bar',
  templateUrl: './graph-species-bar.component.html',
  styleUrls: ['./graph-species-bar.component.css']
})
export class GraphSpeciesBarComponent {
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

  public genus: string = "Acropora";
  public dataLimit: number = 20;
  public otherSpeciesCount: number = 0;
  public mostPopular: string = "";

  /**
 * Requests data on the number of samples of each species from the server and displays it on the pie chart.
 */
  loadData(): void {
    this.dbService.getSpeciesNames(this.dataLimit, this.genus).subscribe((data: any) => {
      // Have got the data
      this.db = data;
      console.log(data); // TODO: Remove

      // Convert the data to labels and values
      this.barChartData.labels = this.db.map(species => species._id);
      this.barChartData.datasets[0].data = this.db.map(species => species.count);

      // Get the number of genuses in the other category.
      this.otherSpeciesCount = this.db.find(value => value.otherContains)?.otherContains ?? 0;

      // Add the most popular genus
      this.mostPopular = this.db[0]._id;

      this.chart?.update();
    });
  }

  ngAfterViewInit() {
    this.loadData();
  }
}
