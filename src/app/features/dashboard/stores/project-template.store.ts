import { inject, Injectable, signal } from '@angular/core';
import { IProjectTemplate } from '../models/project-template.model';
import { ProjectTemplateService } from '../services/project-template.service';
export const initialProjectTemplateState: IProjectTemplate = {
  id: 0,
  name: '',
  description: '',
  duration: 0,
  createdAt: new Date().toISOString(),
  updatedAt: null,
};
@Injectable({
  providedIn: 'root',
})
export class ProjectTemplateStore {
  readonly projectTemplateService = inject(ProjectTemplateService);

  projectTemplates = signal<IProjectTemplate[]>([]);
  currentProjectTemplate = signal<IProjectTemplate>(initialProjectTemplateState);
  projectTemplateLoading = signal<boolean>(false);
  projectTemplateLoaded = signal<boolean>(false);

  projectTemplate = signal<IProjectTemplate[]>([]);

  getAllProjectTemplate(): void {
    this.projectTemplateLoading.set(true);
    this.projectTemplateService.getAllProjectTemplate().subscribe({
      next: (data) => {
        if (data) {
          this.projectTemplates.set(data);
          this.projectTemplateLoaded.set(true);
          this.projectTemplateLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des projectTemplate', err);
        this.projectTemplateLoading.set(false);
      },
    });
  }
  getProjectTemplateById(id: string): void {
    this.projectTemplateLoading.set(true);
    this.projectTemplateService.getProjectTemplateById(id).subscribe({
      next: (data) => {
        if (data) {
          this.currentProjectTemplate.set(data);
          this.projectTemplateLoaded.set(true);
          this.projectTemplateLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du projectTemplate', err);
        this.projectTemplateLoading.set(false);
      },
    });
  }
  updateProjectTemplate(id: string, body: IProjectTemplate) {
    this.projectTemplateService.updateProjectTemplate(id, body).subscribe({
      next: (data) => {
        //this.getCurrentProjectTemplate(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour : error', err);
      },
    });
  }
  createProjectTemplate(body: IProjectTemplate) {
    this.projectTemplateService.createProjectTemplate(body).subscribe({
      next: (data) => {
        // this.getCurrentProjectTemplate(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la création : error', err);
      },
    });
  }
  deleteProjectTemplate(id: string) {
    this.projectTemplateService.deleteProjectTemplate(id).subscribe({
      next: (data) => {
        // this.getCurrentProjectTemplate(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression: error', err);
      },
    });
  }
}
