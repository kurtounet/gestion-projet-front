import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { ICredentials, IToken } from '../models/login.model';
import { AUTH_CONFIG } from '../models/auth-config.model';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly storageService = inject(StorageService);
  private readonly http = inject(HttpClient);
  private readonly config = inject(AUTH_CONFIG);

  isLoggedIn: boolean = false;
  public roles: Array<string> = [];

  login(credentials: ICredentials): Observable<IToken> {
    return this.http
      .post<IToken>(`${this.config.baseUrl}/${this.config.loginEndpoint}`, credentials)
      .pipe(
        map((response) => {
          this.storageService.setLocalStorageToken(response.token);
          return response;
        }),
      );
  }

  register(userInfo: any): Observable<any> {
    return this.http.post(`${this.config.baseUrl}/${this.config.registerEndpoint}`, userInfo);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.config.baseUrl}/${this.config.forgotPasswordEndpoint}`, email);
  }

  isLogged(): boolean {
    const token = this.storageService.getLocalStorageToken();
    if (!token) return false;
    try {
      const decodedToken = jwtDecode<IToken>(token);
      return decodedToken.exp > Date.now() / 1000;
    } catch (error) {
      return false;
    }
  }

  logOut() {
    localStorage.removeItem(this.config.storageKey);
    this.router.navigate([this.config.loginRoute]);
  }

  private handleLoginError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("Une erreur s'est produite:", error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new ErrorEvent(error.error['message']));
  }
}
