import { Component, inject, signal } from '@angular/core';
import {
  form,
  schema,
  submit,
  Field,
  minLength,
  required,
  maxLength,
} from '@angular/forms/signals';
import { IProjectInstance } from '@app/features/dashboard/models/project-instance.model';
import { ProjectInstanceService } from '@app/features/dashboard/services/project-instance.service';
import { ProjectInstanceStore } from '@app/features/dashboard/stores/project-instance.store';

@Component({
  selector: 'app-form-project',
  imports: [Field],
  templateUrl: './form-project.html',
  styleUrl: './form-project.css',
})
export class FormProject {
  private projectStore = inject(ProjectInstanceStore);
  private projectService = inject(ProjectInstanceService);

  project = signal<Omit<IProjectInstance, 'id' | 'createdAt' | 'updatedAt'>>(
    this.projectStore.initialProjectState(),
  );
  private readonly projectSchema = schema<Omit<IProjectInstance, 'id' | 'createdAt' | 'updatedAt'>>(
    (project) => {
      required(project.name, { message: 'Name is required' });
      required(project.status, { message: 'status is required' });
      required(project.priority, { message: 'Priority is required' });
      //  required(project.pathFileDatabase, { message: 'Path File Database is required' });

      minLength(project.name, 8, { message: 'Name must be at least 8 characters long' });
      maxLength(project.name, 8, {
        message: 'Path File Database must be at least 255 characters long',
      });
      maxLength(project.name, 8, { message: 'icon Database must be at least 255 characters long' });
      //  required(projectInstance.description, { message: 'Name is required' });
      minLength(project.description, 8, { message: 'Password must be at least 8 characters long' });

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

      // email
      // required(credentials.email, { message: 'Email is required' });
      // email(credentials.email, { message: 'Enter a valid email address' });
      // password
      // required(credentials.password, { message: 'Password is required' });
      // minLength(credentials.password, 8, { message: 'Password must be at least 8 characters long' });
    },
  );

  protected readonly projectInstanceForm = form(this.project, this.projectSchema);

  onSubmit(event: Event): void {
    event.preventDefault();
    submit(this.projectInstanceForm, async () => {
      const project = this.projectInstanceForm().value();
      this.projectService.createProjectInstance(project).subscribe({
        next: (data: IProjectInstance) => {},
        error: (error) => {
          // this.serverErrorMessages = error.error.message;
          // console.error('Login failed', error.error.message);
        },
      });
    });
  }
}
