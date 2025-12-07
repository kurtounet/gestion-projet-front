import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ISprintInstance } from '@app/features/dashboard/models/sprint-instance.model';
import { ModalService } from '@app/features/dashboard/services/modal.service';
import { ProjectInstantStore } from '@app/features/dashboard/stores/project-instant.store';


@Component({
  selector: 'app-side-bar-card-sprint',
  imports: [DatePipe, NgOptimizedImage],
  templateUrl: './side-bar-card-sprint.html',
  styleUrl: './side-bar-card-sprint.css',
})
export class SideBarcardSprint {
  projectInstanceStore = inject(ProjectInstantStore);
  modalService = inject(ModalService);
  sprint = input<ISprintInstance>();
  isVisible: boolean = false;
  isSelected: boolean = false;

editSprint(id: number | undefined) {
  this.modalService.open('Edit sprint', 'edit', 'sprint', id);

}

toggleSprint() {
  this.isVisible = !this.isVisible;
  console.log("toggleSprint");
}
selectedSprint() {
  this.isSelected = !this.isSelected;
  console.log("toggleSprint");
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
