import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Bp } from '../../services/bp/bp';
import { BpChart } from '../bp-chart/bp-chart';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lcsb-bp-page',
  imports: [MatCardModule, MatProgressBarModule, BpChart],
  templateUrl: './bp-page.html',
  styleUrl: './bp-page.scss',
})
export class BpPage implements OnInit {
  private readonly _bpService = inject(Bp);

  public readonly bloodPressures: WritableSignal<number[]>;
  public readonly isLoading: WritableSignal<boolean>;

  public constructor() {
    this.bloodPressures = signal([]);

    this.isLoading = signal(false);
  }

  public ngOnInit(): void {
    this.getUsersData();
  }

  public async getUsersData() {
    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);

    try {
      const { blood_pressures } = await this._bpService.getUsersData();

      this.bloodPressures.set(blood_pressures);
    } catch (error: unknown) {
      console.log(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
