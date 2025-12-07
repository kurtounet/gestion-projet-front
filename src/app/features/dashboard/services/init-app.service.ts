import { inject, Injectable } from '@angular/core';
import { ProjectInstantStore } from '../stores/project-instant.store';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class InitAppService {

    localStorageService = inject(LocalStorageService);
    projectInstanceStore = inject(ProjectInstantStore);
    Init() {
    this.localStorageService.clear();
    this.projectInstanceStore.getAllProjectInstance();
    console.log('init');
  }

}
