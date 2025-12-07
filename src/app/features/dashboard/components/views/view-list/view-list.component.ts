import { Component, inject, input } from '@angular/core';


import { CardTaskComponent } from "../../card-task/card-task.component";


import { ToolBarListeTypeViewComponent } from "../../tool-bar/tool-bar-liste-type-view/tool-bar-liste-type-view.component";
import { SideBarSprints } from "../../side-bar-sprints/side-bar-sprints";
import { ViewToolBarComponent } from "../../tool-bar/view-tool-bar/view-tool-bar.component";
import { TaskInstanceService } from '../../../services/task-instance.service';
import { SprintInstanceService } from '../../../services/sprint-instance.service';
import { ITaskInstance } from '../../../models/task-instance.model';
import { ISprintInstance } from '../../../models/sprint-instance.model';
import { ProjectInstantStore } from '@app/features/dashboard/stores/project-instant.store';
import { LoadingSpinner } from "../../loading-spinner/loading-spinner";


@Component({
  selector: 'app-view-list',
  imports: [SideBarSprints, ViewToolBarComponent, CardTaskComponent, LoadingSpinner],
  templateUrl: './view-list.component.html',
  styleUrl: './view-list.component.scss'
})
export class ViewListComponent {

    sprintId: number = 0;
    projectInstanceStore = inject(ProjectInstantStore);
    taskInstanceService = inject(TaskInstanceService);
    sprintInstanceService = inject(SprintInstanceService);
    tasks: ITaskInstance[]=[];

    viewToolBarTitle = 'Nombre de tâches: ';
    viewToolBarQuantity = 0;

    selectedSprint(id: number) {
      this.sprintId = id;
      console.log(this.sprintId);
     this.taskInstanceService.getAllTaskInstance().subscribe(data => this.tasks = data);
      this.viewToolBarQuantity = this.tasks.length;
    }
}
