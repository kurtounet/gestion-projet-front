import { inject, Injectable, signal } from '@angular/core';

import { LocalStorageService } from './local-storage.service';
import { StatusStore } from '../stores/status.store';
import { TypeTaskStore } from '../stores/type-task.store';
import { PriorityStore } from '../stores/priority.store';
import { TechnologyStore } from '../stores/technology.store';
import { ProjectInstanceStore } from '../stores/project-instance.store';

@Injectable({
  providedIn: 'root',
})
export class InitAppService {
  allLoading = signal<boolean>(false);
  allLoaded = signal<boolean>(false);
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
    this.allLoaded.set(this.isAllLoaded());
    console.log('InitAppService', this.isAllLoaded());

  }
 isAllLoaded(): boolean {
   return (
     this.statusStore.statusLoaded() &&
     this.typeTaskStore.typeTaskLoaded() &&
     this.priorityStore.priorityLoaded() &&
     this.technologyStore.technologyLoaded()
   );
 }


  resetAll() {
    this.statusStore.statuses.set([]);
    this.statusStore.statusLoaded.set(false);
    this.typeTaskStore.typeTasks.set([]);
    this.typeTaskStore.typeTaskLoaded.set(false);
    this.priorityStore.priorities.set([]);
    this.priorityStore.priorityLoaded.set(false);
    this.technologyStore.technologys.set([]);
    this.technologyStore.technologyLoaded.set(false);
  }
}
