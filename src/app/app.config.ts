import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHighcharts } from 'highcharts-angular';
import { routes } from './app.routes';
import { getUsersDataInterceptor } from './interceptors/get-users-data/get-users-data-interceptor';
import { postLoginInterceptor } from './interceptors/post-login/post-login-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([postLoginInterceptor, getUsersDataInterceptor]),
    ),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideHighcharts({
      modules: () => {
        return [
          import('highcharts/esm/modules/histogram-bellcurve'),
          import('highcharts/esm/modules/accessibility'),
          import('highcharts/esm/themes/sunset'),
        ];
      },
    }),
  ],
};
