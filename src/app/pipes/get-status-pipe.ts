import { inject, Pipe, PipeTransform } from '@angular/core';
import { StatusStore } from '@app/features/dashboard/stores/status.store';

@Pipe({
  name: 'getStatus',
  standalone: true,
})
export class GetStatusPipe implements PipeTransform {

  private readonly statusStore = inject(StatusStore);

  transform(value: string | null | undefined) {
    if (!value) return null;
    
    const segments = value.split('/');
    const id = Number(segments[segments.length - 1]);
    if (isNaN(id)) return null;   
   
    return this.statusStore.statuses().find((p) => p.id === id)?.label ?? null;
  }
}