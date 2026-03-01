import { inject, Injectable, signal } from '@angular/core';
import { TaskInstanceService } from '../services/task-instance.service';
import { ITaskInstance } from '../models/task-instance.model';
export const initialTaskInstanceState: ITaskInstance = {
  '@id': '',
  '@type': '',
  id: 0,
  user: null,
  taskTemplate: null,
  sprintInstance: null,
  icon: '',
  priority: null,
  status: null,
  color: '',
  typeTask: null,
  name: '',
  description: '',
  startDate: '',
  dueDate: '',
  position: 0,
  parentTask: null,
  dependency: null,
  createdAt: new Date().toISOString(),
  updatedAt: null,
  createdByUser: null,
  updatedByUser: null,
  comment: null,
  completed: null,
};
@Injectable({
  providedIn: 'root',
})
export class TaskInstanceStore {
  readonly taskInstanceService = inject(TaskInstanceService);

  taskInstances = signal<ITaskInstance[]>([]);
  currentTaskInstance = signal<ITaskInstance>(initialTaskInstanceState);
  taskInstanceLoading = signal<boolean>(false);
  taskInstanceLoaded = signal<boolean>(false);

  taskInstance = signal<ITaskInstance[]>([]);

  getAllTaskInstance(): void {
    this.taskInstanceLoading.set(true);
    this.taskInstanceService.getAllTaskInstance().subscribe({
      next: (data) => {
        if (data) {
          this.taskInstances.set(data);
          this.taskInstanceLoaded.set(true);
          this.taskInstanceLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des taskInstance', err);
        this.taskInstanceLoading.set(false);
      },
    });
  }
  getTaskInstanceById(id: string): void {
    this.taskInstanceLoading.set(true);
    this.taskInstanceService.getTaskInstanceById(id).subscribe({
      next: (data) => {
        if (data) {
          this.currentTaskInstance.set(data);
          this.taskInstanceLoaded.set(true);
          this.taskInstanceLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du taskInstance', err);
        this.taskInstanceLoading.set(false);
      },
    });
  }
  updateTaskInstance(id: string, body: ITaskInstance) {
    this.taskInstanceService.updateTaskInstance(id, body).subscribe({
      next: (data) => {
        //this.getCurrentTaskInstance(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour : error', err);
      },
    });
  }
  createTaskInstance(body: ITaskInstance) {
    this.taskInstanceService.createTaskInstance(body).subscribe({
      next: (data) => {
        // this.getCurrentTaskInstance(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la création : error', err);
      },
    });
  }
  deleteTaskInstance(id: string) {
    this.taskInstanceService.deleteTaskInstance(id).subscribe({
      next: (data) => {
        // this.getCurrentTaskInstance(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression: error', err);
      },
    });
  }
}
