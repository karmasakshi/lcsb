import {
  HttpHeaders,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { of } from 'rxjs';

export const getUsersDataInterceptor: HttpInterceptorFn = (req, next) => {
  const userDataApiRegex = /\/users\/[^/]+\/data$/;

  if (req.method === 'GET' && userDataApiRegex.test(req.url)) {
    return of(
      new HttpResponse({
        body: {
          blood_pressures: [
            112, 118, 120, 123, 119, 115, 127, 130, 125, 121, 116, 128, 124,
            122, 126, 129, 117, 110, 113, 114,
          ],
        },
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        status: 200,
      }),
    );
  }

  return next(req);
};
