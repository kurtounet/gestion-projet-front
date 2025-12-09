import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { INotification } from '../models/notification.model';
import { IApiResponseCollection } from '../models/api/response.models';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private routeApi = `${environment.baseApiUrl}/notification3`;
  private httpClient = inject(HttpClient);

  constructor() {}

  // Get all Notification3
  getAllNotification(): Observable<INotification[]> {
    return this.httpClient.get<IApiResponseCollection<INotification>>(this.routeApi).pipe(
      map((response) => {
        return response['member'];
      }),
    );
  }

  // Get Notification3 by ID
  getNotificationById(id: string): Observable<INotification> {
    return this.httpClient.get<INotification>(`${this.routeApi}/${id}`);
  }

  // Create a new Notification3
  createNotification(body: INotification): Observable<INotification> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<INotification>(this.routeApi, body, { headers });
  }

  // Update Notification3 by ID
  updateNotification(id: string, body: INotification): Observable<INotification> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.patch<INotification>(`${this.routeApi}/${id}`, body, { headers });
  }

  // Delete Notification3
  deleteNotification(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
  }
}
