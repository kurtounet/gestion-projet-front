import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  filterByStartDate(items: any[], order: 'asc' | 'desc' = 'asc') {
    if (order === 'desc') {
      items = items.slice().sort((a, b) => {
        return b.startDate.getTime() - a.startDate.getTime();
      });
    }
    if (order === 'asc') {
      items = items.slice().sort((a, b) => {
        return a.startDate.getTime() - b.startDate.getTime();
      });
    }
    return items;
  }
  filterByEndDate(items: any[], order: 'asc' | 'desc' = 'asc') {
    if (order === 'desc') {
      items = items.slice().sort((a, b) => {
        return b.endDate.getTime() - a.endtDate.getTime();
      });
    }
    if (order === 'asc') {
      items = items.slice().sort((a, b) => {
        return a.endDate.getTime() - b.endDate.getTime();
      });
    }
    return items;
  }
  filterByStatus(items: any[], order: 'asc' | 'desc' = 'asc') {
    if (order === 'desc') {
      items = items.slice().sort((a, b) => {
        return b.status.getTime() - a.status.getTime();
      });
    }
    if (order === 'asc') {
      items = items.slice().sort((a, b) => {
        return a.status.getTime() - b.status.getTime();
      });
    }
    return items;
  }
  filterByPriority(items: any[], order: 'asc' | 'desc' = 'asc') {
    if (order === 'desc') {
      items = items.slice().sort((a, b) => {
        return b.priorities.getTime() - a.priorities.getTime();
      });
    }
    if (order === 'asc') {
      items = items.slice().sort((a, b) => {
        return a.priorities.getTime() - b.priorities.getTime();
      });
    }
    return items;
  }
}
