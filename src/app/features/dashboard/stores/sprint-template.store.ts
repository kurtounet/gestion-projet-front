import { inject, Injectable, signal } from '@angular/core';
import { ISprintTemplate } from '../models/sprint-template.model';
import { SprintTemplateService } from '../services/sprint-template.service';

export const initialSprintTemplateState: ISprintTemplate = {
  sprintTemplateId: 0,
  name: '',
  description: '',
  duration: 0,
  createdAt: new Date('now()'),
  updatedAt: new Date('now()'),
};
@Injectable({
  providedIn: 'root',
})
export class SprintTemplateStore {
  readonly sprintTemplateService = inject(SprintTemplateService);

  sprintTemplates = signal<ISprintTemplate[]>([]);
  currentSprintTemplate = signal<ISprintTemplate>(initialSprintTemplateState);
  sprintTemplateLoading = signal<boolean>(false);
  sprintTemplateLoaded = signal<boolean>(false);

  sprintTemplate = signal<ISprintTemplate[]>([]);

  getAllSprintTemplate(): void {
    this.sprintTemplateLoading.set(true);
    this.sprintTemplateService.getAllSprintTemplate().subscribe({
      next: (data) => {
        if (data) {
          this.sprintTemplates.set(data);
          this.sprintTemplateLoaded.set(true);
          this.sprintTemplateLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des sprintTemplate', err);
        this.sprintTemplateLoading.set(false);
      },
    });
  }
  getSprintTemplateById(id: string): void {
    this.sprintTemplateLoading.set(true);
    this.sprintTemplateService.getSprintTemplateById(id).subscribe({
      next: (data) => {
        if (data) {
          this.currentSprintTemplate.set(data);
          this.sprintTemplateLoaded.set(true);
          this.sprintTemplateLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du sprintTemplate', err);
        this.sprintTemplateLoading.set(false);
      },
    });
  }
  updateSprintTemplate(id: string, body: ISprintTemplate) {
    this.sprintTemplateService.updateSprintTemplate(id, body).subscribe({
      next: (data) => {
        //this.getCurrentSprintTemplate(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour : error', err);
      },
    });
  }
  createSprintTemplate(body: ISprintTemplate) {
    this.sprintTemplateService.createSprintTemplate(body).subscribe({
      next: (data) => {
        // this.getCurrentSprintTemplate(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la création : error', err);
      },
    });
  }
  deleteSprintTemplate(id: string) {
    this.sprintTemplateService.deleteSprintTemplate(id).subscribe({
      next: (data) => {
        // this.getCurrentSprintTemplate(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression: error', err);
      },
    });
  }
}
