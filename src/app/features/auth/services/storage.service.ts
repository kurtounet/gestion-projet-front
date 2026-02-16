import { inject, Injectable } from '@angular/core';
import { AUTH_CONFIG } from '../models/auth-config.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly config = inject(AUTH_CONFIG);

  public setLocalStorageToken(token: string): void {
    localStorage.setItem(this.config.storageKey, token);
  }

  public getLocalStorageToken(): string | null {
    return localStorage.getItem(this.config.storageKey);
  }
}
