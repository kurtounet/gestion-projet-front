import { inject, Injectable, signal } from '@angular/core';
import { ITechnology } from '../models/technology.model';
import { TechnologyService } from '../services/technology.service';

@Injectable({
  providedIn: 'root',
})
export class TechnologyStore {

  readonly technologyService = inject(TechnologyService);
  technologyLoading = signal<boolean>(false);
  technologyLoaded = signal<boolean>(false);
  technologies = signal<ITechnology[]>([]);

}
