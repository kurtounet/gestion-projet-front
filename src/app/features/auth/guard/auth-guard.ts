import { CanActivateFn, CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLogged()) {
    return true;
  } else {
    router.navigate(['auth/login']);
    return false;
  }
};


export const authMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLogged()) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
