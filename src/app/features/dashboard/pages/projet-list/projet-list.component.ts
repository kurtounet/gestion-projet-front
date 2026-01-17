import { Component, computed, inject, signal } from '@angular/core';
import { CardProject } from '../../components/card-project/card-project';

import { IProjectInstance } from '../../models/project-instance.model';
import { ProjectInstanceStore } from '../../stores/project-instant.store';
import { CdkDragDrop, moveItemInArray, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-projet-list',
  imports: [CardProject, CdkDrag, CdkDropList],
  templateUrl: './projet-list.component.html',
  styleUrl: './projet-list.component.scss',
})
export class ProjetListComponent {
  readonly projectInstanceStore = inject(ProjectInstanceStore);

  items = computed(() =>
    this.projectInstanceStore.projects().sort((a, b) => a.position - b.position),
  );

  drop(event: CdkDragDrop<IProjectInstance[]>) {
    moveItemInArray(this.items(), event.previousIndex, event.currentIndex);

    queueMicrotask(() => {
      this.projectInstanceStore.updateProjectOrder(this.items());
    });
  }
}
