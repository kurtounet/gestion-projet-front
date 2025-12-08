import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { ITaskTemplate } from '../models/task-template.model';
export interface IHydraCollection<T> {
  'hydra:member': T[];
  'hydra:totalItems': number;
}

@Injectable({
  providedIn: 'root',
})
export class TaskTemplateService {
  private routeApi = `${environment.baseApiUrl}/tasktemplate`;
  private httpClient = inject(HttpClient);

  constructor() {}

  // Get all TaskTemplate
  getAllTaskTemplate(): Observable<ITaskTemplate[]> {
    return this.httpClient.get<IHydraCollection<ITaskTemplate>>(this.routeApi).pipe(
      map((response) => {
        return response['hydra:member'];
      }),
    );
  }

  // Get TaskTemplate by ID
  getTaskTemplateById(id: string): Observable<ITaskTemplate> {
    return this.httpClient.get<ITaskTemplate>(`${this.routeApi}/${id}`);
  }

  // Create a new TaskTemplate
  createTaskTemplate(body: ITaskTemplate): Observable<ITaskTemplate> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<ITaskTemplate>(this.routeApi, body, { headers });
  }

  // Update TaskTemplate by ID
  updateTaskTemplate(id: string, body: ITaskTemplate): Observable<ITaskTemplate> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.patch<ITaskTemplate>(`${this.routeApi}/${id}`, body, { headers });
  }

  // Delete TaskTemplate
  deleteTaskTemplate(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
  }
}
