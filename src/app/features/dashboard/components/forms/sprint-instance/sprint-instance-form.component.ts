import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SprintInstanceStore } from '@app/features/dashboard/stores/sprint-instance.store';

@Component({
  selector: 'app-sprint-instance-form',
  imports: [ReactiveFormsModule],
  templateUrl: './sprint-instance-form.component.html',
  styleUrl: './sprint-instance-form.component.css',
})
export class SprintInstanceFormComponent {
  id = signal<string | number>(0);
  submitted = false;
  private fb = inject(FormBuilder);
  private sprintInstanceStore = inject(SprintInstanceStore);

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
      project_instance_id: [''],
      priority_id: ['', Validators.required],
      sprint_template_id: [''],
      sprint_dependency_id: ['', Validators.required],
      name: ['', Validators.required, Validators.minLength(6), Validators.maxLength(255)],
      start_date: [''],
      end_date: [''],
      status_id: [''],
      order: [''],
      comment_id: ['', Validators.required],
      created_At: ['', Validators.required],
      updated_At: ['', Validators.required],
    });
  }
  private initUpdateForm(): void {
    //this.projectInstanceStore.getProjectInstanceById(Number(this.id()));
    // const data: IProjectInstance = this.projectInstanceStore.currentProject();
    // const data: ISprintInstance = {};
    const data = {};

    if (!data) {
      this.initCreateForm();
      return;
    }

    this.form = this.fb.nonNullable.group({
      id: ['', Validators.required],
      project_instance_id: [''],
      priority_id: ['', Validators.required],
      sprint_template_id: [''],
      sprint_dependency_id: ['', Validators.required],
      name: ['', Validators.required, Validators.minLength(6), Validators.maxLength(255)],
      start_date: [''],
      end_date: [''],
      status_id: [''],
      order: [''],
      comment_id: ['', Validators.required],
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
