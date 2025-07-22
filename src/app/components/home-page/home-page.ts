import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { Session } from '../../interfaces/session';
import { User } from '../../services/user/user';
import { SignInForm } from '../sign-in-form/sign-in-form';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lcsb-home-page',
  imports: [SignInForm],
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
