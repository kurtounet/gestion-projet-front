import { inject, Injectable, signal } from '@angular/core';
import { ISprintInstance } from '../models/sprint-instance.model';
import { SprintInstanceService } from '../services/sprint-instance.service';
export const initialSprintInstanceState: ISprintInstance = {
  '@id': '',
  '@type': '',
  id: 0,
  projectInstance: '',
  priority: '',
  sprintTemplate: '',
  sprintDependency: '',
  name: '',
  description: '',
  color: '',
  icon: '',
  startDate: new Date(),
  endDate: new Date(),
  status: '',
  position: 0,
  comment: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};
@Injectable({
  providedIn: 'root',
})
export class SprintInstanceStore {
  readonly sprintInstanceService = inject(SprintInstanceService);

  sprintInstances = signal<ISprintInstance[]>([]);
  currentSprintInstance = signal<ISprintInstance>(initialSprintInstanceState);
  sprintInstanceLoading = signal<boolean>(false);
  sprintInstanceLoaded = signal<boolean>(false);

  sprintInstance = signal<ISprintInstance[]>([]);

  getAllSprintInstance(): void {
    this.sprintInstanceLoading.set(true);
    this.sprintInstanceService.getAllSprintInstance().subscribe({
      next: (data) => {
        if (data) {
          this.sprintInstances.set(data);
          this.sprintInstanceLoaded.set(true);
          this.sprintInstanceLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des sprintInstance', err);
        this.sprintInstanceLoading.set(false);
      },
    });
  }
  getSprintInstanceById(id: string): void {
    this.sprintInstanceLoading.set(true);
    this.sprintInstanceService.getSprintInstanceById(id).subscribe({
      next: (data) => {
        if (data) {
          this.currentSprintInstance.set(data);
          this.sprintInstanceLoaded.set(true);
          this.sprintInstanceLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du sprintInstance', err);
        this.sprintInstanceLoading.set(false);
      },
    });
  }
  updateSprintInstance(id: string, body: ISprintInstance) {
    this.sprintInstanceService.updateSprintInstance(id, body).subscribe({
      next: (data) => {
        //this.getCurrentSprintInstance(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour : error', err);
      },
    });
  }
  createSprintInstance(body: ISprintInstance) {
    this.sprintInstanceService.createSprintInstance(body).subscribe({
      next: (data) => {
        // this.getCurrentSprintInstance(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la création : error', err);
      },
    });
  }
  deleteSprintInstance(id: string) {
    this.sprintInstanceService.deleteSprintInstance(id).subscribe({
      next: (data) => {
        // this.getCurrentSprintInstance(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression: error', err);
      },
    });
  }
}
