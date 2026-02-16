import { Component, inject, signal } from '@angular/core';

import { PanelStatistic } from '../../components/statistic/panel-statistic/panel-statistic';
import { CardProject } from '../../components/card-project/card-project';

import { AsyncPipe } from '@angular/common';
import { IProjectInstance } from '../../models/project-instance.model';

 
import { ProjectInstanceStore } from '../../stores/project-instance.store';

@Component({
  selector: 'app-home',
  imports: [PanelStatistic, CardProject ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  projects = signal<IProjectInstance[]>([]);
  ProjectInstanceStore = inject(ProjectInstanceStore);

  ngOnInit() {
    this.projects = this.ProjectInstanceStore.projects;
  }
}
