import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { ISprintTask } from '../models/sprint-task.model';
export interface IHydraCollection<T> {
    'hydra:member': T[];
    'hydra:totalItems': number;
}

@Injectable({
    providedIn: 'root'
})
export class SprintTaskService {
    private routeApi = `${environment.baseApiUrl}/sprinttask`;
    private httpClient = inject(HttpClient);

    constructor() { }

    // Get all SprintTask
    getAllSprintTask(): Observable<ISprintTask[]> {
        return this.httpClient.get<IHydraCollection<ISprintTask>>(this.routeApi).pipe(
            map(response => {
                return response['hydra:member'];
            })
        );
    }

    // Get SprintTask by ID
    getSprintTaskById(id: string): Observable<ISprintTask> {
        return this.httpClient.get<ISprintTask>(`${this.routeApi}/${id}`);
    }

    // Create a new SprintTask
    createSprintTask(body: ISprintTask): Observable<ISprintTask> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.post<ISprintTask>(this.routeApi, body, { headers });
    }

    // Update SprintTask by ID
    updateSprintTask(id: string, body: ISprintTask): Observable<ISprintTask> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.patch<ISprintTask>(`${this.routeApi}/${id}`, body, { headers });
    }

    // Delete SprintTask
    deleteSprintTask(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
    }
}
