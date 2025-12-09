import { inject, Injectable, signal } from '@angular/core';
import { ITechnology } from '../models/technology.model';
import { TechnologyService } from '../services/technology.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TechnologyStore {
  readonly technologyService = inject(TechnologyService);
  readonly localStorageService = inject(LocalStorageService);
  technologyLoading = signal<boolean>(false);
  technologyLoaded = signal<boolean>(false);
  technologies = signal<ITechnology[]>([]);

  getAllTechnologies(): void {
    this.technologyLoading.set(true);
    this.technologyService.getAllTechnologie().subscribe({
      next: (data) => {
        if (data) {
          this.technologies.set(data);
          this.technologyLoaded.set(true);
          this.technologyLoading.set(false);
          this.localStorageService.setItem('technologies', data);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des technologies', err);
        this.technologyLoading.set(false);
      },
    });
  }
}
