// import { HttpInterceptorFn } from '@angular/common/http';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, Observable, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  // Injection des services
  const authService = inject(AuthService);
  const router = inject(Router);
  const storageService = inject(StorageService);

  // Récuperation du token dans le localStorage
  const token = storageService.getLocalStorageToken();
  if (token) {
    // Ajout du token dans le header
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }
  return next(req).pipe(
    catchError((error) => {
      // Si l'utilisateur n'est pas autorisé.
      if (error.status === 401) {
        authService.logOut();
      }
      return throwError(error);
    }),
  );
}
