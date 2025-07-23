import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { User } from '../../services/user/user';

export const isAuthenticatedGuard: CanActivateFn = (): boolean | UrlTree => {
  const router = inject(Router);
  const userService = inject(User);

  return userService.session() ? true : router.createUrlTree(['/']);
};
