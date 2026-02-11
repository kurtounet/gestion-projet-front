import { inject, Injectable, signal } from '@angular/core';
import { IContextStatus } from '../models/context-status.model';
import { ContextStatusService } from '../services/context-status.service';
export const initialContextStatusState: IContextStatus = {
  contextId: 0,
  statusId: 0,
  createdAt: new Date('now()'),
  updatedAt: new Date('now()'),
};
@Injectable({
  providedIn: 'root',
})
export class ContextStatusStore {
  readonly contextStatusService = inject(ContextStatusService);

  contextStatuss = signal<IContextStatus[]>([]);
  currentContextStatus = signal<IContextStatus>(initialContextStatusState);
  contextStatusLoading = signal<boolean>(false);
  contextStatusLoaded = signal<boolean>(false);

  contextStatus = signal<IContextStatus[]>([]);

  getAllContextStatus(): void {
    this.contextStatusLoading.set(true);
    this.contextStatusService.getAllContextStatus().subscribe({
      next: (data) => {
        if (data) {
          this.contextStatuss.set(data);
          this.contextStatusLoaded.set(true);
          this.contextStatusLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des contextStatus', err);
        this.contextStatusLoading.set(false);
      },
    });
  }
  getContextStatusById(id: string): void {
    this.contextStatusLoading.set(true);
    this.contextStatusService.getContextStatusById(id).subscribe({
      next: (data) => {
        if (data) {
          this.currentContextStatus.set(data);
          this.contextStatusLoaded.set(true);
          this.contextStatusLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du contextStatus', err);
        this.contextStatusLoading.set(false);
      },
    });
  }
  updateContextStatus(id: string, body: IContextStatus) {
    this.contextStatusService.updateContextStatus(id, body).subscribe({
      next: (data) => {
        //this.getCurrentContextStatus(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour : error', err);
      },
    });
  }
  createContextStatus(body: IContextStatus) {
    this.contextStatusService.createContextStatus(body).subscribe({
      next: (data) => {
        // this.getCurrentContextStatus(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la création : error', err);
      },
    });
  }
  deleteContextStatus(id: string) {
    this.contextStatusService.deleteContextStatus(id).subscribe({
      next: (data) => {
        // this.getCurrentContextStatus(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression: error', err);
      },
    });
  }
}
