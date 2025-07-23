import {
  HttpEvent,
  HttpHeaders,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

export const postLoginInterceptor: HttpInterceptorFn = (
  req,
  next,
): Observable<HttpEvent<unknown>> => {
  if (req.method === 'POST' && req.url.endsWith('/login')) {
    return of(
      new HttpResponse({
        body: { token: 'token' },
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        status: 200,
      }),
    );
  }

  return next(req);
};
