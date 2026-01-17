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
import { ProjectInstanceFormComponent } from '../components/forms/project-instance/project-instance-form.component';
import { SprintInstanceFormComponent } from '../components/forms/sprint-instance/sprint-instance-form.component';
import { TaskInstanceFormComponent } from '../components/forms/task-instance/task-instance-form.component';
import { FileFormComponent } from '../components/forms/file/file-form.component';

@Injectable({
  providedIn: 'root',
})
export class FormFactoryService {
  private readonly formMap = new Map<string, Type<any>>();

  constructor() {
    this.setformMap();
  }

  setformMap() {
    // Enregistrer les composants views
    // ToolBar Project
    this.formMap.set('project', ProjectInstanceFormComponent);
    this.formMap.set('sprint', SprintInstanceFormComponent);
    this.formMap.set('task', TaskInstanceFormComponent);
    this.formMap.set('file', FileFormComponent);
    // this.formMap.set('framework', FrameworkFormComponent);
    // this.formMap.set('database', Database);
  }
  getForm(formName: string): Type<any> | null {
    return this.formMap.get(formName) || null;
  }

  getAllformNames(): string[] {
    return Array.from(this.formMap.keys());
  }
}
