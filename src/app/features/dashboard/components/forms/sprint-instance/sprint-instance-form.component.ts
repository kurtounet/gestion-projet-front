import { Component, inject, Signal, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ISprintInstance } from '@app/features/dashboard/models/index';
import { IsoDatePipe } from '@app/pipes/IsoDatePipe/iso-date.pipe';
import { DateService } from '@app/features/dashboard/services/index';
import {
  FormColorPickerComponent,
  FormInputComponent,
  FormSelectComponent,
  FormTextareaComponent,
} from '../../shared/index';
import {
  StatusStore,
  PriorityStore,
  ProjectInstanceStore,
  SprintInstanceStore,
  SprintTemplateStore,
} from '@app/features/dashboard/stores/index';

@Component({
  selector: 'app-sprint-instance-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormInputComponent,
    FormSelectComponent,
    FormTextareaComponent,
    FormColorPickerComponent,
  ],
  templateUrl: './sprint-instance-form.component.html',
  styleUrl: './sprint-instance-form.component.css',
  providers: [IsoDatePipe],
})
export class SprintInstanceFormComponent {
  private fb = inject(FormBuilder);
  private dateService = inject(DateService);

  // Injection des stores
  private statusStore = inject(StatusStore);
  private priorityStore = inject(PriorityStore);
  private projectInstanceStore = inject(ProjectInstanceStore);
  private sprintInstanceStore = inject(SprintInstanceStore);
  private sprintTemplateStore = inject(SprintTemplateStore);

  protected statusOptions = this.statusStore.statuses;
  protected priorityOptions = this.priorityStore.priorities;
  protected sprintTemplateOptions = this.sprintTemplateStore.sprintTemplates;

  isNew = signal<boolean>(false);
  submitted = signal(false);

  protected form = this.fb.nonNullable.group({
    id: [0],
    projectInstance: [''],
    priority: [''],
    sprintTemplate: [''],
    sprintDependency: [''],
    name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
    description: [''],
    color: [''],
    icon: [''],
    startDate: [new Date().toISOString().substring(0, 10), Validators.required],
    endDate: [new Date().toISOString().substring(0, 10), Validators.required],
    status: [''],
    position: [0],
    comment: [''],
    // createdAt: [''],
    // updatedAt: [''],
  });
  ngOnInit() {
    const data = this.projectInstanceStore.selectedSprint();

    if (data && !this.isNew()) {
      console.log(data.status);
      const status = this.statusStore.getLabelById(data.status);
      const priority = this.priorityStore.getLabelById(data.priority);
      const sprintTemplate = this.sprintTemplateStore.sprintTemplates();

      const formattedData = {
        ...data,
        id: data.id,
        status: status,
        priority: priority,
        startDate: this.dateService.dateForForm(data.startDate),
        endDate: this.dateService.dateForForm(data.endDate),
      };

      this.form.patchValue(formattedData as any);
    }
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
    const formValue: ISprintInstance = {
      ...rawValue,
      priority: this.priorityStore.getIdByLabel(rawValue.priority),
      status: this.statusStore.getIdByLabel(rawValue.status),
      startDate: new Date(rawValue.startDate),
      endDate: new Date(rawValue.endDate),
    };

    if (formValue.id === 0 || formValue.id === null) {
      this.sprintInstanceStore.createSprintInstance(formValue);
      this.form.reset();
    } else {
      const updatedSprintInstance = this.sprintInstanceStore.updateSprintInstance(
        String(formValue.id),
        formValue,
      );
      console.log(updatedSprintInstance);
    }
  }
}
