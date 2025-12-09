import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { ISprintInstance } from '../models/sprint-instance.model';
import { IPayloadItemOrder } from '../models/payload-item-order.model';
import { IApiResponseCollection } from '../models/api/response.models';

@Injectable({
  providedIn: 'root',
})
export class SprintInstanceService {
  private routeApi = `${environment.baseApiUrl}/sprint_instances`;
  private routeCustom = `${environment.baseCustomUrl}/sprint_instances`;
  private httpClient = inject(HttpClient);

  constructor() {}

  // Get all SprintInstance
  getAllSprintInstance(): Observable<ISprintInstance[]> {
    return this.httpClient.get<ISprintInstance>(this.routeApi).pipe(
      map((response) => {
        return []; //response['member'];
      }),
    );
  }
  getAllSprintProjectInstance(id: number): Observable<ISprintInstance[]> {
    return this.httpClient
      .get<IApiResponseCollection<ISprintInstance>>(`${this.routeApi}?projectInstance.id=${id}`)
      .pipe(
        map((response) => {
          return response['member'];
        }),
      );
  }

  // Get SprintInstance by ID
  getSprintInstanceById(id: number): Observable<ISprintInstance> {
    return this.httpClient.get<ISprintInstance>(`${this.routeApi}/${id}`);
  }

  // Create a new SprintInstance
  createSprintInstance(body: ISprintInstance): Observable<ISprintInstance> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<ISprintInstance>(this.routeApi, body, { headers });
  }

  // Update SprintInstance by ID
  updateSprintInstance(id: string, body: ISprintInstance): Observable<ISprintInstance> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.patch<ISprintInstance>(`${this.routeApi}/${id}`, body, { headers });
  }

  // Delete SprintInstance
  deleteSprintInstance(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
  }

  updateSprintOrder(newOrder: IPayloadItemOrder) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/merge-patch+json' });
    return this.httpClient.patch<void>(`${this.routeCustom}/order`, newOrder, { headers });
  }
}
