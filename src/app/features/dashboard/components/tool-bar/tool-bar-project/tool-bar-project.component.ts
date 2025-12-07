import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tool-bar-project',
  imports: [CdkDropList, CdkDrag],
  templateUrl: './tool-bar-project.component.html',
  styleUrl: './tool-bar-project.component.scss'
})
export class ToolBarProjectComponent {
  defaultView:string = 'view-list';

  @Output() selectedComponent: EventEmitter<string> = new EventEmitter();

  viewTypes = [
    { view: 'view-sprint' ,label: 'Sprint/Tâches', icon: '📋' },
    { view: 'view-project', label: 'Géneral', icon: '📊' },
    { view: 'view-frameworks', label:'Frameworks', icon: '📊' },
    { view: 'view-database', label:'database', icon: '📊' },
    { view: 'view-file', label: 'Fichiers', icon: '📊' },
    { view: 'view-statistics', label: 'Statistique', icon: '📊' },
  ];
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.viewTypes, event.previousIndex, event.currentIndex);
  }
  selectViewType(view: any) {
    this.selectedComponent.emit(view.view);
  }

  // showViewTypeList() {
  //   this.selectedComponent.emit('view-list');
  // }
}
