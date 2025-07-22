import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BpChart } from "../bp-chart/bp-chart";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lcsb-bp-page',
  imports: [BpChart],
  templateUrl: './bp-page.html',
  styleUrl: './bp-page.scss',
})
export class BpPage {}
