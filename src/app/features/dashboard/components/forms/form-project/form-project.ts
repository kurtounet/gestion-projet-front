import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectInstanceStore } from '@app/features/dashboard/stores/project-instance.store';
import { PriorityStore } from '@app/features/dashboard/stores/priority.store';
import { StatusStore } from '@app/features/dashboard/stores/status.store';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { FormSelectComponent } from '../../shared/form-select/form-select.component';
import { FormTextareaComponent } from '../../shared/form-textarea/form-textarea.component';

@Component({
  selector: 'app-form-project',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormInputComponent,
    FormSelectComponent,
    FormTextareaComponent,
  ],
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

