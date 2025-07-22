import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  InputSignal,
  untracked,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HighchartsChartComponent } from 'highcharts-angular';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lcsb-bp-chart',
  imports: [MatCardModule, HighchartsChartComponent],
  templateUrl: './bp-chart.html',
  styleUrl: './bp-chart.scss',
})
export class BpChart {
  public readonly bloodPressures: InputSignal<number[]> = input.required();

  private _scatterSeriesData: number[] = [];

  public readonly oneToOneFlag: boolean;
  public readonly options: Highcharts.Options;
  public readonly updateFlag: boolean;

  public constructor() {
    this._scatterSeriesData = [];

    this.oneToOneFlag = true;

    this.options = {
      chart: {
        backgroundColor: 'transparent',
      },
      title: {
        text: 'Blood Pressure Histogram',
        style: {
          font: 'var(--mat-sys-body-large)',
        },
      },
      xAxis: {
        title: {
          text: 'Blood Pressure',
          style: { font: 'var(--mat-sys-body-small)' },
        },
        labels: { style: { font: 'var(--mat-sys-body-small)' } },
      },
      yAxis: {
        title: {
          text: 'Frequency',
          style: { font: 'var(--mat-sys-body-small)' },
        },
        labels: { style: { font: 'var(--mat-sys-body-small)' } },
      },
      legend: {
        itemStyle: {
          font: 'var(--mat-sys-body-medium)',
        },
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: 'Blood Pressure Distribution',
          type: 'histogram',
          baseSeries: 'bp-data',
          zIndex: 1,
        },
        {
          name: 'Blood Pressure',
          type: 'scatter',
          data: this._scatterSeriesData,
          id: 'bp-data',
          marker: { radius: 2 },
          visible: false,
        },
      ],
    };

    this.updateFlag = true;

    effect(() => {
      const bloodPressures: number[] = this.bloodPressures();

      untracked(() => {
        (this.options.series![1] as Highcharts.SeriesScatterOptions).data = [...bloodPressures];
      });
    });
  }
}
