import { inject, Injectable, signal } from '@angular/core';
import { IPriority } from '../models/priority.model';
import { PriorityService } from '../services/priority.service';

@Injectable({
  providedIn: 'root',
})
export class PriorityStore {

  readonly priorityService = inject(PriorityService);
  readonly prioritiesLoading = signal<boolean>(false);
  readonly prioritiesLoaded = signal<boolean>(false);
  favoryProjectsLoading = signal(false);
  priorities = signal<IPriority[]>([]);

}
