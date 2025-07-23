import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { User } from '../../services/user/user';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lcsb-sign-in-form',
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
  ],
  templateUrl: './sign-in-form.html',
  styleUrl: './sign-in-form.scss',
})
export class SignInForm {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _userService = inject(User);

  public isLoading: boolean;
  public isPasswordHidden: boolean;
  public readonly signInFormGroup: FormGroup<{
    email: FormControl<null | string>;
    password: FormControl<null | string>;
  }>;

  public constructor() {
    this.isLoading = false;

    this.isPasswordHidden = true;

    this.signInFormGroup = this._formBuilder.group({
      email: this._formBuilder.control<null | string>(null, [
        Validators.required,
        Validators.email,
      ]),
      password: this._formBuilder.control<null | string>(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  public async signIn(email: string, password: string): Promise<void> {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    this.signInFormGroup.disable();

    try {
      await this._userService.signIn(email, password);
      void this._router.navigateByUrl('/bp');
    } catch (error: unknown) {
      console.log(error);
    } finally {
      this.isLoading = false;
      this.signInFormGroup.enable();
    }
  }
}
