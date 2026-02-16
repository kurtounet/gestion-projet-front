import { CanActivateFn, CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AUTH_CONFIG } from '../models/auth-config.model';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const config = inject(AUTH_CONFIG);

  if (authService.isLogged()) {
    return true;
  } else {
    router.navigate([config.loginRoute]);
    return false;
  }
};

export const authMatchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const config = inject(AUTH_CONFIG);

  if (authService.isLogged()) {
    return true;
  }

  router.navigate([config.loginRoute]);
  return false;
};
