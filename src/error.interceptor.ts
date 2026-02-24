// error.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
// Supposons que vous ayez un service de notification
// import { NotificationService } from './services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  // const notify = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Une erreur réseau est survenue';

      if (error.status === 401) message = 'Session expirée, veuillez vous reconnecter.';
      if (error.status === 403) message = 'Accès refusé.';
      if (error.status === 500) message = 'Erreur interne du serveur.';

      console.error(`[HTTP Error ${error.status}]:`, error.message);

      // Optionnel: notify.showError(message);

      return throwError(() => new Error(message));
    }),
  );
};
