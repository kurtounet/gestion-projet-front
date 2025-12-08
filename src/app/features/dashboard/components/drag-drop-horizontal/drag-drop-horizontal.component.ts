import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { ComponentFactoryService } from '../../services/component-factory.service';

@Component({
  selector: 'app-drag-drop-horizontal',
  imports: [CdkDropList, CdkDrag],
  templateUrl: './drag-drop-horizontal.component.html',
  styleUrl: './drag-drop-horizontal.component.scss',
})
export class DragDropHorizontalComponent {
  componentFactoryService = inject(ComponentFactoryService).getAllComponentNames();

  timePeriods = [
    'Bronze age1',
    'Iron age',
    'Middle ages',
    'Early modern period',
    'Long nineteenth century',
  ];
  drop(event: CdkDragDrop<any>) {
    moveItemInArray(this.componentFactoryService, event.previousIndex, event.currentIndex);
    // }
    // selectViewType(view: any) {
    //   this.selectedComponent.emit(view.view);
    // }

    // showViewTypeList() {
    //   this.selectedComponent.emit('view-list');
    // }
  }
}
