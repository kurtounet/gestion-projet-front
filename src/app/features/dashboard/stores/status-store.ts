import { inject, Injectable, signal } from '@angular/core';
import { StatusService } from '../services/status.service';
import { IStatus } from '../models/status.model';

@Injectable({
  providedIn: 'root',
})
export class StatusStore {

  readonly statusService = inject(StatusService);
  statusesLoading = signal<boolean>(false);
  statusesLoaded = signal<boolean>(false);
  statuses = signal<IStatus[]>([]);

}
