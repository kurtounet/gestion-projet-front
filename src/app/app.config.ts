import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAuth } from './features/auth/providers';
import { environment } from '@env/environment.development';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from 'src/error.interceptor';
import { GlobalErrorHandler } from 'src/global-error.handler';
import { contentTypeInterceptor } from './features/dashboard/interceptor/content-type-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([contentTypeInterceptor, errorInterceptor])),
    {
      provide: GlobalErrorHandler,
      useClass: GlobalErrorHandler,
    },
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
