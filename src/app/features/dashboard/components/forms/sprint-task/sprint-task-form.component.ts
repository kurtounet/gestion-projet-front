import { Component, inject, signal, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SprintTaskStore } from '@app/features/dashboard/stores/sprint-task.store';
import { SprintTemplateStore } from '@app/features/dashboard/stores/sprint-template.store';
import { TaskTemplateStore } from '@app/features/dashboard/stores/task-template.store';
import { FormSelectComponent } from '../../shared/form-select/form-select.component';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { ISprintTask } from '@app/features/dashboard/models/sprint-task.model';

@Component({
  selector: 'app-sprint-task-form',
  imports: [ReactiveFormsModule, FormSelectComponent, FormInputComponent],
  templateUrl: './sprint-task-form.component.html',
  styleUrl: './sprint-task-form.component.css',
})
export class SprintTaskFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private sprintTaskStore = inject(SprintTaskStore);
  private sprintTemplateStore = inject(SprintTemplateStore);
  private taskTemplateStore = inject(TaskTemplateStore);

  // Options
  protected sprintTemplateOptions = this.sprintTemplateStore.sprintTemplates;
  protected taskTemplateOptions = this.taskTemplateStore.taskTemplates;

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    sprintTemplateId: [0, [Validators.required]],
    taskTemplateId: [0, [Validators.required]],
    taskOrder: [0, [Validators.required]],
    createdAt: [new Date(), [Validators.required]],
    updatedAt: [new Date(), [Validators.required]],
  });

  ngOnInit() {
    const data = this.sprintTaskStore.currentSprintTask();

    if (data && !this.isNew()) {
      this.form.patchValue(data);
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
    const mappingData: ISprintTask = {
      ...rawValue,
    };

    if (this.isNew()) {
      this.sprintTaskStore.createSprintTask(mappingData);
    } else {
      this.sprintTaskStore.updateSprintTask(String(this.id()), mappingData);
    }
  }
}

