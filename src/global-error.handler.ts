// global-error.handler.ts
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    // Ici, vous pouvez envoyer l'erreur vers un service de monitoring (Sentry, LogRocket)
    console.error("--- Erreur d'application détectée ---");
    console.table({
      message: error.message,
      stack: error.stack?.split('\n')[0],
      timestamp: new Date().toISOString(),
    });
  }
}
