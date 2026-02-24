import { DatePipe, NgOptimizedImage } from '@angular/common';
import {
  afterRenderEffect,
  Component,
  computed,
  effect,
  EventEmitter,
  inject,
  input,
  linkedSignal,
  output,
  Output,
  signal,
} from '@angular/core';

import { SideBarcardSprint } from './side-bar-card-sprint/side-bar-card-sprint';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { ISprintInstance } from '../../models/sprint-instance.model';
import { ProjectInstanceStore } from '../../stores/project-instance.store';
import { OrderService } from '../../services/order.service';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';

@Component({
  selector: 'app-side-bar-sprints',
  imports: [SideBarcardSprint, CdkDropList, CdkDrag, LoadingSpinner],
  templateUrl: './side-bar-sprints.html',
  styleUrl: './side-bar-sprints.css',
})
export class SideBarSprints {
  orderSprint = signal<'asc' | 'desc'>('asc');
  readonly projectInstanceStore = inject(ProjectInstanceStore);
  readonly orderService = inject(OrderService);

  items = computed(
    () => this.projectInstanceStore.currentProjectSprints(),
    // this.orderService.orderByPosition(
    //   this.projectInstanceStore.currentProjectSprints(),
    //    this.orderSprint() )
  );

  selectedSprintId = signal<number | null>(null);
  isSelected = signal<boolean>(false);

  drop(event: CdkDragDrop<ISprintInstance[]>) {
    moveItemInArray(this.items(), event.previousIndex, event.currentIndex);
    this.projectInstanceStore.currentProjectSprints.set([...this.items()]);

    queueMicrotask(() => {
      this.projectInstanceStore.updateSprintOrder(this.items());
    });
  }

  selectedSprint(sprint: ISprintInstance) {
    this.isSelected.set(true);
    this.projectInstanceStore.selectedSprint.set(sprint);
    this.projectInstanceStore.getCurrentSprintTask(sprint.id!);
  }
  toggleSort() {
    const newOrder = this.orderSprint() === 'asc' ? 'desc' : 'asc';
    console.log(newOrder);
    this.orderSprint.set(newOrder);
    const newSortedItems = this.orderService.orderByPosition(
      this.projectInstanceStore.currentProjectSprints(),
      this.orderSprint(),
    );
    this.projectInstanceStore.currentProjectSprints.set(newSortedItems);

    console.log(this.items());
  }
}
