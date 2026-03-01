import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ProjectTemplateSprintTemplateStore,
  ProjectTemplateStore,
  SprintTemplateStore,
} from '@app/features/dashboard/stores/index';
import { FormSelectComponent, FormInputComponent } from '../../shared/index';
import { IProjectTemplateSprintTemplate } from '@app/features/dashboard/models/index';
import { ModalService } from '@app/features/dashboard/services/modal.service';

@Component({
  selector: 'app-project-template-sprint-template-form',
  imports: [ReactiveFormsModule, FormSelectComponent, FormInputComponent],
  templateUrl: './project-template-sprint-template-form.component.html',
  styleUrl: './project-template-sprint-template-form.component.css',
})
export class ProjectTemplateSprintTemplateFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private modalService = inject(ModalService);
  private projectTemplateSprintTemplateStore = inject(ProjectTemplateSprintTemplateStore);
  private projectTemplateStore = inject(ProjectTemplateStore);
  private sprintTemplateStore = inject(SprintTemplateStore);

  // Options
  protected projectTemplateOptions = this.projectTemplateStore.projectTemplates;
  protected sprintTemplateOptions = this.sprintTemplateStore.sprintTemplates;

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    projectTemplateId: [0, [Validators.required]],
    sprintTemplateId: [0, [Validators.required]],
    sprintOrder: [0, [Validators.required]],
  });

  ngOnInit() {
    const action = this.modalService.action();
    if (action === 'create') {
      this.isNew.set(true);
    }
    const data = this.projectTemplateSprintTemplateStore.currentProjectTemplateSprintTemplate();

    if (data && !this.isNew()) {
      this.form.patchValue(data as any);
    }
  }

  get getForm() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      return;
    }

    const rawValue = this.form.getRawValue();
    const mappingData: IProjectTemplateSprintTemplate = {
      ...rawValue,
      createdAt: '', // Will be set by backend
    };

    if (this.isNew()) {
      this.projectTemplateSprintTemplateStore.createProjectTemplateSprintTemplate(mappingData);
    } else {
      this.projectTemplateSprintTemplateStore.updateProjectTemplateSprintTemplate(
        String(this.id()),
        mappingData,
      );
    }
  }
}
