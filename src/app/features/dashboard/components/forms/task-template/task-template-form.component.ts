import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskTemplateStore } from '@app/features/dashboard/stores/task-template.store';

@Component({
  selector: 'app-task-template-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-template-form.component.html',
  styleUrl: './task-template-form.component.css',
})
export class TaskTemplateFormComponent {
  id = signal<string | number>(0);
  submitted = false;
  private fb = inject(FormBuilder);
  private taskTemplateStore = inject(TaskTemplateStore);

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
      sprint_template_id: [''],
      name: ['', Validators.required, Validators.minLength(6), Validators.maxLength(255)],
      description: ['', Validators.minLength(6), Validators.maxLength(255)],
      parent_task: ['', Validators.required],
      type_task_id: ['', Validators.required],
      created_At: ['', Validators.required],
      updated_At: ['', Validators.required],
    });
  }
  private initUpdateForm(): void {
    //this.projectInstanceStore.getProjectInstanceById(Number(this.id()));
    // const data: IProjectInstance = this.projectInstanceStore.currentProject();
    // const data: ITaskTemplate = {};
    const data = {};

    if (!data) {
      this.initCreateForm();
      return;
    }

    this.form = this.fb.nonNullable.group({
      id: ['', Validators.required],
      sprint_template_id: [''],
      name: ['', Validators.required, Validators.minLength(6), Validators.maxLength(255)],
      description: ['', Validators.minLength(6), Validators.maxLength(255)],
      parent_task: ['', Validators.required],
      type_task_id: ['', Validators.required],
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
