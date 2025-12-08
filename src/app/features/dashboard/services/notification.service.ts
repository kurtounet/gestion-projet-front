import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { INotification } from '../models/notification.model';
export interface IHydraCollection<T> {
  'hydra:member': T[];
  'hydra:totalItems': number;
}

@Injectable({
  providedIn: 'root',
})
export class Notification3Service {
  private routeApi = `${environment.baseApiUrl}/notification3`;
  private httpClient = inject(HttpClient);

  constructor() {}

  // Get all Notification3
  getAllNotification3(): Observable<INotification[]> {
    return this.httpClient.get<IHydraCollection<INotification>>(this.routeApi).pipe(
      map((response) => {
        return response['hydra:member'];
      }),
    );
  }

  // Get Notification3 by ID
  getNotification3ById(id: string): Observable<INotification> {
    return this.httpClient.get<INotification>(`${this.routeApi}/${id}`);
  }

  // Create a new Notification3
  createNotification3(body: INotification): Observable<INotification> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<INotification>(this.routeApi, body, { headers });
  }

  // Update Notification3 by ID
  updateNotification3(id: string, body: INotification): Observable<INotification> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.patch<INotification>(`${this.routeApi}/${id}`, body, { headers });
  }

  // Delete Notification3
  deleteNotification3(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
  }
}
