import { HttpClient } from '@angular/common/http';
import {
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { delay, firstValueFrom, tap } from 'rxjs';
import { Session } from '../../interfaces/session';

@Injectable({
  providedIn: 'root',
})
export class User {
  private readonly _httpClient = inject(HttpClient);

  private readonly _session: WritableSignal<null | Session>;

  public constructor() {
    this._session = signal(null);
  }

  public get session(): Signal<null | Session> {
    return this._session.asReadonly();
  }

  public signIn(email: string, password: string): Promise<Session> {
    return firstValueFrom(
    this._httpClient
      .post<Session>('/login', { email, password })
      .pipe(
        delay(1800),
        tap(({token}) => this._session.set({token}))
      )
  );
  }

  public signOut(): void {
    this._session.set(null);
  }
}
