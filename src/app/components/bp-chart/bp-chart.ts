import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  InputSignal,
  OnDestroy,
  OnInit,
  signal,
  untracked,
  WritableSignal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Chart, Options, Series } from 'highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';
import { ChartConfiguration } from '../../interfaces/chart-configuration.interface';
import { Bp } from '../../services/bp/bp';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lcsb-bp-chart',
  imports: [MatIconModule, HighchartsChartComponent],
  templateUrl: './bp-chart.html',
  styleUrl: './bp-chart.scss',
})
export class BpChart implements OnInit, OnDestroy {
  private readonly _bpService = inject(Bp);

  private readonly _binWidth: number;
  private readonly _chart: WritableSignal<undefined | Chart>;
  private _intervalId: undefined | number;
  private readonly _maxValues: number;

  public readonly bloodPressures: InputSignal<number[]> = input.required();
  public readonly chartConfiguration: InputSignal<ChartConfiguration> =
    input.required();

  public readonly liveReading: WritableSignal<number>;
  public options: Options;

  public constructor() {
    this._binWidth = 10;

    this._chart = signal(undefined);

    this._intervalId = undefined;

    this._maxValues = 100;

    this.liveReading = signal(0);

    this.options = this._getOptions();

    effect(() => {
      const chart = this._chart();

      untracked(() => {
        const bloodPressures: number[] = this.bloodPressures();

        if (!chart) {
          return;
        }

        const scatterSeries: undefined | Series = chart.get(
          'bp-data',
        ) as Series;

        if (scatterSeries) {
          scatterSeries.setData([...bloodPressures], true);
        }
      });
    });

    effect(() => {
      const chartConfiguration = this.chartConfiguration();

      untracked(() => {
        const chart: undefined | Chart = this._chart();

        if (chart) {
          chart.update(
            {
              yAxis: this._getYAxis(chartConfiguration.axisType),
              xAxis: {
                min: chartConfiguration.minimumValue,
                max: chartConfiguration.maximumValue
                  ? chartConfiguration.maximumValue - this._binWidth
                  : undefined,
              },
            },
            true,
          );
        }

        if (this._intervalId) {
          clearInterval(this._intervalId);
        }

        this._intervalId = setInterval(() => {
          this._fetchLiveReading();
        }, chartConfiguration.refreshInterval * 1000);
      });
    });
  }

  public ngOnInit(): void {
    const chartConfiguration = this.chartConfiguration();

    this.options = this._getOptions(
      chartConfiguration?.axisType,
      chartConfiguration?.minimumValue,
      chartConfiguration?.maximumValue,
    );
  }

  public ngOnDestroy(): void {
    if (this._intervalId) {
      clearInterval(this._intervalId);
    }
  }

  public setChartInstance(chart: Chart): void {
    this._chart.set(chart);
  }

  private _fetchLiveReading(): void {
    const liveReading: number = this._bpService.getRandomBloodPressure();

    this.liveReading.set(liveReading);

    const chart: undefined | Chart = this._chart();

    if (chart) {
      const scatterSeries: undefined | Series = chart.get('bp-data') as Series;

      if (scatterSeries) {
        const shouldShift: boolean =
          scatterSeries.data.length >= this._maxValues;

        scatterSeries.addPoint(liveReading, true, shouldShift);
      }
    }
  }

  private _getOptions(
    scale?: 'linear' | 'logarithmic',
    min?: number | null,
    max?: number | null,
  ): Options {
    return {
      chart: { backgroundColor: 'transparent' },
      title: {
        text: 'Systolic Blood Pressure Histogram',
        style: {
          font: 'var(--mat-sys-body-large)',
          color: 'var(--mat-sys-on-background)',
        },
      },
      xAxis: {
        title: {
          text: 'Systolic Blood Pressure',
          style: {
            font: 'var(--mat-sys-body-small)',
            color: 'var(--mat-sys-on-background)',
          },
        },
        labels: {
          style: {
            color: 'var(--mat-sys-on-background)',
            font: 'var(--mat-sys-body-small)',
          },
        },
        min,
        max,
      },
      yAxis: this._getYAxis(scale),
      legend: {
        itemStyle: {
          font: 'var(--mat-sys-body-medium)',
          color: 'var(--mat-sys-on-background)',
        },
      },
      credits: { enabled: false },
      plotOptions: {
        histogram: {
          binWidth: this._binWidth,
        },
      },
      series: [
        {
          name: 'Blood Pressure Distribution',
          type: 'histogram',
          baseSeries: 'bp-data',
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
  }

  private _getYAxis(
    scale: 'linear' | 'logarithmic' = 'linear',
  ): Options['yAxis'] {
    return {
      type: scale,
      title: {
        text: scale === 'logarithmic' ? 'Log (Frequency)' : 'Frequency',
        style: {
          font: 'var(--mat-sys-body-small)',
          color: 'var(--mat-sys-on-background)',
        },
      },
      labels: {
        style: {
          font: 'var(--mat-sys-body-small)',
          color: 'var(--mat-sys-on-background)',
        },
      },
      gridLineColor: 'var(--mat-sys-outline-variant)',
    };
  }
}
