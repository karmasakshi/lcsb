import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, firstValueFrom } from 'rxjs';
import { BloodPressures } from '../../interfaces/blood-pressures';
import { User } from '../user/user';

@Injectable({
  providedIn: 'root',
})
export class Bp {
  private readonly _httpClient = inject(HttpClient);
  private readonly _userService = inject(User);

  public getBloodPressures(): Promise<BloodPressures> {
    const token: null | string = this._userService.session()?.token ?? null;

    return firstValueFrom(
      this._httpClient
        .get<BloodPressures>(`/users/${token}/data`)
        .pipe(delay(1800)),
    );
  }

  public getRandomBloodPressure(): number {
    const minimum = 90;
    const maximum = 140;

    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  }
}
