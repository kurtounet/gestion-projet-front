import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { ISprintInstance } from '@app/features/dashboard/models/sprint-instance.model';
import { ModalService } from '@app/features/dashboard/services/modal.service';
import { PriorityStore } from '@app/features/dashboard/stores/priority-store';
import { ProjectInstantStore } from '@app/features/dashboard/stores/project-instant.store';
import { StatusStore } from '@app/features/dashboard/stores/status-store';

@Component({
  selector: 'app-side-bar-card-sprint',
  imports: [DatePipe, NgOptimizedImage],
  templateUrl: './side-bar-card-sprint.html',
  styleUrl: './side-bar-card-sprint.css',
})
export class SideBarcardSprint {
  projectInstanceStore = inject(ProjectInstantStore);
  statuses = inject(StatusStore).statuses;
  priorities = inject(PriorityStore).priorities;
  modalService = inject(ModalService);
  sprint = input<ISprintInstance>();
  isVisible: boolean = false;
  isSelected: boolean = false;


  statusName = computed(() => {
  const status = this.statuses().find((status) => status['@id'] === this.sprint()?.status);
  return status ? status.label : '';
 });
  priorityName = computed(() => {
  const priority = this.priorities().find((priority) => priority['@id'] === this.sprint()?.priority);
  return priority ? priority.label : '';
 });
  color = computed(() => {
   return this.sprint()?.color;

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
/*
[
    "form-project",
    "form-sprint",
    "form-framework",
    "form-database",
    "form-task",
    "form-file"
]
*/
