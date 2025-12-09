import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { ITypeTask } from '../models/type-task.model';
import { IApiResponseCollection } from '../models/api/response.models';

@Injectable({
  providedIn: 'root',
})
export class TypeTaskService {
  private routeApi = `${environment.baseApiUrl}/type_tasks`;
  private httpClient = inject(HttpClient);

  constructor() {}

  // Get all TypeTask
  getAllTypeTask(): Observable<ITypeTask[]> {
    return this.httpClient.get<IApiResponseCollection<ITypeTask>>(this.routeApi).pipe(
      map((response) => {
        return response['member'];
      }),
    );
  }

  // Get TypeTask by ID
  getTypeTaskById(id: string): Observable<ITypeTask> {
    return this.httpClient.get<ITypeTask>(`${this.routeApi}/${id}`);
  }

  // Create a new TypeTask
  createTypeTask(body: ITypeTask): Observable<ITypeTask> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<ITypeTask>(this.routeApi, body, { headers });
  }

  // Update TypeTask by ID
  updateTypeTask(id: string, body: ITypeTask): Observable<ITypeTask> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.patch<ITypeTask>(`${this.routeApi}/${id}`, body, { headers });
  }

  // Delete TypeTask
  deleteTypeTask(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
  }
}
