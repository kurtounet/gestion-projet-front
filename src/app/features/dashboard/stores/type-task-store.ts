import { inject, Injectable, signal } from '@angular/core';
import { ITypeTask } from '../models/type-task.model';
import { TypeTaskService } from '../services/type-task.service';

@Injectable({
  providedIn: 'root',
})
export class TypeTaskStore {

  readonly typeTaskService = inject(TypeTaskService);
  typeTasksLoading = signal<boolean>(false);
  typeTasksLoaded = signal<boolean>(false);

  typeTasks = signal<ITypeTask[]>([]);

}
