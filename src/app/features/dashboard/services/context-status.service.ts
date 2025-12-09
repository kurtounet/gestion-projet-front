import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { IContextStatus } from '../models/context-status.model';
import { IApiResponseCollection } from '../models/api/response.models';

@Injectable({
  providedIn: 'root',
})
export class ContextStatusService {
  private routeApi = `${environment.baseApiUrl}/contextstatus`;
  private httpClient = inject(HttpClient);

  constructor() {}

  // Get all ContextStatus
  getAllContextStatus(): Observable<IContextStatus[]> {
    return this.httpClient.get<IApiResponseCollection<IContextStatus>>(this.routeApi).pipe(
      map((response) => {
        return response['member'];
      }),
    );
  }

  // Get ContextStatus by ID
  getContextStatusById(id: string): Observable<IContextStatus> {
    return this.httpClient.get<IContextStatus>(`${this.routeApi}/${id}`);
  }

  // Create a new ContextStatus
  createContextStatus(body: IContextStatus): Observable<IContextStatus> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<IContextStatus>(this.routeApi, body, { headers });
  }

  // Update ContextStatus by ID
  updateContextStatus(id: string, body: IContextStatus): Observable<IContextStatus> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.patch<IContextStatus>(`${this.routeApi}/${id}`, body, { headers });
  }

  // Delete ContextStatus
  deleteContextStatus(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
  }
}
