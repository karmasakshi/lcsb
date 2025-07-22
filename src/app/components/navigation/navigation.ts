import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { Session } from '../../interfaces/session';
import { User } from '../../services/user/user';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lcsb-navigation',
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, RouterLink],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss'
})
export class Navigation {
  private readonly _router = inject(Router);
  private readonly _userService = inject(User);

  public session: Signal<null | Session>

  public constructor() {
    this.session = this._userService.session;
  }

  public signOut(): void {
    this._userService.signOut();
    this._router.navigateByUrl('');
  }
}
