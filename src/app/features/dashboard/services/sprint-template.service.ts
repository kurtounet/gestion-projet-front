import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { ISprintTemplate } from '../models/sprint-template.model';
import { IApiResponseCollection } from '../models/api/response.models';

@Injectable({
  providedIn: 'root',
})
export class SprintTemplateService {
  private routeApi = `${environment.baseApiUrl}/sprinttemplate`;
  private httpClient = inject(HttpClient);

  constructor() {}

  // Get all SprintTemplate
  getAllSprintTemplate(): Observable<ISprintTemplate[]> {
    return this.httpClient.get<IApiResponseCollection<ISprintTemplate>>(this.routeApi).pipe(
      map((response) => {
        return response['member'];
      }),
    );
  }

  // Get SprintTemplate by ID
  getSprintTemplateById(id: string): Observable<ISprintTemplate> {
    return this.httpClient.get<ISprintTemplate>(`${this.routeApi}/${id}`);
  }

  // Create a new SprintTemplate
  createSprintTemplate(body: ISprintTemplate): Observable<ISprintTemplate> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<ISprintTemplate>(this.routeApi, body, { headers });
  }

  // Update SprintTemplate by ID
  updateSprintTemplate(id: string, body: ISprintTemplate): Observable<ISprintTemplate> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.patch<ISprintTemplate>(`${this.routeApi}/${id}`, body, { headers });
  }

  // Delete SprintTemplate
  deleteSprintTemplate(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
  }
}
