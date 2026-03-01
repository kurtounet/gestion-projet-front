import { inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { IFramework } from '../models/framework.model';
import { FrameworkService } from '../services/framework.service';

export const initialFrameworkState: IFramework = {
  '@id': '',
  '@type': '',
  id: 0,
  label: '',
  type: '',
  version: '',
  description: null,
  icon: null,
  color: null,
  configuration: [],
  technology: null,
  createdAt: new Date().toISOString(),
  updatedAt: null,
  configProjectFrameworks: [],
};
@Injectable({
  providedIn: 'root',
})
export class FrameworkStore {
  readonly StorageService = inject(LocalStorageService);
  readonly frameworkService = inject(FrameworkService);

  readonly frameworkLoading = signal<boolean>(false);
  readonly frameworkLoaded = signal<boolean>(false);

  initialFrameworkState = signal<IFramework>(initialFrameworkState);
  favoryframeworkLoading = signal(false);
  frameworks = signal<IFramework[]>([]);
  currentFramework = signal<IFramework>(initialFrameworkState);

  getAllFramework(): void {
    this.frameworkLoading.set(true);
    this.frameworkLoaded.set(false);
    this.frameworkService.getAllFramework().subscribe({
      next: (data: IFramework[]) => {
        this.frameworks.set(data);
        this.frameworkLoading.set(false);
        this.frameworkLoaded.set(true);
        this.StorageService.setItem('frameworks', data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des framework', err);
        this.frameworkLoading.set(false);
      },
    });
  }

  getFrameworkById(id: number) {
    this.frameworkService.getFrameworkById(id).subscribe({
      next: (data: IFramework) => {
        this.currentFramework.set(data);
        this.StorageService.setItem('current-Framework', data);
      },
      error: (err) => {
        console.error('getframeworkById: error', err);
        // éventuellement : this.currentFramework.set(null);
      },
    });
  }

  createFramework(body: IFramework) {
    return this.frameworkService.createFramework(body);
  }
  updateFramework(id: string, body: IFramework) {
    return this.frameworkService.updateFramework(id, body);
  }
}
