import { DatePipe, NgOptimizedImage } from '@angular/common';
import {
  afterRenderEffect,
  Component,
  computed,
  effect,
  EventEmitter,
  inject,
  input,
  output,
  Output,
  signal,
} from '@angular/core';

import { SideBarcardSprint } from './side-bar-card-sprint/side-bar-card-sprint';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { ISprintInstance } from '../../models/sprint-instance.model';
import { ProjectInstantStore } from '../../stores/project-instant.store';

@Component({
  selector: 'app-side-bar-sprints',
  imports: [SideBarcardSprint, CdkDropList, CdkDrag],
  templateUrl: './side-bar-sprints.html',
  styleUrl: './side-bar-sprints.css',
})
export class SideBarSprints {
  readonly projectInstanceStore = inject(ProjectInstantStore);

  items = computed(() =>
    this.projectInstanceStore.currentProjectSprints().sort((a, b) => a.position - b.position),
  );

  selectedSprintId = signal<number | null>(null);
  isSelected = signal<boolean>(false);

  drop(event: CdkDragDrop<ISprintInstance[]>) {
    moveItemInArray(this.items(), event.previousIndex, event.currentIndex);

    queueMicrotask(() => {
      this.projectInstanceStore.updateSprintOrder(this.items());
    });
  }

  selectedSprint(sprint: ISprintInstance) {
    this.isSelected.set(true);
    this.projectInstanceStore.selectedSprint.set(sprint);
    this.projectInstanceStore.getCurrentSprintTask(sprint.id);
  }
}
