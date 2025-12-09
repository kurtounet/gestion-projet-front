import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { IStatus } from '../models/status.model';
import { IApiResponseCollection } from '../models/api/response.models';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private routeApi = `${environment.baseApiUrl}/statuses`;
  private httpClient = inject(HttpClient);

  constructor() {}

  // Get all Status
  getAllStatus(): Observable<IStatus[]> {
    return this.httpClient.get<IApiResponseCollection<IStatus>>(this.routeApi).pipe(
      map((response) => {
        return response['member'];
      }),
    );
  }

  // Get Status by ID
  getStatusById(id: string): Observable<IStatus> {
    return this.httpClient.get<IStatus>(`${this.routeApi}/${id}`);
  }

  // Create a new Status
  createStatus(body: IStatus): Observable<IStatus> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<IStatus>(this.routeApi, body, { headers });
  }

  // Update Status by ID
  updateStatus(id: string, body: IStatus): Observable<IStatus> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.patch<IStatus>(`${this.routeApi}/${id}`, body, { headers });
  }

  // Delete Status
  deleteStatus(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
  }
}
