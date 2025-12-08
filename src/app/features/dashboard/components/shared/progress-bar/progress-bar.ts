import { Component, input } from '@angular/core';

import { CommonModule, DatePipe } from '@angular/common';
import { IProgressCardStat } from '@app/features/dashboard/models/components/static.model';

@Component({
  selector: 'app-progress-bar',
  imports: [CommonModule],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.css',
})
export class ProgressBar {
  progress = input<IProgressCardStat>();

  getColorClass(color: string): string {
    const classes: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
    };
    return classes[color] || '';
  }

  getProgressColor(color: string): string {
    const classes: Record<string, string> = {
      blue: 'bg-blue-600',
      green: 'bg-green-600',
      purple: 'bg-purple-600',
      orange: 'bg-orange-600',
    };
    return classes[color] || '';
  }

  getIconPath(icon: string): string {
    const icons: Record<string, string> = {
      dollar: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
      users:
        'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
      cart: 'M9 2L7 6m0 0l-2 12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2L17 6M7 6h10M9 10v4m6-4v4',
      trending: 'M23 6l-9.5 9.5-5-5L1 18M23 6h-7M23 6v7',
      target:
        'M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10zM12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
      award: 'M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12',
      zap: 'M13 2L3 14h8l-1 8 10-12h-8l1-8z',
    };
    return icons[icon] || '';
  }
}
