import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SprintTemplateStore } from '@app/features/dashboard/stores/index';
import { FormInputComponent, FormTextareaComponent } from '../../shared/index';
import { ISprintTemplate } from '@app/features/dashboard/models/index';

@Component({
  selector: 'app-sprint-template-form',
  imports: [ReactiveFormsModule, FormInputComponent, FormTextareaComponent],
  templateUrl: './sprint-template-form.component.html',
  styleUrl: './sprint-template-form.component.css',
})
export class SprintTemplateFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private sprintTemplateStore = inject(SprintTemplateStore);

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    sprintTemplateId: [0],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(65535)]],
    duration: [0, [Validators.required]],
    });

    ngOnInit() {
    const data = this.sprintTemplateStore.currentSprintTemplate();

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
    const templateData: ISprintTemplate = {
      ...rawValue,
      createdAt: '', // Will be set by backend
    };

    if (this.isNew()) {
      this.sprintTemplateStore.createSprintTemplate(templateData);
    } else {
      this.sprintTemplateStore.updateSprintTemplate(String(templateData.sprintTemplateId), templateData);
    }
  }
}
