import { inject, Injectable, signal } from '@angular/core';
import { TaskTemplateService } from '../services/task-template.service';
import { ITaskTemplate } from '../models/task-template.model';
export const initialTaskTemplateState: ITaskTemplate = {
  id: 0,
  sprintTemplateId: 0,
  name: '',
  description: '',
  parentTask: 0,
  typeTaskId: 0,
  createdAt: new Date('now()'),
  updatedAt: new Date('now()'),
};
@Injectable({
  providedIn: 'root',
})
export class TaskTemplateStore {
  readonly taskTemplateService = inject(TaskTemplateService);

  taskTemplates = signal<ITaskTemplate[]>([]);
  currentTaskTemplate = signal<ITaskTemplate>(initialTaskTemplateState);
  taskTemplateLoading = signal<boolean>(false);
  taskTemplateLoaded = signal<boolean>(false);

  taskTemplate = signal<ITaskTemplate[]>([]);

  getAllTaskTemplate(): void {
    this.taskTemplateLoading.set(true);
    this.taskTemplateService.getAllTaskTemplate().subscribe({
      next: (data) => {
        if (data) {
          this.taskTemplates.set(data);
          this.taskTemplateLoaded.set(true);
          this.taskTemplateLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des taskTemplate', err);
        this.taskTemplateLoading.set(false);
      },
    });
  }
  getTaskTemplateById(id: string): void {
    this.taskTemplateLoading.set(true);
    this.taskTemplateService.getTaskTemplateById(id).subscribe({
      next: (data) => {
        if (data) {
          this.currentTaskTemplate.set(data);
          this.taskTemplateLoaded.set(true);
          this.taskTemplateLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du taskTemplate', err);
        this.taskTemplateLoading.set(false);
      },
    });
  }
  updateTaskTemplate(id: string, body: ITaskTemplate) {
    this.taskTemplateService.updateTaskTemplate(id, body).subscribe({
      next: (data) => {
        //this.getCurrentTaskTemplate(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour : error', err);
      },
    });
  }
  createTaskTemplate(body: ITaskTemplate) {
    this.taskTemplateService.createTaskTemplate(body).subscribe({
      next: (data) => {
        // this.getCurrentTaskTemplate(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la création : error', err);
      },
    });
  }
  deleteTaskTemplate(id: string) {
    this.taskTemplateService.deleteTaskTemplate(id).subscribe({
      next: (data) => {
        // this.getCurrentTaskTemplate(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression: error', err);
      },
    });
  }
}
