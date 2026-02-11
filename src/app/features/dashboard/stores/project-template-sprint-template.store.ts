import { inject, Injectable, signal } from '@angular/core';
import { IProjectTemplateSprintTemplate } from '@app/features/dashboard/models/project-template-sprint-template.model';
import { ProjectTemplateSprintTemplateService } from '@app/features/dashboard/services/project-template-sprint-template.service';
export const initialProjectTemplateSprintTemplateState: IProjectTemplateSprintTemplate = {
  projectTemplateId: 0,
  sprintTemplateId: 0,
  sprintOrder: 0,
  createdAt: new Date('now()'),
  updatedAt: new Date('now()'),
};
@Injectable({
  providedIn: 'root',
})
export class ProjectTemplateSprintTemplateStore {
  readonly projectTemplateSprintTemplateService = inject(ProjectTemplateSprintTemplateService);

  projectTemplateSprintTemplates = signal<IProjectTemplateSprintTemplate[]>([]);
  currentProjectTemplateSprintTemplate = signal<IProjectTemplateSprintTemplate>(
    initialProjectTemplateSprintTemplateState,
  );
  projectTemplateSprintTemplateLoading = signal<boolean>(false);
  projectTemplateSprintTemplateLoaded = signal<boolean>(false);

  projectTemplateSprintTemplate = signal<IProjectTemplateSprintTemplate[]>([]);

  getAllProjectTemplateSprintTemplate(): void {
    this.projectTemplateSprintTemplateLoading.set(true);
    this.projectTemplateSprintTemplateService.getAllProjectTemplateSprintTemplate().subscribe({
      next: (data) => {
        if (data) {
          this.projectTemplateSprintTemplates.set(data);
          this.projectTemplateSprintTemplateLoaded.set(true);
          this.projectTemplateSprintTemplateLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des projectTemplateSprintTemplate', err);
        this.projectTemplateSprintTemplateLoading.set(false);
      },
    });
  }
  getProjectTemplateSprintTemplateById(id: string): void {
    this.projectTemplateSprintTemplateLoading.set(true);
    this.projectTemplateSprintTemplateService.getProjectTemplateSprintTemplateById(id).subscribe({
      next: (data) => {
        if (data) {
          this.currentProjectTemplateSprintTemplate.set(data);
          this.projectTemplateSprintTemplateLoaded.set(true);
          this.projectTemplateSprintTemplateLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du projectTemplateSprintTemplate', err);
        this.projectTemplateSprintTemplateLoading.set(false);
      },
    });
  }
  updateProjectTemplateSprintTemplate(id: string, body: IProjectTemplateSprintTemplate) {
    this.projectTemplateSprintTemplateService
      .updateProjectTemplateSprintTemplate(id, body)
      .subscribe({
        next: (data) => {
          //this.getCurrentProjectTemplateSprintTemplate(data.id);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour : error', err);
        },
      });
  }
  createProjectTemplateSprintTemplate(body: IProjectTemplateSprintTemplate) {
    this.projectTemplateSprintTemplateService.createProjectTemplateSprintTemplate(body).subscribe({
      next: (data) => {
        // this.getCurrentProjectTemplateSprintTemplate(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la création : error', err);
      },
    });
  }
  deleteProjectTemplateSprintTemplate(id: string) {
    this.projectTemplateSprintTemplateService.deleteProjectTemplateSprintTemplate(id).subscribe({
      next: (data) => {
        // this.getCurrentProjectTemplateSprintTemplate(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression: error', err);
      },
    });
  }
}
