import { Component, effect, inject, signal } from '@angular/core';
import { IProjectInstance } from '@app/features/dashboard/models/project-instance.model';
import { ProjectInstanceStore } from '@app/features/dashboard/stores/project-instant.store';

@Component({
  selector: 'app-view-project',
  imports: [],
  templateUrl: './view-project.html',
  styleUrl: './view-project.css',
})
export class ViewProject {
  private readonly projectStore = inject(ProjectInstanceStore);
  project = this.projectStore.currentProject; //
}
