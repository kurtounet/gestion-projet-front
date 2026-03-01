import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CodeBaseStore } from '@app/features/dashboard/stores/index';
import { FormInputComponent, FormFilePickerComponent } from '../../shared/index';

import { ICodeBase } from '@app/features/dashboard/models/index';

@Component({
  selector: 'app-code-base-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormInputComponent, FormFilePickerComponent],
  templateUrl: './code-base-form.component.html',
  styleUrl: './code-base-form.component.css',
})
export class CodeBaseFormComponent {
  private fb = inject(FormBuilder);
  private codeBaseStore = inject(CodeBaseStore);

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    id: [0],
    label: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    code: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    pathFile: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    feature: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    });

    ngOnInit() {
    const data = this.codeBaseStore.currentCodeBase();

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
    const codeBaseData: ICodeBase = {
      ...rawValue,
      id: rawValue.id || 0,
      createdAt: '', // Will be set by backend
    };

    if (this.isNew()) {
      this.codeBaseStore.createCodeBase(codeBaseData);
    } else {
      this.codeBaseStore.updateCodeBase(String(codeBaseData.id), codeBaseData);
    }
  }
}
