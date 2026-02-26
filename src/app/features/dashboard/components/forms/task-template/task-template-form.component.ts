import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskTemplateStore } from '@app/features/dashboard/stores/task-template.store';
import { SprintTemplateStore } from '@app/features/dashboard/stores/sprint-template.store';
import { TypeTaskStore } from '@app/features/dashboard/stores/type-task.store';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { FormSelectComponent } from '../../shared/form-select/form-select.component';
import { FormTextareaComponent } from '../../shared/form-textarea/form-textarea.component';
import { ITaskTemplate } from '@app/features/dashboard/models/task-template.model';

@Component({
  selector: 'app-task-template-form',
  imports: [ReactiveFormsModule, FormInputComponent, FormSelectComponent, FormTextareaComponent],
  templateUrl: './task-template-form.component.html',
  styleUrl: './task-template-form.component.css',
})
export class TaskTemplateFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private taskTemplateStore = inject(TaskTemplateStore);
  private sprintTemplateStore = inject(SprintTemplateStore);
  private typeTaskStore = inject(TypeTaskStore);

  // Options
  protected sprintTemplateOptions = this.sprintTemplateStore.sprintTemplates;
  protected typeTaskOptions = this.typeTaskStore.typeTasks;
  protected taskTemplateOptions = this.taskTemplateStore.taskTemplates;

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    id: [0],
    sprintTemplateId: [0, [Validators.required]],
    name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
    parentTask: [0],
    typeTaskId: [0, [Validators.required]],
    createdAt: [new Date(), [Validators.required]],
    updatedAt: [new Date(), [Validators.required]],
  });

  ngOnInit() {
    const data = this.taskTemplateStore.currentTaskTemplate();

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
    const templateData: ITaskTemplate = {
      ...rawValue,
      id: rawValue.id || 0,
    };

    if (this.isNew()) {
      this.taskTemplateStore.createTaskTemplate(templateData);
    } else {
      this.taskTemplateStore.updateTaskTemplate(String(this.id()), templateData);
    }
  }
}
