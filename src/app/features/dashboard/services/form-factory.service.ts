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
import { FormProject } from '../components/forms/form-project/form-project';
import { FormSprint } from '../components/forms/form-sprint/form-sprint';
import { FormFramework } from '../components/forms/form-framework/form-framework';
import { FormDatabase } from '../components/forms/form-database/form-database';
import { FormTask } from '../components/forms/form-task/form-task';
import { FormFile } from '../components/forms/form-file/form-file';
import { ProjectInstanceFormComponent } from '../components/forms/project-instance/project-instance-form.component';
import { SprintInstanceFormComponent } from '../components/forms/sprint-instance/sprint-instance-form.component';
import { TaskInstanceFormComponent } from '../components/forms/task-instance/task-instance-form.component';

@Injectable({
  providedIn: 'root',
})
export class FormFactoryService {
  private readonly formMap = new Map<string, Type<any>>();

  constructor() {
    this.setformMap();
  }

  setformMap() {
    //Les composants Form pour la modal

    this.formMap.set('project', ProjectInstanceFormComponent);
    this.formMap.set('sprint', SprintInstanceFormComponent);
    this.formMap.set('framework', FormFramework);
    this.formMap.set('database', FormDatabase);
    this.formMap.set('task', TaskInstanceFormComponent);
    this.formMap.set('file', FormFile);
  }
  getForm(formName: string): Type<any> | null {
    return this.formMap.get(formName) || null;
  }

  getAllformNames(): string[] {
    return Array.from(this.formMap.keys());
  }
}
