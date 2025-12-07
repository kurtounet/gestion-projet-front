import { Component, inject, input } from '@angular/core';


import { DatePipe, NgOptimizedImage } from '@angular/common';

import { RouterLink } from '@angular/router';
import { ProgressBar } from '../shared/progress-bar/progress-bar';
import { IProjectInstance } from '../../models/project-instance.model';
import { IProgressCardStat } from '../../models/components/static.model';


@Component({
  selector: 'app-card-project',
  imports: [ProgressBar, DatePipe, RouterLink, NgOptimizedImage],
  templateUrl: './card-project.html',
  styleUrl: './card-project.css',
})
export class CardProject {
project = input<IProjectInstance>();
progress!: IProgressCardStat[];


ngOnInit(){


  this.progress = [
    {
      title: 'Taches à faire',
      value: '50' + '%',
      progress: 50,
      target: '100%',
      current: '50' + '%',
      icon: 'project-diagram',
      color: 'blue'
    },
    {
      title: 'Taches en cours',
      value: '50' + '%',
      progress: 50,
      target: '100%',
      current: '50' + '%',
      icon: 'project-diagram',
      color: 'blue'
    },
    {
      title: 'Taches Completées',
      value: '50' + '%',
      progress: 50,
      target: '100%',
      current: '50' + '%',
      icon: 'project-diagram',
      color: 'blue'
    },
  ]
}
}
