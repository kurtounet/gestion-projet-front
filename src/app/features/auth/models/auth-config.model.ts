export interface AuthConfig {
  baseUrl: string;
  loginEndpoint: string;
  registerEndpoint: string;
  forgotPasswordEndpoint: string;
  storageKey: string;
  defaultRedirectUrl: string;
  loginRoute: string;
}

import { InjectionToken } from '@angular/core';

export const AUTH_CONFIG = new InjectionToken<AuthConfig>('AUTH_CONFIG');
