import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAuth } from './features/auth/providers';
import { environment } from '@env/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAuth({
      baseUrl: environment.baseApiUrl,
      loginEndpoint: 'login_check',
      registerEndpoint: 'register',
      forgotPasswordEndpoint: 'forgot-password',
      storageKey: 'token',
      defaultRedirectUrl: 'admin',
      loginRoute: 'auth/login',
    }),
  ],
};
