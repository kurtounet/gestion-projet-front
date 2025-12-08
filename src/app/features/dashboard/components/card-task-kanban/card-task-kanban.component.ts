import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ITaskInstance } from '../../models/task-instance.model';

@Component({
  selector: 'app-card-task-kanban',
  imports: [DatePipe, NgOptimizedImage],
  templateUrl: './card-task-kanban.component.html',
  styleUrl: './card-task-kanban.component.scss',
})
export class CardTaskKanbanComponent {
  modalService = inject(ModalService);
  task = input<ITaskInstance>();
  layoutList: boolean = true;

  editTask(id: number | undefined) {
    if (!id) return;
    this.modalService.open(`Edit task`, 'edit', 'task', id);
  }
  deleteTask(id: number | undefined) {
    if (!id) return;
    this.modalService.open(`Delete task`, 'delete', 'task', id);
  }
  // tasks: ITask = {
  //       "id": 1,
  //       "title": "Initialiser le moteur IA",
  //       "description": "description",
  //       "assignedTo": "Équipe IA",
  //       "tags": ["configuration", "urgent"],
  //       "dueDate": "2025-07-26",
  //       "completed": "todo",
  //       "position": 0,
  //       "dependencies": [],
  //       "subtasks": [
  //         "Configurer l’environnement Python",
  //         "Installer les dépendances ML",
  //         "Vérifier les versions CUDA"
  //       ],
  //       "priority": 2
  //     };
}
