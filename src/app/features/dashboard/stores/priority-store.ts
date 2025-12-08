import { inject, Injectable, signal } from '@angular/core';
import { IPriority } from '../models/priority.model';
import { PriorityService } from '../services/priority.service';

@Injectable({
  providedIn: 'root',
})
export class PriorityStore {

  readonly priorityService = inject(PriorityService);
  prioritiesLoading = signal<boolean>(false);
  prioritiesLoaded = signal<boolean>(false);

  priorities = signal<IPriority[]>([]);

}
