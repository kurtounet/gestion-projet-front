import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectTemplateStore } from '@app/features/dashboard/stores/project-template.store';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { FormTextareaComponent } from '../../shared/form-textarea/form-textarea.component';
import { IProjectTemplate } from '@app/features/dashboard/models/project-template.model';

@Component({
  selector: 'app-project-template-form',
  imports: [ReactiveFormsModule, FormInputComponent, FormTextareaComponent],
  templateUrl: './project-template-form.component.html',
  styleUrl: './project-template-form.component.css',
})
export class ProjectTemplateFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private projectTemplateStore = inject(ProjectTemplateStore);

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    id: [0],
    name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
    duration: [new Date()],
    createdAt: [new Date()],
    updatedAt: [new Date()],
  });

  ngOnInit() {
    const data = this.projectTemplateStore.currentProjectTemplate();

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
    const templateData: IProjectTemplate = {
      ...rawValue,
      id: rawValue.id || 0,
    };

    if (this.isNew()) {
      this.projectTemplateStore.createProjectTemplate(templateData);
    } else {
      this.projectTemplateStore.updateProjectTemplate(String(this.id()), templateData);
    }
  }
}
