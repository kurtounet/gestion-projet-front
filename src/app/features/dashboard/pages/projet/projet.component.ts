import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, Type } from '@angular/core';
import { ToolBarProjectComponent } from '../../components/tool-bar/tool-bar-project/tool-bar-project.component';
import { PanelStatistic } from '../../components/statistic/panel-statistic/panel-statistic';
import { SprintInstanceService } from '../../services/sprint-instance.service';
import { ComponentFactoryService } from '../../services/component-factory.service';
import { ICardStat } from '../../models/components/static.model';
import { ProjectInstanceService } from '../../services/project-instance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { th } from 'zod/locales';
import { StatisticService } from '../../services/statistic.service';
import { IProjectInstance } from '../../models/project-instance.model';
import { ISprintInstance } from '../../models/sprint-instance.model';
import { ProjectInstanceStore } from '../../stores/project-instant.store';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-projet',
  imports: [CommonModule, ToolBarProjectComponent],
  templateUrl: './projet.component.html',
  styleUrl: './projet.component.scss',
})
export class ProjetComponent {
  readonly route = inject(ActivatedRoute);
  readonly storeProjectInstance = inject(ProjectInstanceStore);
  readonly componentFactory = inject(ComponentFactoryService);

  // 🔁 projectId devient un signal
  readonly projectIdSignal = toSignal(
    this.route.params.pipe(map((params) => Number(params['id']))),
    { initialValue: 0 },
  );

  currentId: number | null = null;
  defaultView: string = 'view-sprint';

  componentNames: string[] = [];
  selectedComponent: Type<any> | null = null;

  readonly loadEffect = effect(() => {
    if (this.projectIdSignal() === this.currentId) {
      return;
    }
    this.currentId = this.projectIdSignal();

    this.storeProjectInstance.getProjectInstanceById(this.currentId);

    this.componentNames = this.componentFactory.getAllComponentNames();
    this.onComponentChange(this.defaultView);
  });

  onComponentChange(event: string) {
    const componentName = event.toLowerCase();
    this.selectedComponent = this.componentFactory.getComponent(componentName);
  }
}
