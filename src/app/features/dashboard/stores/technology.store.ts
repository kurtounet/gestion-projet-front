import { inject, Injectable, signal } from '@angular/core';
import { ITechnology } from '../models/technology.model';
import { TechnologyService } from '../services/technology.service';

export const initialTechnologieState: ITechnology = {
  id: 0,
  label: '',
  createdAt: new Date().toISOString(),
  updatedAt: null,
  framework: [],
};
@Injectable({
  providedIn: 'root',
})
export class TechnologyStore {
  readonly TechnologyService = inject(TechnologyService);

  technologyLoading = signal<boolean>(false);
  technologyLoaded = signal<boolean>(false);
  technologys = signal<ITechnology[]>([]);
  currentTechnology = signal<ITechnology>(initialTechnologieState);

  getAllTechnologys(): void {
    this.technologyLoading.set(true);
    this.TechnologyService.getAllTechnology().subscribe({
      next: (data) => {
        if (data) {
          this.technologys.set(data);
          this.technologyLoaded.set(true);
          this.technologyLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des Technologys', err);
        this.technologyLoading.set(false);
      },
    });
  }
  getTechnologyById(id: string): void {
    this.technologyLoading.set(true);
    this.TechnologyService.getTechnologyById(id).subscribe({
      next: (data) => {
        if (data) {
          this.currentTechnology.set(data);
          this.technologyLoaded.set(true);
          this.technologyLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du Technology', err);
        this.technologyLoading.set(false);
      },
    });
  }
  updateTechnology(id: string, body: ITechnology) {
    this.TechnologyService.updateTechnology(id, body).subscribe({
      next: (data) => {
        //this.getCurrentTechnology(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour : error', err);
      },
    });
  }
  createTechnology(body: ITechnology) {
    this.TechnologyService.createTechnology(body).subscribe({
      next: (data) => {
        // this.getCurrentTechnology(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la création : error', err);
      },
    });
  }
  deleteTechnology(id: string) {
    this.TechnologyService.deleteTechnology(id).subscribe({
      next: (data) => {
        // this.getCurrentTechnology(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression: error', err);
      },
    });
  }
}
