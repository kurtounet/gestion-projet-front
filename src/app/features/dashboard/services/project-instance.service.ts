import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProjectInstance } from '../models/project-instance.model';
import { environment } from '../../../../environments/environment.development';


export interface IHydraCollection<T> {
    'member': T[];
    'totalItems': number;
}

@Injectable({
    providedIn: 'root'
})
export class ProjectInstanceService {
    private routeApi = `${environment.baseApiUrl}/project_instances`;
    private httpClient = inject(HttpClient);

    constructor() { }

    // Get all ProjectInstance
    getAllProjectInstance(): Observable< IProjectInstance[]> {
        return this.httpClient.get<IHydraCollection<IProjectInstance>>(this.routeApi).pipe(
            map(response => {
                return response ['member'];
            })
        );
    }

    // Get ProjectInstance by ID
    getProjectInstanceById(id: number): Observable<IProjectInstance> {
        return this.httpClient.get<IProjectInstance>(`${this.routeApi}/${id}`);
    }

    // Create a new ProjectInstance
    createProjectInstance(body: IProjectInstance): Observable<IProjectInstance> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.post<IProjectInstance>(this.routeApi, body, { headers });
    }

    // Update ProjectInstance by ID
    updateProjectInstance(id: string, body: IProjectInstance): Observable<IProjectInstance> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.patch<IProjectInstance>(`${this.routeApi}/${id}`, body, { headers });
    }

    // Delete ProjectInstance
    deleteProjectInstance(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
    }
}
