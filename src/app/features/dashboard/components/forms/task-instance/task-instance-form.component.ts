import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskInstanceStore } from '@app/features/dashboard/stores/task-instance.store';

@Component({
  selector: 'app-task-instance-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-instance-form.component.html',
  styleUrl: './task-instance-form.component.css',
})
export class TaskInstanceFormComponent {
  id = signal<string | number>(0);
  submitted = false;
  private fb = inject(FormBuilder);
  private taskInstanceStore = inject(TaskInstanceStore);

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
      user_id: [''],
      task_template_id: [''],
      sprint_instance_id: [''],
      priority_id: [''],
      status_id: [''],
      type_task_id: [''],
      name: ['', Validators.required, Validators.minLength(6), Validators.maxLength(255)],
      description: ['', Validators.minLength(6), Validators.maxLength(255)],
      start_date: [''],
      due_date: [''],
      order: [''],
      parent_task: ['', Validators.required],
      dependency_id: ['', Validators.required],
      created_At: ['', Validators.required],
      updated_At: ['', Validators.required],
      comment_id: ['', Validators.required],
    });
  }
  private initUpdateForm(): void {
    //this.projectInstanceStore.getProjectInstanceById(Number(this.id()));
    // const data: IProjectInstance = this.projectInstanceStore.currentProject();
    // const data: ITaskInstance = {};
    const data = {};

    if (!data) {
      this.initCreateForm();
      return;
    }

    this.form = this.fb.nonNullable.group({
      id: ['', Validators.required],
      user_id: [''],
      task_template_id: [''],
      sprint_instance_id: [''],
      priority_id: [''],
      status_id: [''],
      type_task_id: [''],
      name: ['', Validators.required, Validators.minLength(6), Validators.maxLength(255)],
      description: ['', Validators.minLength(6), Validators.maxLength(255)],
      start_date: [''],
      due_date: [''],
      order: [''],
      parent_task: ['', Validators.required],
      dependency_id: ['', Validators.required],
      created_At: ['', Validators.required],
      updated_At: ['', Validators.required],
      comment_id: ['', Validators.required],
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
