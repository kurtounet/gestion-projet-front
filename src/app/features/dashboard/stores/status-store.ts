import { inject, Injectable, signal } from '@angular/core';
import { StatusService } from '../services/status.service';
import { IStatus } from '../models/status.model';
import { LocalStorageService } from '../services/local-storage.service';
 export const initialStatusState: IStatus = {
  '@id': "",
  '@type': "",
  id: 0,
  label: "",
  context: 0,
  createdAt: new Date('now()'),
  updatedAt: new Date('now()'),
};

@Injectable({
  providedIn: 'root',
})
export class StatusStore {
  readonly statusService = inject(StatusService);
  readonly localStorageService = inject(LocalStorageService);
  statusLoading = signal<boolean>(false);
  statusLoaded = signal<boolean>(false);
  statuses = signal<IStatus[]>([]);
  currentStatus = signal<IStatus>(initialStatusState);

  getAllStatus(): void {
    this.statusLoading.set(true);
    this.statusService.getAllStatus().subscribe({
      next: (data) => {
        if (data) {
          this.statuses.set(data);
          this.statusLoaded.set(true);
          this.statusLoading.set(false);
          this.localStorageService.setItem('statuses', data);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des statuts', err);
        this.statusLoading.set(false);
      },
    });
  }
  getStatusById(id: string): void {
    this.statusLoading.set(true);
    this.statusService.getStatusById(id).subscribe({
      next: (data) => {
        if (data) {
          this.currentStatus.set(data);
          this.statusLoaded.set(true);
          this.statusLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du status', err);
        this.statusLoading.set(false);
      },
    });
  }
  updateStatus(id: string, body: IStatus) {
    this.statusService.updateStatus(id, body).subscribe({
      next: (data) => {
        //this.getCurrentStatus(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour : error', err);
      },
    });
  }
  createStatus(body: IStatus) {
    this.statusService.createStatus(body).subscribe({
      next: (data) => {
        // this.getCurrentStatus(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la création : error', err);
      },
    });
  }
  deleteStatus(id: string) {
    this.statusService.deleteStatus(id).subscribe({
      next: (data) => {
        // this.getCurrentStatus(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression: error', err);
      },
    });
  }
}
