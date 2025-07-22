import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChartConstructorType, HighchartsChartComponent } from 'highcharts-angular';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lcsb-bp-chart',
  imports: [MatCardModule,HighchartsChartComponent],
  templateUrl: './bp-chart.html',
  styleUrl: './bp-chart.scss',
})
export class BpChart {
  public chartOptions: Highcharts.Options;
  public chartConstructor: ChartConstructorType;
  public updateFlag: boolean;
  public oneToOneFlag: boolean;

  public constructor() {
    this.chartOptions = { };
    this.chartConstructor = 'chart';
    this.updateFlag = false;
    this.oneToOneFlag = true;
  }
}
