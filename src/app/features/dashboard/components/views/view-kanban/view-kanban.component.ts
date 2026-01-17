import { Component, inject, input, computed, effect, signal } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { CardTaskKanbanComponent } from '../../card-task-kanban/card-task-kanban.component';
import { SideBarSprints } from '../../side-bar-sprints/side-bar-sprints';

import { ViewToolBarComponent } from '../../tool-bar/view-tool-bar/view-tool-bar.component';
import { ITaskInstance } from '../../../models/task-instance.model';
import { TaskInstanceService } from '../../../services/task-instance.service';
import { SprintInstanceService } from '../../../services/sprint-instance.service';
import { ISprintInstance } from '../../../models/sprint-instance.model';
import { ProjectInstanceStore } from '@app/features/dashboard/stores/project-instant.store';
import { StatusStore } from '@app/features/dashboard/stores/status-store';

interface Column {
  label: string; //'todo' | 'progress' | 'done';
  status: string;
  tasks: ITaskInstance[];
}
@Component({
  selector: 'app-view-kanban',
  imports: [CdkDropList, CdkDrag, CardTaskKanbanComponent, SideBarSprints, ViewToolBarComponent],
  templateUrl: './view-kanban.component.html',
  styleUrl: './view-kanban.component.scss',
})
export class ViewKanbanComponent {
  sprintId = input<number>(0);
  projectInstanceStore = inject(ProjectInstanceStore);
  statusStore = inject(StatusStore);
  taskInstanceService = inject(TaskInstanceService);

  // sprints: ISprintInstance[]=[];
  viewToolBarTitle = 'Nombre de tâches: ';
  // viewToolBarQuantity = 0;

  // === Signaux dérivés depuis le store ===
  tasks = computed(() => this.projectInstanceStore.currentTasks());
  viewToolBarQuantity = computed(() => this.tasks().length);

  // === État Kanban MUTABLE ===
  columns = signal<Column[]>([]);
  columnsList = computed(() => this.columns().map((c) => `${c.label}List`));

  constructor() {
    // Quand les tasks ou les statuses changent, on recalcule les colonnes
    effect(() => {
      const statuses = this.statusStore.statuses();
      const tasks = this.tasks();

      const cols: Column[] = statuses.map((status) => ({
        label: status.label,
        status: status['@id'],
        tasks: this.taskInstanceService.filtersByStatus(status['@id'], tasks, 'asc'),
        // si filtersByCompleted ne prend qu'un status, fais tasks.filter(...)
      }));

      this.columns.set(cols);
    });
  }
  // Déplacement des colonnes (ordre des colonnes)
  dropColumn(event: CdkDragDrop<Column[]>) {
    this.columns.update((cols) => {
      const clone = [...cols];
      moveItemInArray(clone, event.previousIndex, event.currentIndex);
      return clone;
    });

    this.saveKanbanState();
  }

  // Déplacement des tâches entre colonnes
  drop(event: CdkDragDrop<ITaskInstance[]>) {
    this.columns.update((cols) => {
      const clone = [...cols];

      const sourceIndex =
        event.previousContainer.data === event.container.data
          ? event.previousIndex // même colonne, mais on travaille sur clone
          : clone.findIndex((c) => c.tasks === event.previousContainer.data);

      const targetIndex = clone.findIndex((c) => c.tasks === event.container.data);

      if (sourceIndex === -1 || targetIndex === -1) {
        return cols;
      }

      const sourceCol = clone[sourceIndex];
      const targetCol = clone[targetIndex];

      if (event.previousContainer === event.container) {
        moveItemInArray(targetCol.tasks, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          sourceCol.tasks,
          targetCol.tasks,
          event.previousIndex,
          event.currentIndex,
        );
      }

      return clone;
    });

    this.saveKanbanState();
  }

  // Sauvegarde de l’état (localStorage + API)
  saveKanbanState() {
    const cols = this.columns();

    cols.forEach((column) => {
      column.tasks.forEach((task, index) => {
        let needUpdate = false;

        if (task.status !== column.status) {
          task.status = column.status; // adapter le type si nécessaire
          task.completed = column.label; // adapter le type si nécessaire
          needUpdate = true;
        }

        if (task.position !== index) {
          task.position = index;
          needUpdate = true;
        }

        if (needUpdate) {
          this.taskInstanceService.updateTaskInstance(String(task.id), task).subscribe({
            next: (response) => console.log('Sauvegarde réussie', response),
            error: (error) => console.error('Erreur de sauvegarde', error),
          });
        }
      });
    });

    // localStorage
    localStorage.setItem('kanbanColumns', JSON.stringify(cols));
    console.log('État du kanban sauvegardé:', cols);
  }

  loadKanbanState() {
    const savedColumns = localStorage.getItem('kanbanColumns');
    if (!savedColumns) {
      return;
    }

    try {
      const parsed: Column[] = JSON.parse(savedColumns);
      this.columns.set(parsed);
    } catch (e) {
      console.error('Erreur lors du chargement du Kanban depuis le localStorage', e);
    }
  }

  getCurrentState() {
    const cols = this.columns();
    return {
      columns: cols,
      totalTasks: cols.reduce((total, column) => total + column.tasks.length, 0),
    };
  }

  addTask() {
    console.log('ADD column / task – à implémenter');
  }
}
