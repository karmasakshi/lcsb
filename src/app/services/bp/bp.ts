import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, firstValueFrom } from 'rxjs';
import { UsersData } from '../../interfaces/users-data';
import { User } from '../user/user';

@Injectable({
  providedIn: 'root',
})
export class Bp {
  private readonly _httpClient = inject(HttpClient);
  private readonly _userService = inject(User);

  public getRandomBloodPressure(): number {
    const min = 90;
    const max = 140;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public getUsersData(): Promise<UsersData> {
    const token = this._userService.session()?.token ?? null;

    return firstValueFrom(
      this._httpClient.get<UsersData>(`/users/${token}/data`).pipe(delay(1800)),
    );
  }
}
