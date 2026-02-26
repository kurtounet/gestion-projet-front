import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FrameworkStore } from '@app/features/dashboard/stores/framework.store';
import { TechnologyStore } from '@app/features/dashboard/stores/technology.store';
import { IFramework } from '@app/features/dashboard/models/framework.model';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { FormSelectComponent } from '../../shared/form-select/form-select.component';
import { FormTextareaComponent } from '../../shared/form-textarea/form-textarea.component';

@Component({
  selector: 'app-framework-form',
  imports: [ReactiveFormsModule, FormInputComponent, FormSelectComponent, FormTextareaComponent],
  templateUrl: './framework-form.component.html',
  styleUrl: './framework-form.component.css',
})
export class FrameworkFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private frameworkStore = inject(FrameworkStore);
  private technologyStore = inject(TechnologyStore);

  // Options
  protected technologyOptions = this.technologyStore.technologys;

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    id: [0],
    label: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
    version: ['', [Validators.required]],
    description: ['', [Validators.minLength(6), Validators.maxLength(255)]],
    icon: [''],
    color: [''],
    configuration: [''],
    technology: [''],
  });

  ngOnInit() {
    const data = this.frameworkStore.currentFramework();

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
    const frameworkData: IFramework = {
      ...rawValue,
      id: rawValue.id || 0,
      '@id': '',
      '@type': '',
    };

    if (this.isNew()) {
      this.frameworkStore.createFramework(frameworkData);
    } else {
      this.frameworkStore.updateFramework(String(this.id()), frameworkData);
    }
  }
}
