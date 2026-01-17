import { inject, Injectable, signal } from '@angular/core';
import { ISprintTask } from '../models/sprint-task.model';
import { SprintTaskService } from '../services/sprint-task.service';
 export const initialSprintTaskState: ISprintTask = {
  sprintTemplateId: 0,
  taskTemplateId: 0,
  taskOrder: 0,
  createdAt: new Date('now()'),
  updatedAt: new Date('now()'),
};
@Injectable({
  providedIn: 'root',
})
export class SprintTaskStore {
  readonly sprintTaskService = inject(SprintTaskService);

  sprintTasks = signal<ISprintTask[]>([]);
  currentSprintTask = signal<ISprintTask>(initialSprintTaskState);
  sprintTaskLoading = signal<boolean>(false);
  sprintTaskLoaded = signal<boolean>(false);

  sprintTask = signal<ISprintTask[]>([]);

  getAllSprintTask(): void {
    this.sprintTaskLoading.set(true);
    this.sprintTaskService.getAllSprintTask().subscribe({
      next: (data) => {
        if (data) {
          this.sprintTasks.set(data);
          this.sprintTaskLoaded.set(true);
          this.sprintTaskLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des sprintTask', err);
        this.sprintTaskLoading.set(false);
      },
    });
  }
  getSprintTaskById(id: string): void {
    this.sprintTaskLoading.set(true);
    this.sprintTaskService.getSprintTaskById(id).subscribe({
      next: (data) => {
        if (data) {
          this.currentSprintTask.set(data);
          this.sprintTaskLoaded.set(true);
          this.sprintTaskLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du sprintTask', err);
        this.sprintTaskLoading.set(false);
      },
    });
  }
  updateSprintTask(id: string, body: ISprintTask) {
    this.sprintTaskService.updateSprintTask(id, body).subscribe({
      next: (data) => {
        //this.getCurrentSprintTask(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour : error', err);
      },
    });
  }
  createSprintTask(body: ISprintTask) {
    this.sprintTaskService.createSprintTask(body).subscribe({
      next: (data) => {
        // this.getCurrentSprintTask(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la création : error', err);
      },
    });
  }
  deleteSprintTask(id: string) {
    this.sprintTaskService.deleteSprintTask(id).subscribe({
      next: (data) => {
        // this.getCurrentSprintTask(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression: error', err);
      },
    });
  }
}
