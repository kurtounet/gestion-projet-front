import { inject, Injectable, signal } from '@angular/core';
import { StatusService } from '../services/status.service';
import { IStatus } from '../models/status.model';
import { LocalStorageService } from '../services/local-storage.service';
import { UriService } from '../services/uri.service';
export const initialStatusState: IStatus = {
  '@id': '',
  '@type': '',
  id: 0,
  label: '',
  context: null,
  createdAt: new Date().toISOString(),
  updatedAt: null,
};

@Injectable({
  providedIn: 'root',
})
export class StatusStore {
  readonly apiResource = 'statuses';
  readonly uriService = inject(UriService);
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

  getIdByLabel(label: string): string {
    const id = this.statuses().find((status) => status.label === label)?.id;
    return `/api/${this.apiResource}/${id}`;
  }
  getLabelById(uri: string): string {
    const id = this.uriService.extractId(uri);
    return this.statuses().find((status) => status.id === Number(id))?.label || '';
  }
}
