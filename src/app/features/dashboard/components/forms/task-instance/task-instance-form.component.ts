import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskInstanceStore } from '@app/features/dashboard/stores/task-instance.store';
import { UserStore } from '@app/features/dashboard/stores/user.store';
import { TaskTemplateStore } from '@app/features/dashboard/stores/task-template.store';
import { SprintInstanceStore } from '@app/features/dashboard/stores/sprint-instance.store';
import { PriorityStore } from '@app/features/dashboard/stores/priority.store';
import { StatusStore } from '@app/features/dashboard/stores/status.store';
import { TypeTaskStore } from '@app/features/dashboard/stores/type-task.store';
import { CommentStore } from '@app/features/dashboard/stores/comment.store';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { FormSelectComponent } from '../../shared/form-select/form-select.component';
import { FormTextareaComponent } from '../../shared/form-textarea/form-textarea.component';
import { ITaskInstance } from '@app/features/dashboard/models/task-instance.model';
import { GetStatusPipe } from '@app/pipes/get-status-pipe';
import { GetPriorityPipe } from '@app/pipes/get-priority-pipe';
import { IsoDatePipe } from '@app/pipes/IsoDatePipe/iso-date.pipe';

@Component({
  selector: 'app-task-instance-form',
  imports: [ReactiveFormsModule, FormInputComponent, FormSelectComponent, FormTextareaComponent],
  templateUrl: './task-instance-form.component.html',
  styleUrl: './task-instance-form.component.css',
  providers: [IsoDatePipe, GetPriorityPipe, GetStatusPipe],
})
export class TaskInstanceFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private taskInstanceStore = inject(TaskInstanceStore);
  private userStore = inject(UserStore);
  private taskTemplateStore = inject(TaskTemplateStore);
  private sprintInstanceStore = inject(SprintInstanceStore);
  private priorityStore = inject(PriorityStore);
  private statusStore = inject(StatusStore);
  private typeTaskStore = inject(TypeTaskStore);
  private commentStore = inject(CommentStore);
  private isoDatePipe = inject(IsoDatePipe);

  // Options
  protected userOptions = this.userStore.users;
  protected taskTemplateOptions = this.taskTemplateStore.taskTemplates;
  protected sprintInstanceOptions = this.sprintInstanceStore.sprintInstances;
  protected priorityOptions = this.priorityStore.priorities;
  protected statusOptions = this.statusStore.statuses;
  protected typeTaskOptions = this.typeTaskStore.typeTasks;
  protected commentOptions = this.commentStore.comments;

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    id: [0],
    user: ['', [Validators.required]],
    taskTemplate: [''],
    sprintInstance: ['', [Validators.required]],
    icon: [''],
    color: [''],
    priority: ['', [Validators.required]],
    status: ['', [Validators.required]],
    typeTask: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
    startDate: [new Date().toISOString().substring(0, 10), [Validators.required]],
    dueDate: [new Date().toISOString().substring(0, 10), [Validators.required]],
    position: [0],
    parentTask: [''],
    dependency: [0],
    // createdAt: [new Date(), [Validators.required]],
    // updatedAt: [new Date(), [Validators.required]],
    comment: [''],
    completed: [''],
  });

  ngOnInit() {
    const data = this.taskInstanceStore.currentTaskInstance();
    console.log(data);
    if (data && !this.isNew()) {
      const formattedData = {
        ...data,
        id: data.id,
        status: this.statusStore.getLabelById(Number(data.status)),
        priority: this.priorityStore.getLabelById(Number(data.priority)),
        startDate: this.isoDatePipe.transform(data.startDate),
        dueDate: this.isoDatePipe.transform(data.dueDate),
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
    const formValue: ITaskInstance = {
      ...rawValue,
      priority: this.priorityStore.getIdByLabel(rawValue.priority),
      status: this.statusStore.getIdByLabel(rawValue.status),
      startDate: new Date(rawValue.startDate),
      dueDate: new Date(rawValue.dueDate),
    };

    if (this.isNew()) {
      this.taskInstanceStore.createTaskInstance(formValue);
    } else {
      this.taskInstanceStore.updateTaskInstance(String(this.id()), formValue);
    }
  }
}
