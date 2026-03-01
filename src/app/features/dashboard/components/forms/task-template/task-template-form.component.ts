import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  TaskTemplateStore,
  SprintTemplateStore,
  TypeTaskStore,
} from '@app/features/dashboard/stores/index';
import { FormInputComponent, FormSelectComponent, FormTextareaComponent } from '../../shared/index';
import { ITaskTemplate } from '@app/features/dashboard/models/index';
import { ModalService } from '@app/features/dashboard/services/modal.service';

@Component({
  selector: 'app-task-template-form',
  imports: [ReactiveFormsModule, FormInputComponent, FormSelectComponent, FormTextareaComponent],
  templateUrl: './task-template-form.component.html',
  styleUrl: './task-template-form.component.css',
})
export class TaskTemplateFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private modalService = inject(ModalService);
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
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(65535)]],
    parentTask: [0, [Validators.required]],
    sprintTemplate: [null as string | null],
    typeTask: [null as string | null],
  });

  ngOnInit() {
    const action = this.modalService.action();
    if (action === 'create') {
      this.isNew.set(true);
    }
    const data = this.taskTemplateStore.currentTaskTemplate();

    if (data && !this.isNew()) {
      this.form.patchValue(data as any);
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
      createdAt: '', // Will be set by backend
    };

    if (this.isNew()) {
      this.taskTemplateStore.createTaskTemplate(templateData);
    } else {
      this.taskTemplateStore.updateTaskTemplate(String(templateData.id), templateData);
    }
  }
}
