import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { CardProject } from '../../components/card-project/card-project';
import { IProjectInstance } from '../../models/project-instance.model';
import { ProjectInstanceStore } from '../../stores/project-instance.store';
import { PanelStatistic } from '../../components/statistic/panel-statistic/panel-statistic';

@Component({
  selector: 'app-home',
  imports: [PanelStatistic, CardProject],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  projects = signal<IProjectInstance[]>([]);
  modalService = inject(ModalService);
  ProjectInstanceStore = inject(ProjectInstanceStore);

  ngOnInit() {
    this.projects = this.ProjectInstanceStore.projects;
  }

  newProject() {
    this.modalService.open('Nouveau projet', 'create', 'project');
  }
}
