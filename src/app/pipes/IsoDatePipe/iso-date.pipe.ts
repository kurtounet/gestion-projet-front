import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isoDate',
  standalone: true,
})
export class IsoDatePipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return '';
    const date = new Date(value);
    // Vérifie si la date est valide avant de tenter le formatage
    if (isNaN(date.getTime())) return '';

    return date.toISOString().substring(0, 10);
  }
}
