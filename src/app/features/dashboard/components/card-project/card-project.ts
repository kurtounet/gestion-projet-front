import { Component, inject, input, signal } from '@angular/core';

import { DatePipe, NgOptimizedImage } from '@angular/common';

import { RouterLink } from '@angular/router';
import { ProgressBar } from '../shared/progress-bar/progress-bar';
import { IProjectInstance } from '../../models/project-instance.model';
import { IProgressCardStat } from '../../models/components/static.model';
import { StarFavorit } from '../star-favorit/star-favorit';

@Component({
  selector: 'app-card-project',
  imports: [ProgressBar, DatePipe, RouterLink, NgOptimizedImage, StarFavorit],
  templateUrl: './card-project.html',
  styleUrl: './card-project.css',
})
export class CardProject {
  project = input<IProjectInstance>();
  progress!: IProgressCardStat[];
  barVisible = signal<boolean>(false);
  isFavorit = signal<boolean>(false);
  barIsVisible() {
    this.barVisible.set(!this.barVisible());
  }
  toogleFavorit(project: IProjectInstance | undefined) {
    if (project) {
      this.isFavorit.set(project.favory);
      project.favory = !project.favory;
    }
  }
  ngOnInit() {
    this.progress = [
      {
        title: 'Taches à faire',
        value: '50' + '%',
        progress: 50,
        target: '100%',
        current: '50' + '%',
        icon: 'project-diagram',
        color: 'blue',
      },
      {
        title: 'Taches en cours',
        value: '50' + '%',
        progress: 50,
        target: '100%',
        current: '50' + '%',
        icon: 'project-diagram',
        color: 'blue',
      },
      {
        title: 'Taches Completées',
        value: '50' + '%',
        progress: 50,
        target: '100%',
        current: '50' + '%',
        icon: 'project-diagram',
        color: 'blue',
      },
    ];
  }
}
