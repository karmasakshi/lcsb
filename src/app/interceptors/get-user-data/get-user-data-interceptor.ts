import { HttpHeaders, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

export const getUserDataInterceptor: HttpInterceptorFn = (req, next) => {
  const userDataApiRegex = /\/user\/[^\/]+\/data$/;

  if (req.method === 'GET' && userDataApiRegex.test(req.url)) {
    return of(new HttpResponse({
      body: { blood_pressures: [] },
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      status: 200
    }));
  }

  return next(req);
};
