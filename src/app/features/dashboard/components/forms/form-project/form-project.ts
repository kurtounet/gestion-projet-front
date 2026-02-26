import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectInstanceStore, PriorityStore, StatusStore } from '@app/features/dashboard/stores/index';
import {
  FormInputComponent,
  FormSelectComponent,
  FormTextareaComponent,
} from '../../shared/index';

@Component({
  selector: 'app-form-project',
  standalone: true,
  imports: [ReactiveFormsModule, FormInputComponent, FormSelectComponent, FormTextareaComponent],
  templateUrl: './form-project.html',
  styleUrl: './form-project.css',
})
export class FormProject {
  private fb = inject(FormBuilder);
  private projectStore = inject(ProjectInstanceStore);
  private statusStore = inject(StatusStore);
  private priorityStore = inject(PriorityStore);

  // Options
  protected statusOptions = this.statusStore.statuses;
  protected priorityOptions = this.priorityStore.priorities;

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(true);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    id: [0],
    name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
    description: ['', [Validators.maxLength(255)]],
    status: ['', [Validators.required]],
    priority: ['', [Validators.required]],
  });

  ngOnInit() {
    // Initialisation éventuelle
  }

  get getForm() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      return;
    }

    const rawValue = this.form.getRawValue();
    console.log('FormProject submitted:', rawValue);

    if (this.isNew()) {
      // this.projectStore.createProject(rawValue);
    }
  }
}
