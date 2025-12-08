import { inject, Injectable, signal } from '@angular/core';
import { IPriority } from '../models/priority.model';
import { PriorityService } from '../services/priority.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PriorityStore {

  readonly priorityService = inject(PriorityService);
  readonly localStorageService = inject(LocalStorageService);
  prioritiesLoading = signal<boolean>(false);
  prioritiesLoaded = signal<boolean>(false);

  priorities = signal<IPriority[]>([]);

  getAllPriority(): void {
    this.prioritiesLoading.set(true);
    this.priorityService.getAllPriority().subscribe( {
      next: (data) => {
        if (data) {
          this.priorities.set(data);
          this.prioritiesLoaded.set(true);
          this.prioritiesLoading.set(false);
          this.localStorageService.setItem('priorities', data);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des priorités', err);
        this.prioritiesLoading.set(false);
      }
    });
  }
}
