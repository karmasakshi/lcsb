import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  InputSignal,
  untracked,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Chart } from 'highcharts';
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

  private _chart: Chart | undefined;
  private readonly _styleOptions: Highcharts.Options;

  public readonly oneToOneFlag: boolean;
  public options: Highcharts.Options;
  public updateFlag: boolean;

  public constructor() {
    this._chart = undefined;

    this._styleOptions = {
      chart: {
        animation: true,
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
      plotOptions: {
        histogram: {
          binWidth: 1,
        },
      },
    };

    this.oneToOneFlag = true;

    this.options = {
      ...this._styleOptions,
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
          data: [],
          id: 'bp-data',
          visible: false,
          showInLegend: false,
        },
      ],
    };

    this.updateFlag = false;

    effect(() => {
      const bloodPressures: number[] = this.bloodPressures();

      untracked(() => {
      if (this._chart) {
        const scatterSeries = this._chart?.get(
          'bp-data',
        ) as Highcharts.Series;
        scatterSeries?.setData([...bloodPressures], true, true, false);
      } else {
        this.options = {
          ...this._styleOptions,
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
              data: [...bloodPressures],
              id: 'bp-data',
              visible: false,
              showInLegend: false,
            },
          ],
        };

        this.updateFlag = true;
      }
      });
    });
  }

  public setChart(chart: Chart): void {
    this._chart = chart;
  }
}
