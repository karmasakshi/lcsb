import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from "../navigation/navigation";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lcsb-app',
  imports: [RouterOutlet, Navigation],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
