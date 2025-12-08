import { Injectable, Type } from '@angular/core';
import { ViewKanbanComponent } from '../components/views/view-kanban/view-kanban.component';
import { ViewListComponent } from '../components/views/view-list/view-list.component';
import { ViewGanttComponent } from '../components/views/view-gantt/view-gantt.component';
import { ViewCalendarComponent } from '../components/views/view-calendar/view-calendar.component';
import { ViewTableComponent } from '../components/views/view-table/view-table.component';
import { ViewProject } from '../components/views/view-project/view-project';
import { ViewSprint } from '../components/views/view-sprint/view-sprint';
import { ViewFile } from '../components/views/view-file/view-file';
import { ViewFrameworks } from '../components/views/view-frameworks/view-frameworks';
import { ViewDatabase } from '../components/views/view-database/view-database';
import { ViewStatistics } from '../components/views/view-statistics/view-statistics';

@Injectable({
  providedIn: 'root',
})
export class ComponentFactoryService {
  private readonly componentMap = new Map<string, Type<any>>();

  constructor() {
    this.setcomponentMap();
  }

  setcomponentMap() {
    // Enregistrer les composants views
    // ToolBar Project
    this.componentMap.set('view-statistics', ViewStatistics);
    this.componentMap.set('view-project', ViewProject);
    this.componentMap.set('view-sprint', ViewSprint);
    this.componentMap.set('view-frameworks', ViewFrameworks);
    this.componentMap.set('view-database', ViewDatabase);
    this.componentMap.set('view-file', ViewFile);

    // ToolBar Sprint
    this.componentMap.set('view-list', ViewListComponent);
    this.componentMap.set('view-kanban', ViewKanbanComponent);
    this.componentMap.set('view-gantt', ViewGanttComponent);
    this.componentMap.set('view-table', ViewTableComponent);
    this.componentMap.set('view-calendar', ViewCalendarComponent);
  }
  getComponent(componentName: string): Type<any> | null {
    return this.componentMap.get(componentName) || null;
  }

  getAllComponentNames(): string[] {
    return Array.from(this.componentMap.keys());
  }
}
