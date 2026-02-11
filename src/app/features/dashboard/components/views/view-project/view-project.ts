import { Component, effect, inject, signal } from '@angular/core';

import { ProjectInstanceStore } from '@app/features/dashboard/stores/project-instance.store';
import { ProjectInstanceFormComponent } from '../../forms/project-instance/project-instance-form.component';

import { FrameworkFormComponent } from '../../forms/framework/framework-form.component';

@Component({
  selector: 'app-view-project',
  imports: [ProjectInstanceFormComponent, FrameworkFormComponent],
  templateUrl: './view-project.html',
  styleUrl: './view-project.css',
})
export class ViewProject {
  private readonly projectStore = inject(ProjectInstanceStore);
  project = this.projectStore.currentProject; //
}
