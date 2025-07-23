import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ChartConfiguration } from '../../interfaces/chart-configuration.interface';
import { Bp } from '../../services/bp/bp';
import { BpChart } from '../bp-chart/bp-chart';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lcsb-bp-page',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    BpChart,
  ],
  templateUrl: './bp-page.html',
  styleUrl: './bp-page.scss',
})
export class BpPage implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _bpService = inject(Bp);

  public readonly bloodPressures: WritableSignal<number[]>;
  public readonly chartConfiguration: WritableSignal<ChartConfiguration>;
  public readonly chartConfigurationFormGroup: FormGroup<{
    axisType: FormControl<null | 'linear' | 'logarithmic'>;
    maximumValue: FormControl<null | number>;
    minimumValue: FormControl<null | number>;
    refreshInterval: FormControl<null | number>;
  }>;
  public isLoading: boolean;

  public constructor() {
    this.bloodPressures = signal([]);

    this.chartConfiguration = signal({
      axisType: 'linear',
      maximumValue: null,
      minimumValue: null,
      refreshInterval: 5,
    });

    this.chartConfigurationFormGroup = this._formBuilder.group({
      maximumValue: this._formBuilder.control<null | number>(null, [
        Validators.min(1),
      ]),
      minimumValue: this._formBuilder.control<null | number>(null, [
        Validators.min(1),
      ]),
      refreshInterval: this._formBuilder.control<null | number>(5, [
        Validators.required,
        Validators.min(1),
      ]),
      axisType: this._formBuilder.control<null | 'linear' | 'logarithmic'>(
        'linear',
        [Validators.required],
      ),
    });

    this.isLoading = false;
  }

  public ngOnInit(): void {
    this.getBloodPressures();
  }

  public async getBloodPressures() {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    this.chartConfigurationFormGroup.disable();

    try {
      const { blood_pressures } = await this._bpService.getBloodPressures();
      this.bloodPressures.set(blood_pressures);
    } catch (error: unknown) {
      console.log(error);
    } finally {
      this.isLoading = false;
      this.chartConfigurationFormGroup.enable();
    }
  }

  public setChartConfiguration(chartConfiguration: ChartConfiguration): void {
    this.chartConfiguration.set(chartConfiguration);
  }
}
