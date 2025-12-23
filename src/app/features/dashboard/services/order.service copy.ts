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
export class OrderService {


orderByDate( items: any[], order: 'asc' | 'desc' = 'asc') {
  if (order === 'desc') {
    items = items.slice().sort((a, b) => {
      return b.startDate.getTime() - a.startDate.getTime();
    });
  }
  if (order === 'asc') {
    items = items.slice().sort((a, b) => {
      return a.startDate.getTime() - b.startDate.getTime();
    });
  }
  return items;
}
}
