import { Component, inject, input } from '@angular/core';

import { CardStat } from '../card-stat/card-stat';

import { NgOptimizedImage } from '@angular/common';
import { StatisticService } from '../../../services/statistic.service';
import { ICardStat } from '../../../models/components/static.model';

@Component({
  selector: 'app-panel-statistic',
  imports: [CardStat, NgOptimizedImage],
  templateUrl: './panel-statistic.html',
  styleUrl: './panel-statistic.css',
})
export class PanelStatistic {
  cardStats = input<ICardStat[]>([]);
  progressStats = inject(StatisticService).getProgressStatAll();
  isVisible = false;
  toggleVisible() {
    this.isVisible = !this.isVisible;
  }
}
