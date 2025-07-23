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
import { MatCardModule } from '@angular/material/card';
import { Chart, Options, Series } from 'highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';
import { Bp } from '../../services/bp/bp';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lcsb-bp-chart',
  imports: [MatCardModule, HighchartsChartComponent],
  templateUrl: './bp-chart.html',
  styleUrl: './bp-chart.scss',
})
export class BpChart implements OnInit, OnDestroy {
  private readonly _bpService = inject(Bp);

  private _chart: Chart | undefined;
  private _intervalId: number | undefined;
  private readonly _liveData: WritableSignal<number[]>;
  private readonly _maxValues: number;
  private readonly _updateInterval;

  public readonly bloodPressures: InputSignal<number[]> = input.required();

  public options: Options;

  public constructor() {
    this._chart = undefined;

    this._intervalId = undefined;

    this._liveData = signal([]);

    this._maxValues = 5;

    this._updateInterval = 5000;

    this.options = {
      ...this._getStyleOptions(),
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

    effect(() => {
      const bloodPressures = this.bloodPressures();
      const scatterSeries = this._chart?.get('bp-data') as Series | undefined;

      untracked(() => {
        if (scatterSeries) {
          scatterSeries.setData([...bloodPressures], true, true, true);
        }
      });
    });
  }

  public ngOnInit(): void {
    this._intervalId = setInterval(() => {
      this._fetchLiveData();
    }, this._updateInterval);
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
    const newValue = this._bpService.getRandomBloodPressure();

    this._liveData.update((liveData) => {
      const updated = [...liveData, newValue];
      return updated.length > this._maxValues
        ? updated.slice(-this._maxValues)
        : updated;
    });

    const scatterSeries = this._chart?.get('bp-data') as Series | undefined;

    if (scatterSeries) {
      const shouldShift = scatterSeries.data.length >= this._maxValues;
      scatterSeries.addPoint(newValue, true, shouldShift, true);
    }
  }

  private _getStyleOptions():Options {
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
      yAxis: {
        title: {
          text: 'Frequency',
          style: { font: 'var(--mat-sys-body-small)' },
        },
        labels: { style: { font: 'var(--mat-sys-body-small)' } },
      },
      legend: {
        itemStyle: { font: 'var(--mat-sys-body-medium)' },
      },
      credits: { enabled: false },
      plotOptions: {
        histogram: {
          binWidth: 1,
        },
      },
    };
  }
}
