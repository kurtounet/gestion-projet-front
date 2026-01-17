import { inject, Injectable, signal } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class OrderService {


orderByDate( items: any[], order: 'asc' | 'desc' = 'asc') {
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
orderByPosition( items: any[], order: string) {
  if (order === 'desc') {
    items = items.slice().sort((a, b) => {
      return  b.position - a.position;
    });
  }
  if (order === 'asc') {
    items = items.slice().sort((a, b) => {
      return  a.position - b.position;
    });
  }
  return items;
}
}
