import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { ITaskInstance } from '../models/task-instance.model';
import { IPayloadItemOrder } from '../models/payload-item-order.model';
import { IApiResponseCollection } from '../models/api/response.models';

@Injectable({
  providedIn: 'root',
})
export class TaskInstanceService {
  private routeApi = `${environment.baseApiUrl}/task_instances`;
  private routeCustom = `${environment.baseCustomUrl}/task_instances`;
  private httpClient = inject(HttpClient);

  tasks: ITaskInstance[] = [];

  constructor() {}

  // Get all TaskInstance
  getAllTaskInstance(): Observable<ITaskInstance[]> {
    return this.httpClient.get<IApiResponseCollection<ITaskInstance>>(this.routeApi).pipe(
      map((response) => {
        return response['member'];
      }),
    );
  }
  getAllTaskBySprintInstance(id: number): Observable<ITaskInstance[]> {
    return this.httpClient
      .get<IApiResponseCollection<ITaskInstance>>(`${this.routeApi}?sprintInstance.id=${id}`)
      .pipe(
        map((response) => {

          return response['member'];
        }),
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
    const headers = new HttpHeaders({ 'Content-Type': 'application/merge-patch+json' });
    return this.httpClient.patch<ITaskInstance>(`${this.routeApi}/${id}`, body, { headers });
  }

  // Delete TaskInstance
  deleteTaskInstance(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
  }

  getAllCompletedStatus(): string[] {
    return ['À faire', 'En cours', 'En attente', 'Terminé', 'Annulé'];
  }

  filtersByCompleted(completed: string): ITaskInstance[] {
    return this.tasks.filter((task) => task.completed === completed);
  }
  filtersByStatus(status: string, tasks: ITaskInstance[], order: string): ITaskInstance[] {
    return this.positionOrder(
      tasks.filter((task) => task.status === status),
      order,
    );
  }
  positionOrder(tasks: ITaskInstance[], order: string = 'asc'): ITaskInstance[] {
    if (order === 'desc') {
      return tasks.sort((a, b) => b.position - a.position);
    }
    return tasks.sort((a, b) => a.position - b.position);
  }

  updateTaskOrder(newOrder: IPayloadItemOrder) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/merge-patch+json' });
    return this.httpClient.patch<void>(`${this.routeCustom}/order`, newOrder, { headers });
  }
}
