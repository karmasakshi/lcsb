import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { User } from '../../services/user/user';

export const isAuthenticatedGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userService = inject(User);

  return userService.session()
    ? true
    : router.createUrlTree(['/']);
};
