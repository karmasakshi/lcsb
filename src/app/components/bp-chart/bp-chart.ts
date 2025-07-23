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

  private _chart: Chart | undefined;
  private _intervalId: number | undefined;
  private readonly _liveData: WritableSignal<number[]>;
  private readonly _maxValues: number;

  public readonly bloodPressures: InputSignal<number[]> = input.required();
  public readonly chartConfiguration: InputSignal<ChartConfiguration> =
    input.required();

  public liveReading: WritableSignal<number>;
  public options: Options;

  public constructor() {
    this._chart = undefined;

    this._intervalId = undefined;

    this._liveData = signal([]);

    this._maxValues = 5;

    this.liveReading = signal(0);

    this.options = this._getOptions('linear');

    effect(() => {
      const bloodPressures = this.bloodPressures();
      const scatterSeries = this._chart?.get('bp-data') as Series | undefined;

      untracked(() => {
        if (scatterSeries) {
          scatterSeries.setData([...bloodPressures], true, true, true);
        }
      });
    });

    effect(() => {
      const scale = this.chartConfiguration().axisType || 'linear';

      if (this._chart) {
        this._chart.update(
          {
            yAxis: this._getYAxis(scale),
          },
          true,
          true,
          false,
        );
      }
    });
  }

  public ngOnInit(): void {
    this._intervalId = setInterval(() => {
      this._fetchLiveData();
    }, this.chartConfiguration().refreshInterval * 1000);
  }

  public ngOnDestroy(): void {
    if (this._intervalId) {
      clearInterval(this._intervalId);
    }
  }

  public setChart(chart: Chart): void {
    this._chart = chart;
  }

  private _fetchLiveData(): void {
    this.liveReading.set(this._bpService.getRandomBloodPressure());

    this._liveData.update((liveData) => {
      const updated = [...liveData, this.liveReading()];
      return updated.length > this._maxValues
        ? updated.slice(-this._maxValues)
        : updated;
    });

    const scatterSeries = this._chart?.get('bp-data') as Series | undefined;

    if (scatterSeries) {
      const shouldShift = scatterSeries.data.length >= this._maxValues;
      scatterSeries.addPoint(this.liveReading(), true, shouldShift, true);
    }
  }

  private _getOptions(scale: 'linear' | 'logarithmic'): Options {
    return {
      chart: {
        backgroundColor: 'transparent',
      },
      title: {
        text: 'Blood Pressure Histogram',
        style: { font: 'var(--mat-sys-body-large)' },
      },
      xAxis: {
        title: {
          text: 'Blood Pressure',
          style: { font: 'var(--mat-sys-body-small)' },
        },
        labels: { style: { font: 'var(--mat-sys-body-small)' } },
      },
      yAxis: this._getYAxis(scale),
      legend: {
        itemStyle: { font: 'var(--mat-sys-body-medium)' },
      },
      credits: { enabled: false },
      plotOptions: {
        histogram: {
          binWidth: 10,
        },
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
          data: [],
          id: 'bp-data',
          visible: false,
          showInLegend: false,
        },
      ],
    };
  }

  private _getYAxis(scale: 'linear' | 'logarithmic'): Options['yAxis'] {
    return {
      type: scale,
      title: {
        text: scale === 'logarithmic' ? 'Log(Frequency)' : 'Frequency',
        style: { font: 'var(--mat-sys-body-small)' },
      },
      labels: {
        style: { font: 'var(--mat-sys-body-small)' },
        format: '{value:.1f}',
      },
      minorTickInterval: scale === 'logarithmic' ? 0.1 : undefined,
    };
  }
}
