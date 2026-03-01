import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TechnologyStore } from '@app/features/dashboard/stores/index';
import { FormInputComponent } from '../../shared/index';
import { ITechnology } from '@app/features/dashboard/models/index';

@Component({
  selector: 'app-technologie-form',
  imports: [ReactiveFormsModule, FormInputComponent],
  templateUrl: './technologie-form.component.html',
  styleUrl: './technologie-form.component.css',
})
export class TechnologieFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private technologieStore = inject(TechnologyStore);

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    id: [0],
    label: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    framework: [[] as (string | null)[]],
  });

  ngOnInit() {
    // Initialisation si nécessaire (ex: fetch current de la store)
    // const data = this.technologieStore.currentTechnology(); // Dépend de ce qui est dispo dans le store
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
    const techData: ITechnology = {
      ...rawValue,
      id: rawValue.id || 0,
      createdAt: '', // Will be set by backend
    };

    if (this.isNew()) {
      this.technologieStore.createTechnology(techData);
    } else {
      this.technologieStore.updateTechnology(String(techData.id), techData);
    }
  }
}
