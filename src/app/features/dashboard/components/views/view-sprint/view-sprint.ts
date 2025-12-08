import { Component, inject, input, Type } from '@angular/core';
import { ToolBarListeTypeViewComponent } from '../../tool-bar/tool-bar-liste-type-view/tool-bar-liste-type-view.component';

import { NgComponentOutlet } from '@angular/common';
import { ComponentFactoryService } from '../../../services/component-factory.service';
import { TaskInstanceService } from '../../../services/task-instance.service';
import { SprintInstanceService } from '../../../services/sprint-instance.service';
import { ITaskInstance } from '../../../models/task-instance.model';
import { ISprintInstance } from '../../../models/sprint-instance.model';
@Component({
  selector: 'app-view-sprint',
  imports: [ToolBarListeTypeViewComponent, NgComponentOutlet],
  templateUrl: './view-sprint.html',
  styleUrl: './view-sprint.css',
})
export class ViewSprint {
  defaultView: string = 'view-list';
  componentFactory = inject(ComponentFactoryService);
  componentNames: string[] = [];
  selectedComponent: Type<any> | null = null;

  ngOnInit() {
    this.componentNames = this.componentFactory.getAllComponentNames();
    this.onComponentChange(this.defaultView);
  }

  onComponentChange(event: string) {
    const componentName = event.toLowerCase();
    this.selectedComponent = this.componentFactory.getComponent(componentName);
  }
}
