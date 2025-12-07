import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, effect, EventEmitter, inject, input, output, Output, signal } from '@angular/core';

import { SideBarcardSprint } from "./side-bar-card-sprint/side-bar-card-sprint";
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { ISprintInstance } from '../../models/sprint-instance.model';
import { ProjectInstantStore } from '../../stores/project-instant.store';

@Component({
  selector: 'app-side-bar-sprints',
  imports: [SideBarcardSprint,  CdkDropList,  CdkDrag],
  templateUrl: './side-bar-sprints.html',
  styleUrl: './side-bar-sprints.css',
})
export class SideBarSprints {
   readonly projectInstanceStore = inject(ProjectInstantStore);
  readonly sprints = this.projectInstanceStore.currentSprints;
  selectedSprintId = signal<number | null>(null);
  isSelected = signal<boolean>(false);

// effect de synchro
  readonly syncsprintEffect = effect(() => {
    const current = this.projectInstanceStore .currentSprints();
    this.sprints.set(current);
  });

  items : any[] = [this.sprints];
  selectedItemSprint = output<number>();


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items,  event.previousIndex, event.currentIndex);
  }

  selectedSprint(id:number){
  this.isSelected.set(true);
  this. projectInstanceStore.getCurrentSprintTask(id);
 }


}
