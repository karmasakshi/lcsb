import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lcsb-bp-page',
  imports: [],
  templateUrl: './bp-page.html',
  styleUrl: './bp-page.scss'
})
export class BpPage {

}
