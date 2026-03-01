import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeatureStore } from '@app/features/dashboard/stores/index';
import { IFeature } from '@app/features/dashboard/models/index';
import { FormInputComponent } from '../../shared/index';
import { ModalService } from '@app/features/dashboard/services/modal.service';

@Component({
  selector: 'app-feature-form',
  imports: [ReactiveFormsModule, FormInputComponent],
  templateUrl: './feature-form.component.html',
  styleUrl: './feature-form.component.css',
})
export class FeatureFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private modalService = inject(ModalService);
  private featureStore = inject(FeatureStore);

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    id: [0],
    label: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
  });

  ngOnInit() {
    const action = this.modalService.action();
    if (action === 'create') {
      this.isNew.set(true);
    }
    const data = this.featureStore.currentFeature();

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
    const featureData: IFeature = {
      ...rawValue,
      id: rawValue.id || 0,
      createdAt: '', // Will be set by backend
    };

    if (this.isNew()) {
      this.featureStore.createFeature(featureData);
    } else {
      this.featureStore.updateFeature(String(featureData.id), featureData);
    }
  }
}
