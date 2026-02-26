import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  dateToIsoString(date: Date): string {
    return date.toISOString();
  }
  dateForForm(value: any): string {
    if (!value) return '';
    const date = new Date(value);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().substring(0, 10);
  }
}
