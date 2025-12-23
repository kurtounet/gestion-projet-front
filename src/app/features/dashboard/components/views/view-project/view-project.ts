import { Component, effect, inject, signal } from '@angular/core';
import { ProjectInstanceFormComponent } from "../../forms/project-instance/project-instance-form.component";
import { ProjectInstanceStore } from '@app/features/dashboard/stores/project-instance.store';

@Component({
  selector: 'app-view-project',
  imports: [ProjectInstanceFormComponent],
  templateUrl: './view-project.html',
  styleUrl: './view-project.css',
})
export class ViewProject {
  private readonly projectStore = inject(ProjectInstanceStore);

}
