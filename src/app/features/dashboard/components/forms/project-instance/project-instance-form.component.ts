import { Component, effect, inject, input, signal } from '@angular/core';

import { schema, required, minLength, maxLength, Field, form, submit } from '@angular/forms/signals';
import { IProjectInstance } from '@app/features/dashboard/models/project-instance.model';
import { ProjectInstanceService } from '@app/features/dashboard/services/project-instance.service';
import { PriorityStore } from '@app/features/dashboard/stores/priority-store';
import { ProjectInstanceStore } from '@app/features/dashboard/stores/project-instance.store';
import { StatusStore } from '@app/features/dashboard/stores/status-store';


@Component({
  selector: 'app-project-instance-form',
  imports: [Field],
  templateUrl: './project-instance-form.component.html',
  styleUrl: './project-instance-form.component.css',
})
export class ProjectInstanceFormComponent {

  private projectStore = inject(ProjectInstanceStore);
  projectId = signal<number>(this.projectStore.currentProject().id);

  readonly statuses  = inject(StatusStore).statuses;
  readonly priorities  = inject(PriorityStore).priorities;
  private projectService = inject(ProjectInstanceService );

  project = signal<Omit<IProjectInstance, 'createdAt' | 'updatedAt'>>(this.projectStore.initialProjectState);

  private readonly projectSchema = schema<Omit<IProjectInstance,   'createdAt' | 'updatedAt'>>((project) => {
   required(project.name, { message: 'Name is required' });
   required(project.status, { message: 'Status is required' });
   required(project.priority, { message: 'Property is required' });
   required(project.pathFileDatabase, { message: 'pathFileDatabase is required' });

   minLength(project.name, 8, { message: 'Name must be at least 8 characters long' });
   maxLength(project.name, 100, { message: 'icon Database must be at least 255 characters long' });
   maxLength(project.pathFileDatabase, 255, { message: 'Path File Database must be at least 255 characters long' });
  //  required(projectInstance.description, { message: 'Name is required' });
  //  minLength(project.description, 8, { message: 'Password must be at least 8 characters long' });

  //  favory: boolean;
   /*

  icon: string;
  color: string;
  position: number;
  startDate: Date;
  pathProject
  endDate: Date;
  status: number;
  priority: number;
  projectTemplate: number;
  comment: number;
  sprintInstances: string[];
  createdAt: Date;
  updatedAt: Date;
  favory: boolean;
*/
  });
projectForm = form(this.project, this.projectSchema);

constructor() {
  effect(() => {
    const projectId = this.projectId();
    if(projectId){
      {
      this.projectService.getProjectInstanceById(projectId).subscribe({
        next: (data: IProjectInstance) => {
          data.startDate = new Date(data.startDate);
          data.endDate = new Date(data.endDate);
          this.projectStore.getProjectInstanceById(data.id);
          this.project.set(data);
        },
        error: (error) => {
          // this.serverErrorMessages = error.error.message;
          // console.error('Login failed', error.error.message);
        },
      });
    }
  }
})
}

onSubmit(event: Event): void {
   event.preventDefault();

    this.projectForm.name().markAsTouched();
    this.projectForm.name().markAsDirty();

    if (this.projectForm().invalid()) {
      console.log('Form is invalid');
      return;
    }
    const projectValue = this.projectForm().value();


    const projectId = this.projectId();

    if(projectId){
      console.log('update');
      this.projectService.updateProjectInstance(projectId, projectValue).subscribe({
        next: (data: IProjectInstance) => {
          data.startDate = new Date(data.startDate);
          data.endDate = new Date(data.endDate);
          this.project.set(data);
          console.log(data);
        },
        error: (error) => {
          // this.serverErrorMessages = error.error.message;
          // console.error('Login failed', error.error.message);
        },
      });
    }else{
      console.log('create');
      this.projectService.createProjectInstance(projectValue).subscribe({
        next: (data: IProjectInstance) => {
          data.startDate = new Date(data.startDate);
          data.endDate = new Date(data.endDate);
          this.project.set(data);
        },
        error: (error) => {
          // this.serverErrorMessages = error.error.message;
          // console.error('Login failed', error.error.message);
        },
      });
    }
  }
}
