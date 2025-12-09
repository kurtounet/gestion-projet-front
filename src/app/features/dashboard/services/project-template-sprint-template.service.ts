import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { IProjectTemplateSprintTemplate } from '../models/project-template-sprint-template.model';
import { IApiResponseCollection } from '../models/api/response.models';


@Injectable({
  providedIn: 'root',
})
export class ProjectTemplateSprintTemplateService {
  private routeApi = `${environment.baseApiUrl}/projecttemplatesprinttemplate`;
  private httpClient = inject(HttpClient);

  constructor() {}

  // Get all ProjectTemplateSprintTemplate
  getAllProjectTemplateSprintTemplate(): Observable<IProjectTemplateSprintTemplate[]> {
    return this.httpClient
      .get<IApiResponseCollection<IProjectTemplateSprintTemplate>>(this.routeApi)
      .pipe(
        map((response) => {
          return response['member'];
        }),
      );
  }

  // Get ProjectTemplateSprintTemplate by ID
  getProjectTemplateSprintTemplateById(id: string): Observable<IProjectTemplateSprintTemplate> {
    return this.httpClient.get<IProjectTemplateSprintTemplate>(`${this.routeApi}/${id}`);
  }

  // Create a new ProjectTemplateSprintTemplate
  createProjectTemplateSprintTemplate(
    body: IProjectTemplateSprintTemplate,
  ): Observable<IProjectTemplateSprintTemplate> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<IProjectTemplateSprintTemplate>(this.routeApi, body, { headers });
  }

  // Update ProjectTemplateSprintTemplate by ID
  updateProjectTemplateSprintTemplate(
    id: string,
    body: IProjectTemplateSprintTemplate,
  ): Observable<IProjectTemplateSprintTemplate> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.patch<IProjectTemplateSprintTemplate>(`${this.routeApi}/${id}`, body, {
      headers,
    });
  }

  // Delete ProjectTemplateSprintTemplate
  deleteProjectTemplateSprintTemplate(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
  }
}
