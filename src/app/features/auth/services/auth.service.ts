import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { ICredentials, IToken } from '../models/login.model';
import { environment } from '@env/environment.development';
import { IAuthResponse } from '../models/auth-response.model';
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

  private readonly pathLogin = 'auth/login';
  private readonly baseUrl = `${environment.baseApiUrl}`;
  isLoggedIn: boolean = false;
  public roles: Array<string> = [];

  login(credentials: ICredentials): Observable<IToken> {
    return this.http.post<IToken>(`${this.baseUrl}/login_check`, credentials).pipe(
      map((response) => {
        this.storageService.setLocalStorageToken(response.token);
        return response;
      }),
    );
  }

  register(userInfo: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userInfo);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, email);
  }
  isLogged(): boolean {
    const token = this.storageService.getLocalStorageToken();
    if (!token) return false;
    try {
      const decodedToken = jwtDecode<IToken>(token);
      // this.userService.setUserRoles(decodedToken.roles);
      return decodedToken.exp > Date.now() / 1000;
    } catch (error) {
      return false;
    }
  }
  logOut() {
    localStorage.removeItem('token');
    // this.userService.setUserRoles([]);
    this.router.navigate([this.pathLogin]);
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
