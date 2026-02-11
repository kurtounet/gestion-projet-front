import { inject, Injectable, signal } from '@angular/core';
import { TypeTaskService } from '../services/type-task.service';
import { ITypeTask } from '../models/type-task.model';
export const initialTypeTaskState: ITypeTask = {
  id: 0,
  codeId: 0,
  name: '',
  pathFileScript: '',
  description: '',
  createdAt: new Date('now()'),
  updatedAt: new Date('now()'),
  automatique: false,
};
@Injectable({
  providedIn: 'root',
})
export class TypeTaskStore {
  readonly typeTaskService = inject(TypeTaskService);

  typeTasks = signal<ITypeTask[]>([]);
  currentTypeTask = signal<ITypeTask>(initialTypeTaskState);
  typeTaskLoading = signal<boolean>(false);
  typeTaskLoaded = signal<boolean>(false);

  typeTask = signal<ITypeTask[]>([]);

  getAllTypeTask(): void {
    this.typeTaskLoading.set(true);
    this.typeTaskService.getAllTypeTask().subscribe({
      next: (data) => {
        if (data) {
          this.typeTasks.set(data);
          this.typeTaskLoaded.set(true);
          this.typeTaskLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des typeTask', err);
        this.typeTaskLoading.set(false);
      },
    });
  }
  getTypeTaskById(id: string): void {
    this.typeTaskLoading.set(true);
    this.typeTaskService.getTypeTaskById(id).subscribe({
      next: (data) => {
        if (data) {
          this.currentTypeTask.set(data);
          this.typeTaskLoaded.set(true);
          this.typeTaskLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du typeTask', err);
        this.typeTaskLoading.set(false);
      },
    });
  }
  updateTypeTask(id: string, body: ITypeTask) {
    this.typeTaskService.updateTypeTask(id, body).subscribe({
      next: (data) => {
        //this.getCurrentTypeTask(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour : error', err);
      },
    });
  }
  createTypeTask(body: ITypeTask) {
    this.typeTaskService.createTypeTask(body).subscribe({
      next: (data) => {
        // this.getCurrentTypeTask(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la création : error', err);
      },
    });
  }
  deleteTypeTask(id: string) {
    this.typeTaskService.deleteTypeTask(id).subscribe({
      next: (data) => {
        // this.getCurrentTypeTask(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression: error', err);
      },
    });
  }
}
