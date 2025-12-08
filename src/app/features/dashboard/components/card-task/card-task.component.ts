import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, effect, inject, input, signal, WritableSignal } from '@angular/core';
import { form, Field, FieldTree } from '@angular/forms/signals';
import { ModalService } from '../../services/modal.service';
import { ITaskInstance } from '../../models/task-instance.model';

@Component({
  selector: 'app-card-task',
  imports: [NgOptimizedImage],
  templateUrl: './card-task.component.html',
  styleUrl: './card-task.component.scss',
})
export class CardTaskComponent {
  modalService = inject(ModalService);
  // 1) Input venant du parent
  task = input.required<ITaskInstance>();

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
  /*
 task = input<ITask>({
  "id": 1,
  "title": "Initialiser le moteur IA",
  "description": "description",
  "assignedTo": "Équipe IA",
  "tags": ["configuration", "urgent"],
  "dueDate": "2025-07-26",
  "completed": "todo",
  "position": 0,
  "dependencies": [],
  "subtasks": [
    "Configurer l’environnement Python",
    "Installer les dépendances ML",
    "Vérifier les versions CUDA"
  ],
  "priority": 2
});
// WritableSignal interne basé sur l’input
  taskSignal: WritableSignal<ITask> = signal<ITask>(this.task());

  constructor() {
    // si tu veux rester synchro avec les changements de l’input
    effect(() => {
      this.taskSignal.set(this.task());
    });
  }

  taskForm = form(this.taskSignal); // ✅ ici on passe bien un WritableSignal
*/
}
