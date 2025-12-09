import { inject, Injectable, signal } from '@angular/core';
import { StatusService } from '../services/status.service';
import { IStatus } from '../models/status.model';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class StatusStore {
  readonly statusService = inject(StatusService);
  readonly localStorageService = inject(LocalStorageService);
  statusesLoading = signal<boolean>(false);
  statusesLoaded = signal<boolean>(false);
  statuses = signal<IStatus[]>([]);

  getAllStatus(): void {
    this.statusesLoading.set(true);
    this.statusService.getAllStatus().subscribe({
      next: (data) => {
        if (data) {
          this.statuses.set(data);
          this.statusesLoaded.set(true);
          this.statusesLoading.set(false);
          this.localStorageService.setItem('statuses', data);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des statuts', err);
        this.statusesLoading.set(false);
      },
    });
  }
}
