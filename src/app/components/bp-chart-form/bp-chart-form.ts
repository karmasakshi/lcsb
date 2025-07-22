import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lcsb-bp-chart-form',
  imports: [],
  templateUrl: './bp-chart-form.html',
  styleUrl: './bp-chart-form.scss',
})
export class BpChartForm {}
