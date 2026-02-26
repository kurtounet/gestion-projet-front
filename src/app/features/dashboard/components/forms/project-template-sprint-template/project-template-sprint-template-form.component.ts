import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectTemplateSprintTemplateStore } from '@app/features/dashboard/stores/project-template-sprint-template.store';
import { ProjectTemplateStore } from '@app/features/dashboard/stores/project-template.store';
import { SprintTemplateStore } from '@app/features/dashboard/stores/sprint-template.store';
import { FormSelectComponent } from '../../shared/form-select/form-select.component';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { IProjectTemplateSprintTemplate } from '@app/features/dashboard/models/project-template-sprint-template.model';

@Component({
  selector: 'app-project-template-sprint-template-form',
  imports: [ReactiveFormsModule, FormSelectComponent, FormInputComponent],
  templateUrl: './project-template-sprint-template-form.component.html',
  styleUrl: './project-template-sprint-template-form.component.css',
})
export class ProjectTemplateSprintTemplateFormComponent implements OnInit {
  private fb = inject(FormBuilder);
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
    createdAt: [new Date(), [Validators.required]],
    updatedAt: [new Date(), [Validators.required]],
  });

  ngOnInit() {
    const data = this.projectTemplateSprintTemplateStore.currentProjectTemplateSprintTemplate();

    if (data && !this.isNew()) {
      this.form.patchValue(data);
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
