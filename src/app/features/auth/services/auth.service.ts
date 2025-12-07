import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILogin } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = 'http://localhost:3000/api/auth'; // replace with your backend URL

  private readonly http = inject(HttpClient);

  login(credentials: ILogin): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  register(userInfo: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userInfo);
  }

  forgotPassword(email: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, email);
  }

  logout() {
    // implement logout logic here
  }
}
