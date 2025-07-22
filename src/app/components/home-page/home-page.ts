import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Session } from '../../interfaces/session';
import { User } from '../../services/user/user';
import { SignInForm } from '../sign-in-form/sign-in-form';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lcsb-home-page',
  imports: [NgOptimizedImage,RouterLink,MatButtonModule,MatCardModule,SignInForm],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private readonly _userService = inject(User);

  public readonly session: Signal<null | Session>;

  public constructor() {
    this.session = this._userService.session;
  }
}
