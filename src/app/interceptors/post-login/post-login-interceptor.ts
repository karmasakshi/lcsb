import { HttpInterceptorFn } from '@angular/common/http';

export const postLoginInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
