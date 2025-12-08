import { Component, EventEmitter, Output } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-tool-bar-liste-type-view',
  templateUrl: './tool-bar-liste-type-view.component.html',
  styleUrl: './tool-bar-liste-type-view.component.scss',
  standalone: true,
  imports: [CdkDropList, CdkDrag],
})
export class ToolBarListeTypeViewComponent {
  defaultView: string = 'view-list';
  @Output() selectedComponent: EventEmitter<string> = new EventEmitter();

  viewTypes = [
    { view: 'view-kanban', label: 'Kanban', icon: '📊' },
    { view: 'view-list', label: 'Liste', icon: '📋' },
    { view: 'view-table', label: 'Table', icon: '📊' },
    { view: 'view-calendar', label: 'Calendrier', icon: '📅' },
    { view: 'view-gantt', label: 'Gantt', icon: '📈' },
  ];
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.viewTypes, event.previousIndex, event.currentIndex);
  }
  selectViewType(view: any) {
    this.selectedComponent.emit(view.view);
  }

  showViewTypeList() {
    this.selectedComponent.emit('view-list');
  }
}
