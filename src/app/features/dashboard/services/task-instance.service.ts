import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { ITaskInstance } from '../models/task-instance.model';
export interface IHydraCollection<T> {
    'member': T[];
    'totalItems': number;
}

@Injectable({
    providedIn: 'root'
})
export class TaskInstanceService {
    private routeApi = `${environment.baseApiUrl}/task_instances`;
    private httpClient = inject(HttpClient);

    tasks: ITaskInstance[] = [];

    constructor() { }

    // Get all TaskInstance
    getAllTaskInstance(): Observable<ITaskInstance[]> {
        return this.httpClient.get<IHydraCollection<ITaskInstance>>(this.routeApi).pipe(
            map(response => {
                return response['member'];
            })
        );
    }
    getAllTaskBySprintInstance(id: number): Observable<ITaskInstance[]> {
        return this.httpClient.get<IHydraCollection<ITaskInstance>>(`${this.routeApi}?sprintInstance.id=${id}`).pipe(
            map(response => {
              console.log(response);
                return response['member'];
            })
        );
    }

    // Get TaskInstance by ID
    getTaskInstanceById(id: number): Observable<ITaskInstance> {
        return this.httpClient.get<ITaskInstance>(`${this.routeApi}/${id}`);
    }

    // Create a new TaskInstance
    createTaskInstance(body: ITaskInstance): Observable<ITaskInstance> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.post<ITaskInstance>(this.routeApi, body, { headers });
    }

    // Update TaskInstance by ID
    updateTaskInstance(id: number, body: ITaskInstance): Observable<ITaskInstance> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.patch<ITaskInstance>(`${this.routeApi}/${id}`, body, { headers });
    }

    // Delete TaskInstance
    deleteTaskInstance(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
    }


    getAllCompletedStatus(): string[] {
        return ['To Do', 'In Progress', 'Done'];
    }

    filtersByCompleted(completed: string): ITaskInstance[] {
        return this.tasks.filter(task => task.completed === completed);
    }
}
