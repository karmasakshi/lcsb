import { HttpInterceptorFn } from '@angular/common/http';

export const getUserDataInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
