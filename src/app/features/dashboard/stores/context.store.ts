import { inject, Injectable, signal } from '@angular/core';
import { IContext } from '../models/context.model';
import { ContextService } from '../services/context.service';
 export const initialContextState: IContext = {
  id: 0,
  contextLabel: "",
  createdAt: new Date('now()'),
  updatedAt: new Date('now()'),
};
@Injectable({
  providedIn: 'root',
})
export class ContextStore {
  readonly contextService = inject(ContextService);

  contexts = signal<IContext[]>([]);
  currentContext = signal<IContext>(initialContextState);
  contextLoading = signal<boolean>(false);
  contextLoaded = signal<boolean>(false);

  context = signal<IContext[]>([]);

  getAllContext(): void {
    this.contextLoading.set(true);
    this.contextService.getAllContext().subscribe({
      next: (data) => {
        if (data) {
          this.contexts.set(data);
          this.contextLoaded.set(true);
          this.contextLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des context', err);
        this.contextLoading.set(false);
      },
    });
  }
  getContextById(id: string): void {
    this.contextLoading.set(true);
    this.contextService.getContextById(id).subscribe({
      next: (data) => {
        if (data) {
          this.currentContext.set(data);
          this.contextLoaded.set(true);
          this.contextLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du context', err);
        this.contextLoading.set(false);
      },
    });
  }
  updateContext(id: string, body: IContext) {
    this.contextService.updateContext(id, body).subscribe({
      next: (data) => {
        //this.getCurrentContext(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour : error', err);
      },
    });
  }
  createContext(body: IContext) {
    this.contextService.createContext(body).subscribe({
      next: (data) => {
        // this.getCurrentContext(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la création : error', err);
      },
    });
  }
  deleteContext(id: string) {
    this.contextService.deleteContext(id).subscribe({
      next: (data) => {
        // this.getCurrentContext(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression: error', err);
      },
    });
  }
}
