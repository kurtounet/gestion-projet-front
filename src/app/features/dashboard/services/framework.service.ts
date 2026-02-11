import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IFramework } from '../models/framework.model';
import { environment } from '../../../../environments/environment.development';
import { IPayloadItemOrder } from '../models/payload-item-order.model';
import { IApiResponseCollection } from '../models/api/response.models';

@Injectable({
  providedIn: 'root',
})
export class FrameworkService {
  private routeApi = `${environment.baseApiUrl}/frameworks`;
  private routeCustom = `${environment.baseCustomUrl}/frameworks`;
  private httpClient = inject(HttpClient);

  constructor() {}

  // Get all Framework
  getAllFramework(): Observable<IFramework[]> {
    return this.httpClient.get<IApiResponseCollection<IFramework>>(this.routeApi).pipe(
      map((response) => {
        return response['member'];
      }),
    );
  }

  // Get Framework by ID
  getFrameworkById(id: number): Observable<IFramework> {
    return this.httpClient.get<IFramework>(`${this.routeApi}/${id}`);
  }

  // Create a new Framework
  createFramework(body: Partial<IFramework>): Observable<IFramework> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<IFramework>(this.routeApi, body, { headers });
  }

  // Update Framework by ID
  updateFramework(id: string, body: Partial<IFramework>): Observable<IFramework> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/merge-patch+json' });
    return this.httpClient.patch<IFramework>(`${this.routeApi}/${id}`, body, { headers });
  }

  // Delete Framework
  deleteFramework(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
  }
}
