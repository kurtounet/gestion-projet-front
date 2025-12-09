import { inject, Injectable, signal } from '@angular/core';
import { ITypeTask } from '../models/type-task.model';
import { TypeTaskService } from '../services/type-task.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TypeTaskStore {
  readonly typeTaskService = inject(TypeTaskService);
  readonly localStorageService = inject(LocalStorageService);
  typeTasksLoading = signal<boolean>(false);
  typeTasksLoaded = signal<boolean>(false);

  typeTasks = signal<ITypeTask[]>([]);

  getAllTypeTask(): void {
    this.typeTasksLoading.set(true);
    this.typeTaskService.getAllTypeTask().subscribe({
      next: (data) => {
        if (data) {
          this.typeTasks.set(data);
          this.typeTasksLoaded.set(true);
          this.typeTasksLoading.set(false);
          this.localStorageService.setItem('type-tasks', data);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des types de tâches', err);
        this.typeTasksLoading.set(false);
      },
    });
  }
}
