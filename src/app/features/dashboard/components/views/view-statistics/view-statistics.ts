import { Component, inject } from '@angular/core';
import { PanelStatistic } from '../../statistic/panel-statistic/panel-statistic';
import { ProjectInstanceStore } from '@app/features/dashboard/stores/project-instance.store';

@Component({
  selector: 'app-view-statistics',
  imports: [PanelStatistic],
  templateUrl: './view-statistics.html',
  styleUrl: './view-statistics.css',
})
export class ViewStatistics {
  ProjectInstanceStore = inject(ProjectInstanceStore);
  statistics = this.ProjectInstanceStore.getStatisticsCurrentProject();
}
