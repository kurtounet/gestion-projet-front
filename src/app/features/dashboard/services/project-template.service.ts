import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { IProjectTemplate } from '../models/project-template.model';
export interface IHydraCollection<T> {
    'hydra:member': T[];
    'hydra:totalItems': number;
}

@Injectable({
    providedIn: 'root'
})
export class ProjectTemplateService {
    private routeApi = `${environment.baseApiUrl}/projecttemplate`;
    private httpClient = inject(HttpClient);

    constructor() { }

    // Get all ProjectTemplate
    getAllProjectTemplate(): Observable<IProjectTemplate[]> {
        return this.httpClient.get<IHydraCollection<IProjectTemplate>>(this.routeApi).pipe(
            map(response => {
                return response['hydra:member'];
            })
        );
    }

    // Get ProjectTemplate by ID
    getProjectTemplateById(id: string): Observable<IProjectTemplate> {
        return this.httpClient.get<IProjectTemplate>(`${this.routeApi}/${id}`);
    }

    // Create a new ProjectTemplate
    createProjectTemplate(body: IProjectTemplate): Observable<IProjectTemplate> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.post<IProjectTemplate>(this.routeApi, body, { headers });
    }

    // Update ProjectTemplate by ID
    updateProjectTemplate(id: string, body: IProjectTemplate): Observable<IProjectTemplate> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.patch<IProjectTemplate>(`${this.routeApi}/${id}`, body, { headers });
    }

    // Delete ProjectTemplate
    deleteProjectTemplate(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
    }
}
