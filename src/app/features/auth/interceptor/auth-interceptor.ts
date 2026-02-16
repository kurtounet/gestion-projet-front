import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { AUTH_CONFIG } from '../models/auth-config.model';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const storageService = inject(StorageService);
  const config = inject(AUTH_CONFIG);

  const token = storageService.getLocalStorageToken();

  // On n'ajoute le token que si la requête commence par la baseUrl configurée
  if (token && req.url.startsWith(config.baseUrl)) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req).pipe(
    catchError((error) => {
      // Si l'utilisateur n'est pas autorisé (401)
      if (error.status === 401) {
        authService.logOut();
      }
      return throwError(() => error);
    }),
  );
}
