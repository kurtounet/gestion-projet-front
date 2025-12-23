import { inject, Injectable, signal } from '@angular/core';
import { ProjectInstanceStore } from '../stores/project-instance.store';
import { LocalStorageService } from './local-storage.service';
import { StatusStore } from '../stores/status-store';
import { TypeTaskStore } from '../stores/type-task-store';
import { PriorityStore } from '../stores/priority-store';
import { TechnologyStore } from '../stores/technology-store';

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
    // this.technologyStore.getAllTechnologies();
    this.projectInstanceStore.getAllProjectInstance();
    this.allLoaded.set(this.isAllLoaded());
    console.log('InitAppService', this.isAllLoaded());

  }
 isAllLoaded(): boolean {
   return (
     this.statusStore.statusesLoaded() &&
     this.typeTaskStore.typeTasksLoaded() &&
     this.priorityStore.prioritiesLoaded() &&
     this.technologyStore.technologyLoaded()
   );
 }


  resetAll() {
    this.statusStore.statuses.set([]);
    this.statusStore.statusesLoaded.set(false);
    this.typeTaskStore.typeTasks.set([]);
    this.typeTaskStore.typeTasksLoaded.set(false);
    this.priorityStore.priorities.set([]);
    this.priorityStore.prioritiesLoaded.set(false);
    this.technologyStore.technologies.set([]);
    this.technologyStore.technologyLoaded.set(false);
  }
}
