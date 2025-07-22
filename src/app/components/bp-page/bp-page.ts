import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BpChart } from "../bp-chart/bp-chart";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lcsb-bp-page',
  imports: [BpChart],
  templateUrl: './bp-page.html',
  styleUrl: './bp-page.scss',
})
export class BpPage {
  public bloodPressures: number[];

  public constructor(){
    this.bloodPressures = [112, 118, 120, 123, 119, 115, 127, 130, 125, 121, 116, 128, 124, 122, 126, 129, 117, 110, 113, 114];
  }
}
