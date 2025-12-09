import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, computed, effect, inject, input, signal, WritableSignal } from '@angular/core';
import { form, Field, FieldTree } from '@angular/forms/signals';
import { ModalService } from '../../services/modal.service';
import { ITaskInstance } from '../../models/task-instance.model';
import { StatusStore } from '../../stores/status-store';
import { PriorityStore } from '../../stores/priority-store';

@Component({
  selector: 'app-card-task',
  imports: [NgOptimizedImage, DatePipe],
  templateUrl: './card-task.component.html',
  styleUrl: './card-task.component.scss',
})
export class CardTaskComponent {
  task = input.required<ITaskInstance>();

  modalService = inject(ModalService);
  statuses = inject(StatusStore).statuses;
  priorities = inject(PriorityStore).priorities;
  isOpen = signal<boolean>(false);

  statusName = computed(() => {
  const status = this.statuses().find((status) => status['@id'] === this.task()?.status);
  return status ? status.label : '';
 });
  priorityName = computed(() => {
  const priority = this.priorities().find((priority) => priority['@id'] === this.task()?.priority);
  return priority ? priority.label : '';
 });
  color = computed(() => {
   return this.task()?.color;
 });

  toogleAction() {
    this.isOpen.update((value) => !value);
  }
  toogleCompleted() {
    this.task().completed = this.task().completed === 'true' ? 'false' : 'true';
  }
  // 1) Input venant du parent


  // 2) WritableSignal interne qui servira de "model" au form()
  // private taskModel: WritableSignal<ITaskInstance> = signal<ITaskInstance>({} as ITaskInstance);

  // 3) Form basé sur le WritableSignal
  // taskForm: FieldTree<ITaskInstance, string | number> = form(this.taskModel);

  // constructor() {
  //   // 4) On synchronise l’input vers le model
  //   effect(() => {
  //     const task = this.task();
  //     this.taskId = task.id;
  //     this.taskModel.set(task);
  //   });
  // }



  editTask(id: number) {
    this.modalService.open(`Edit task`, 'edit', 'task', id);
  }
  deleteTask(id: number) {
    this.modalService.open(`Supprimer task ${id}`, 'delete', 'task', id);
  }

}
