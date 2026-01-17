import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IProjectInstance } from '@app/features/dashboard/models/project-instance.model';
import { ProjectInstanceStore } from '@app/features/dashboard/stores/project-instance.store';


@Component({
  selector: 'app-project-instance-form',
  imports: [ReactiveFormsModule],
  templateUrl: './project-instance-form.component.html',
  styleUrl: './project-instance-form.component.css',
})
export class ProjectInstanceFormComponent {
  id = signal<string | number>(0);
  submitted = false;
  private fb = inject(FormBuilder);
  private projectInstanceStore = inject(ProjectInstanceStore);

  form!: FormGroup;

  ngOnInit() {
    if (this.id() === 0 || this.id() === null) {
      this.initCreateForm();
    } else {
      this.initUpdateForm();
    }
  }

  private initCreateForm(): void {
    this.form = this.fb.nonNullable.group({
      id: ['', Validators.required],
      status_id: [''],
      priority_id: [''],
      project_template_id: [''],
      comment_id: [''],
      name: ['', Validators.required, Validators.minLength(6), Validators.maxLength(255)],
      description: ['', Validators.minLength(6), Validators.maxLength(255)],
      start_date: [''],
      end_date: [''],
      created_At: ['', Validators.required],
      updated_At: ['', Validators.required],
    });
  }
  private initUpdateForm(): void {
    this.projectInstanceStore.getProjectInstanceById(Number(this.id()));
    const data: IProjectInstance = this.projectInstanceStore.currentProject();
    // const data: IProjectInstance = {};

    if (!data) {
      this.initCreateForm();
      return;
    }

    this.form = this.fb.nonNullable.group({
      id: ['', Validators.required],
      status_id: [''],
      priority_id: [''],
      project_template_id: [''],
      comment_id: [''],
      name: ['', Validators.required, Validators.minLength(6), Validators.maxLength(255)],
      description: ['', Validators.minLength(6), Validators.maxLength(255)],
      start_date: [''],
      end_date: [''],
      created_At: ['', Validators.required],
      updated_At: ['', Validators.required],
    });
  }

  get getForm() {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const formValue = this.form.value;

    if (this.id() === 0 || this.id() === null) {
      //this.projectInstanceStore.createProjectInstance(formValue);
      console.log('Création:', formValue);
    } else {
      //this.projectInstanceStore.updateProjectInstance(String(this.id()), formValue);
      console.log('Modification:', formValue);
    }
  }
}
