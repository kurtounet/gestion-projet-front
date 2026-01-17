import { inject, Injectable } from '@angular/core';
import { ProjectInstanceStore } from '../stores/project-instant.store';
import { LocalStorageService } from './local-storage.service';
import { StatusStore } from '../stores/status-store';
import { TypeTaskStore } from '../stores/type-task-store';
import { PriorityStore } from '../stores/priority.store';
import { TechnologyStore } from '../stores/technology-store';

@Injectable({
  providedIn: 'root',
})
export class InitAppService {
  statusStore = inject(StatusStore);
  typeTaskStore = inject(TypeTaskStore);
  priorityStore = inject(PriorityStore);
  technologyStore = inject(TechnologyStore);
  localStorageService = inject(LocalStorageService);
  projectInstanceStore = inject(ProjectInstanceStore);
  Init() {
    this.localStorageService.clear();
    this.statusStore.getAllStatus();
    this.typeTaskStore.getAllTypeTask();
    this.priorityStore.getAllPriority();
    this.technologyStore.getAllTechnologys();
    this.projectInstanceStore.getAllProjectInstance();
  }
}
