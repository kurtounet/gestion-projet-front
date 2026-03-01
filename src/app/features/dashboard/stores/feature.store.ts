import { inject, Injectable, signal } from '@angular/core';
import { IFeature } from '../models/feature.model';
import { FeatureService } from '../services/feature.service';
export const initialFeatureState: IFeature = {
  id: 0,
  label: '',
  createdAt: new Date().toISOString(),
  updatedAt: null,
};
@Injectable({
  providedIn: 'root',
})
export class FeatureStore {
  readonly featureService = inject(FeatureService);

  features = signal<IFeature[]>([]);
  currentFeature = signal<IFeature>(initialFeatureState);
  featureLoading = signal<boolean>(false);
  featureLoaded = signal<boolean>(false);

  feature = signal<IFeature[]>([]);

  getAllFeature(): void {
    this.featureLoading.set(true);
    this.featureService.getAllFeature().subscribe({
      next: (data) => {
        if (data) {
          this.features.set(data);
          this.featureLoaded.set(true);
          this.featureLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des feature', err);
        this.featureLoading.set(false);
      },
    });
  }
  getFeatureById(id: string): void {
    this.featureLoading.set(true);
    this.featureService.getFeatureById(id).subscribe({
      next: (data) => {
        if (data) {
          this.currentFeature.set(data);
          this.featureLoaded.set(true);
          this.featureLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du feature', err);
        this.featureLoading.set(false);
      },
    });
  }
  updateFeature(id: string, body: IFeature) {
    this.featureService.updateFeature(id, body).subscribe({
      next: (data) => {
        //this.getCurrentFeature(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour : error', err);
      },
    });
  }
  createFeature(body: IFeature) {
    this.featureService.createFeature(body).subscribe({
      next: (data) => {
        // this.getCurrentFeature(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la création : error', err);
      },
    });
  }
  deleteFeature(id: string) {
    this.featureService.deleteFeature(id).subscribe({
      next: (data) => {
        // this.getCurrentFeature(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression: error', err);
      },
    });
  }
}
