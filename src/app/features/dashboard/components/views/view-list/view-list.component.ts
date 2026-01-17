import { Component, computed, inject } from '@angular/core';
import { CardTaskComponent } from '../../card-task/card-task.component';
import { SideBarSprints } from '../../side-bar-sprints/side-bar-sprints';
import { ViewToolBarComponent } from '../../tool-bar/view-tool-bar/view-tool-bar.component';

import { LoadingSpinner } from '../../loading-spinner/loading-spinner';
import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { ITaskInstance } from '@app/features/dashboard/models/task-instance.model';
import { ProjectInstanceStore } from '@app/features/dashboard/stores/project-instance.store';

@Component({
  selector: 'app-view-list',
  imports: [
    SideBarSprints,
    ViewToolBarComponent,
    CardTaskComponent,
    LoadingSpinner,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './view-list.component.html',
  styleUrl: './view-list.component.scss',
})
export class ViewListComponent {
  viewToolBarTitle = 'Nombre de tâches: ';
  readonly projectInstanceStore = inject(ProjectInstanceStore);

  items = computed(() =>
    this.projectInstanceStore.currentTasks().sort((a, b) => a.position - b.position),
  );

  drop(event: CdkDragDrop<ITaskInstance[]>) {
    moveItemInArray(this.items(), event.previousIndex, event.currentIndex);

    queueMicrotask(() => {
      this.projectInstanceStore.updateTaskOrder(this.items());
    });
  }
}
