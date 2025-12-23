import { Component, inject, signal } from '@angular/core';

import { PanelStatistic } from '../../components/statistic/panel-statistic/panel-statistic';
import { CardProject } from '../../components/card-project/card-project';

import { AsyncPipe } from '@angular/common';
import { IProjectInstance } from '../../models/project-instance.model';
import { ProjectInstantStore } from '../../stores/project-instant.store';
import { AuthRoutingModule } from "@app/features/auth/auth-routing.module";

@Component({
  selector: 'app-home',
  imports: [PanelStatistic, CardProject, AuthRoutingModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  projects = signal<IProjectInstance[]>([]);
  projectInstantStore = inject(ProjectInstantStore);

  ngOnInit() {
    this.projects = this.projectInstantStore.projects;
  }
}
