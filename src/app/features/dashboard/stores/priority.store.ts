import { inject, Injectable, signal } from '@angular/core';
import { IPriority } from '../models/priority.model';
import { PriorityService } from '../services/priority.service';
import { LocalStorageService } from '../services/local-storage.service';
import { UriService } from '../services/uri.service';
export const initialPriorityState: IPriority = {
  '@id': '',
  '@type': '',
  id: 0,
  label: '',
  color: '',
  priorityNumber: 0,
  createdAt: new Date('now()'),
  updatedAt: new Date('now()'),
};
@Injectable({
  providedIn: 'root',
})
export class PriorityStore {
  readonly apiResource = 'priorities';
  readonly uriService = inject(UriService);
  readonly priorityService = inject(PriorityService);
  readonly localStorageService = inject(LocalStorageService);
  priorityLoading = signal<boolean>(false);
  priorityLoaded = signal<boolean>(false);

  priorities = signal<IPriority[]>([]);
  currentPriority = signal<IPriority>(initialPriorityState);

  getAllPriority(): void {
    this.priorityLoading.set(true);
    this.priorityService.getAllPriority().subscribe({
      next: (data) => {
        if (data) {
          this.priorities.set(data);
          this.priorityLoaded.set(true);
          this.priorityLoading.set(false);
          this.localStorageService.setItem('priorities', data);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des priorités', err);
        this.priorityLoading.set(false);
      },
    });
  }
  getPriorityById(id: string): void {
    this.priorityLoading.set(true);
    this.priorityService.getPriorityById(id).subscribe({
      next: (data) => {
        if (data) {
          this.currentPriority.set(data);
          this.priorityLoaded.set(true);
          this.priorityLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du priority', err);
        this.priorityLoading.set(false);
      },
    });
  }
  updatePriority(id: string, body: IPriority) {
    this.priorityService.updatePriority(id, body).subscribe({
      next: (data) => {
        //this.getCurrentPriority(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour : error', err);
      },
    });
  }
  createPriority(body: IPriority) {
    this.priorityService.createPriority(body).subscribe({
      next: (data) => {
        // this.getCurrentPriority(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la création : error', err);
      },
    });
  }
  deletePriority(id: string) {
    this.priorityService.deletePriority(id).subscribe({
      next: (data) => {
        // this.getCurrentPriority(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression: error', err);
      },
    });
  }
  getIdByLabel(label: string): string {
    const id = this.priorities().find((priority) => priority.label === label)?.id;
    return `/api/priorities/${id}`;
  }
  getLabelById(uri: string): string {
    const id = this.uriService.extractId(uri);
    return this.priorities().find((priority) => priority.id === Number(id))?.label || '';
  }
}
