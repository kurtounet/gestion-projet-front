import { inject, Injectable, signal } from '@angular/core';
import { ITechnology } from '../models/technology.model';
import { TechnologyService } from '../services/technology.service';


 export const initialTechnologieState: ITechnology = {
  id: 0,
  label: "",
};
@Injectable({
  providedIn: 'root',
})
export class TechnologyStore {
  readonly TechnologyService = inject(TechnologyService);

  TechnologyLoading = signal<boolean>(false);
  TechnologyLoaded = signal<boolean>(false);
  Technologys = signal<ITechnology[]>([]);
  currentTechnology = signal<ITechnology>(initialTechnologieState);

  getAllTechnologys(): void {
    this.TechnologyLoading.set(true);
    this.TechnologyService.getAllTechnology().subscribe({
      next: (data) => {
        if (data) {
          this.Technologys.set(data);
          this.TechnologyLoaded.set(true);
          this.TechnologyLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des Technologys', err);
        this.TechnologyLoading.set(false);
      },
    });
  }
  getTechnologyById(id: string): void {
    this.TechnologyLoading.set(true);
    this.TechnologyService.getTechnologyById(id).subscribe({
      next: (data) => {
        if (data) {
          this.currentTechnology.set(data);
          this.TechnologyLoaded.set(true);
          this.TechnologyLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du Technology', err);
        this.TechnologyLoading.set(false);
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
