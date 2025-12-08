import { Component, inject } from '@angular/core';
import { PanelStatistic } from '../../statistic/panel-statistic/panel-statistic';
import { ProjectInstantStore } from '@app/features/dashboard/stores/project-instant.store';

@Component({
  selector: 'app-view-statistics',
  imports: [PanelStatistic],
  templateUrl: './view-statistics.html',
  styleUrl: './view-statistics.css',
})
export class ViewStatistics {
  projectInstantStore = inject(ProjectInstantStore);
  statistics = this.projectInstantStore.getStatisticsCurrentProject();
}
