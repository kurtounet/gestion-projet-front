import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { IUser } from '../models/user.model';
import { IApiResponseCollection } from '../models/api/response.models';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private routeApi = `${environment.baseApiUrl}/user`;
  private httpClient = inject(HttpClient);

  constructor() {}

  // Get all User
  getAllUser(): Observable<IUser[]> {
    return this.httpClient.get<IApiResponseCollection<IUser>>(this.routeApi).pipe(
      map((response) => {
        return response['member'];
      }),
    );
  }

  // Get User by ID
  getUserById(id: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.routeApi}/${id}`);
  }

  // Create a new User
  createUser(body: IUser): Observable<IUser> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<IUser>(this.routeApi, body, { headers });
  }

  // Update User by ID
  updateUser(id: string, body: IUser): Observable<IUser> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.patch<IUser>(`${this.routeApi}/${id}`, body, { headers });
  }

  // Delete User
  deleteUser(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
  }
}
