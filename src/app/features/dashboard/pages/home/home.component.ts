import { Component, inject, signal } from '@angular/core';

import { PanelStatistic } from '../../components/statistic/panel-statistic/panel-statistic';
import { CardProject } from '../../components/card-project/card-project';

import { AsyncPipe } from '@angular/common';
import { IProjectInstance } from '../../models/project-instance.model';
import { ProjectInstanceStore } from '../../stores/project-instance.store';
import { AuthRoutingModule } from "@app/features/auth/auth-routing.module";
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-home',
  imports: [PanelStatistic, CardProject, AuthRoutingModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  projects = signal<IProjectInstance[]>([]);
  ProjectInstanceStore = inject(ProjectInstanceStore);
  modalService = inject(ModalService);

  ngOnInit() {
    this.projects = this.ProjectInstanceStore.projects;
  }

  newProject() {
      this.modalService.open('Nouveau projet', 'create', 'project'); // Call the openModal
  }
}
