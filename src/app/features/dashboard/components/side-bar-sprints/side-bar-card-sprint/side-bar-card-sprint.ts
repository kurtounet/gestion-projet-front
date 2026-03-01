import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { ISprintInstance } from '@app/features/dashboard/models/sprint-instance.model';
import { ColorService } from '@app/features/dashboard/services/color.service';
import { ModalService } from '@app/features/dashboard/services/modal.service';
import { PriorityStore } from '@app/features/dashboard/stores/priority.store';
import { ProjectInstanceStore } from '@app/features/dashboard/stores/project-instance.store';

import { StatusStore } from '@app/features/dashboard/stores/status.store';

@Component({
  selector: 'app-side-bar-card-sprint',
  imports: [DatePipe, NgOptimizedImage],
  templateUrl: './side-bar-card-sprint.html',
  styleUrl: './side-bar-card-sprint.css',
})
export class SideBarcardSprint {
  projectInstanceStore = inject(ProjectInstanceStore);
  statuses = inject(StatusStore).statuses;
  priorities = inject(PriorityStore).priorities;
  modalService = inject(ModalService);
  colorService = inject(ColorService);

  sprint = input<ISprintInstance>();
  isVisible: boolean = false;
  isSelected: boolean = false;

  status = computed(() => {
    const status = this.statuses().find((status) => status['@id'] === this.sprint()?.status);
    return status;
  });

  priority = computed(() => {
    const priority = this.priorities().find(
      (priority) => priority['@id'] === this.sprint()?.priority,
    );
    return priority;
  });

  color = computed(() => {
    const s = this.sprint();
    if (!s || !s.color) {
      return 'transparent';
    }
    return this.colorService.hexToRgba(s.color, 0.2);
  });

  editSprint(id: number | undefined) {
    this.modalService.open('Edit sprint', 'edit', 'sprint', id);
  }

  toggleSprint() {
    this.isVisible = !this.isVisible;
  }

  selectedSprint() {
    this.isSelected = !this.isSelected;
  }
}
