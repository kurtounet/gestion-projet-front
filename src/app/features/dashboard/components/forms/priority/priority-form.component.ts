import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PriorityStore } from '@app/features/dashboard/stores/priority.store';

@Component({
  selector: 'app-priority-form',
  imports: [ReactiveFormsModule],
  templateUrl: './priority-form.component.html',
  styleUrl: './priority-form.component.css',
})
export class PriorityFormComponent {
  id = signal<string | number>(0);
  submitted = false;
  private fb = inject(FormBuilder);
  private priorityStore = inject(PriorityStore);

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
      priority_id: ['', Validators.required],
      priority_label: ['', Validators.required, Validators.minLength(6), Validators.maxLength(255)],
      priority_number: ['', Validators.required],
      created_At: ['', Validators.required],
      updated_At: ['', Validators.required],
    });
  }
  private initUpdateForm(): void {
    //this.projectInstanceStore.getProjectInstanceById(Number(this.id()));
    // const data: IProjectInstance = this.projectInstanceStore.currentProject();
    // const data: IPriority = {};
    const data = {};

    if (!data) {
      this.initCreateForm();
      return;
    }

    this.form = this.fb.nonNullable.group({
      priority_id: ['', Validators.required],
      priority_label: ['', Validators.required, Validators.minLength(6), Validators.maxLength(255)],
      priority_number: ['', Validators.required],
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
