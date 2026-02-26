import { inject, Pipe, PipeTransform } from '@angular/core';
import { PriorityStore } from '@app/features/dashboard/stores/priority.store';

@Pipe({
  name: 'getPriority',
  standalone: true,
})
export class GetPriorityPipe implements PipeTransform {
  private readonly priorityStore = inject(PriorityStore);

  transform(value: string | null | undefined) {
    if (!value) return null;

    const segments = value.split('/');
    const id = Number(segments[segments.length - 1]);
    if (isNaN(id)) return null;

    return this.priorityStore.priorities().find((p) => p.id === id)?.label ?? null;
  }
}
