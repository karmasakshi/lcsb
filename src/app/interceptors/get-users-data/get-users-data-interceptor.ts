import {
  HttpEvent,
  HttpHeaders,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

export const getUsersDataInterceptor: HttpInterceptorFn = (
  req,
  next,
): Observable<HttpEvent<unknown>> => {
  if (req.method === 'GET' && /\/users\/[^/]+\/data$/.test(req.url)) {
    return of(
      new HttpResponse({
        body: {
          blood_pressures: [60, 70, 80, 90, 100, 110, 120, 130, 140],
        },
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        status: 200,
      }),
    );
  }

  return next(req);
};
