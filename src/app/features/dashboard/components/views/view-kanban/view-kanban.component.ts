import { Component, inject, input } from '@angular/core';
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

interface Column {
  label: 'todo' | 'progress' | 'done';
  tasks: ITaskInstance[];
}
@Component({
  selector: 'app-view-kanban',
  imports: [CdkDropList, CdkDrag, CardTaskKanbanComponent, SideBarSprints, ViewToolBarComponent],
  templateUrl: './view-kanban.component.html',
  styleUrl: './view-kanban.component.scss',
})
export class ViewKanbanComponent {
  taskInstanceService = inject(TaskInstanceService);
  sprintInstanceService = inject(SprintInstanceService);
  listCompletedStatus: string[] = [];
  columns: { label: string; tasks: ITaskInstance[] }[] = [];
  columnsList: string[] = [];
  sprintId = input<number>(0);

  tasks: ITaskInstance[] = [];
  // sprints: ISprintInstance[]=[];
  viewToolBarTitle = 'Nombre de tâches: ';
  viewToolBarQuantity = 0;

  ngOnInit() {
    // this.sprintInstanceService.getAllSprintInstance().subscribe(data => this.sprints = data);
    this.taskInstanceService.getAllTaskInstance().subscribe((data) => (this.tasks = data));
    this.viewToolBarQuantity = this.tasks.length;
    this.listCompletedStatus = this.taskInstanceService.getAllCompletedStatus();
    this.columnsList = this.listCompletedStatus.map((completed) => `${completed}List`);
    this.columns = this.listCompletedStatus.map((completed) => ({
      label: completed,
      tasks: this.taskInstanceService.filtersByCompleted(completed),
    }));
  }
  // get columnsList() {
  //   return this.columns.map(col => col.label + 'List');
  // }

  // Pour déplacer les colonnes
  dropColumn(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  drop(event: CdkDragDrop<ITaskInstance[], ITaskInstance[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    // Sauvegarder après chaque modification
    this.saveKanbanState();
  }
  // Méthode pour sauvegarder l'état du kanban
  saveKanbanState() {
    this.columns.forEach((column) => {
      const modifiedTasks = column.tasks.filter((task) => {
        let pos = column.tasks.findIndex((t) => t.id === task.id);
        if (!task.completed.includes(column.label)) {
          task.completed = column.label;
          task.position = pos;
        }
        if (task.completed.includes(column.label) && task.position !== pos) {
          task.position = pos;
        }
        this.taskInstanceService.updateTaskInstance(task.id, task).subscribe({
          next: (response) => console.log('Sauvegarde réussie', response),
          error: (error) => console.error('Erreur de sauvegarde', error),
        });
      });
      // console.log(column.label);
      // console.table(modifiedTasks);

      // return false;.findIndex(t => t.id === task.id);
    });

    // this.taskService.updateTask(column.label, column.tasks.length, column.tasks);
    // });
    // Option 1: Sauvegarder dans localStorage
    localStorage.setItem('kanbanColumns', JSON.stringify(this.columns));

    // Option 2: Envoyer vers une API
    // this.kanbanService.saveColumns(this.columns).subscribe({
    //   next: (response) => console.log('Sauvegarde réussie', response),
    //   error: (error) => console.error('Erreur de sauvegarde', error)
    // });

    console.log('État du kanban sauvegardé:', this.columns);
  }

  // Méthode pour charger l'état sauvegardé
  loadKanbanState() {
    const savedColumns = localStorage.getItem('kanbanColumns');
    if (savedColumns) {
      this.columns = JSON.parse(savedColumns);
      // Mettre à jour la liste des colonnes
      this.columnsList = this.columns.map((column) => column.label + 'List');
    }
  }

  // Méthode pour récupérer les données actuelles (utile pour debug)
  getCurrentState() {
    return {
      columns: this.columns,
      totalTasks: this.columns.reduce((total, column) => total + column.tasks.length, 0),
    };
  }

  addTask() {
    console.log('ADD column');
    // const nextId = this.columns.flatMap(c => c.tasks).length + 1;
    // column.tasks.push({ id: nextId, title: `Nouvelle tâche ${nextId}` });
  }
}
