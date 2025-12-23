import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProjectInstance } from '../models/project-instance.model';
import { environment } from '../../../../environments/environment.development';
import { IPayloadItemOrder } from '../models/payload-item-order.model';
import { IApiResponseCollection } from '../models/api/response.models';

@Injectable({
  providedIn: 'root',
})
export class ProjectInstanceService {
  private routeApi = `${environment.baseApiUrl}/project_instances`;
  private routeCustom = `${environment.baseCustomUrl}/project_instances`;
  private httpClient = inject(HttpClient);

  constructor() {}

  // Get all ProjectInstance
  getAllProjectInstance(): Observable<IProjectInstance[]> {
    return this.httpClient.get<IApiResponseCollection<IProjectInstance>>(this.routeApi).pipe(
      map((response) => {
        return response['member'];
      }),
    );
  }

  // Get ProjectInstance by ID
  getProjectInstanceById(id: number): Observable<IProjectInstance> {
    return this.httpClient.get<IProjectInstance>(`${this.routeApi}/${id}`);
  }

  // Create a new ProjectInstance
  createProjectInstance(body: Partial<IProjectInstance>): Observable<IProjectInstance> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<IProjectInstance>(this.routeApi, body, { headers });
  }

  // Update ProjectInstance by ID
  updateProjectInstance(id: number, body: Partial<IProjectInstance>): Observable<IProjectInstance> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/merge-patch+json' });
    return this.httpClient.patch<IProjectInstance>(`${this.routeApi}/${id}`, body, { headers });
  }

  // Delete ProjectInstance
  deleteProjectInstance(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
  }

  updateProjectOrder(newOrder: IPayloadItemOrder) {
    console.log(newOrder);
    const headers = new HttpHeaders({ 'Content-Type': 'application/merge-patch+json' });
    return this.httpClient.patch<void>(`${this.routeCustom}/order`, newOrder, { headers });
  }
}
