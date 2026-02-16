import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { AuthConfig, AUTH_CONFIG } from './models/auth-config.model';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptor/auth-interceptor';

export function provideAuth(config: AuthConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: AUTH_CONFIG, useValue: config },
    provideHttpClient(withInterceptors([authInterceptor])),
  ]);
}
