import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FeatureStore } from '@app/features/dashboard/stores/feature.store';

import { IFeature } from '@app/features/dashboard/models/feature.model';
import { FormInputComponent } from '../../shared/form-input/form-input.component';

@Component({
  selector: 'app-feature-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormInputComponent],
  templateUrl: './feature-form.component.html',
  styleUrl: './feature-form.component.css',
})
export class FeatureFormComponent {
  private fb = inject(FormBuilder);
  private featureStore = inject(FeatureStore);

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    id: [0],
    label: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
  });

  ngOnInit() {
    const data = this.featureStore.currentFeature();

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
    const featureData: IFeature = {
      ...rawValue,
      id: rawValue.id || 0,
    };

    if (this.isNew()) {
      this.featureStore.createFeature(featureData);
    } else {
      this.featureStore.updateFeature(String(this.id()), featureData);
    }
  }
}

