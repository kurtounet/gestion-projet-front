import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectOption, FormSelectComponent } from '../../shared/form-select/form-select.component';
import { frameworkStore } from '@app/features/dashboard/stores/framework.store';
import { IFramework } from '@app/features/dashboard/models/framework.model';
import { FormInputComponent } from '../../shared/form-input/form-input.component';

@Component({
  selector: 'app-framework-form',
  imports: [ReactiveFormsModule, FormInputComponent],
  templateUrl: './framework-form.component.html',
  styleUrl: './framework-form.component.css',
})
export class FrameworkFormComponent {
  new = signal<boolean>(false);
  submitted = false;
  private fb = inject(FormBuilder);
  private frameworkStore = inject(frameworkStore);

  typeOptions: SelectOption[] = [];
  priorityOptions: SelectOption[] = [];
  projectTemplateOptions: SelectOption[] = [];

  form!: FormGroup;

  ngOnInit() {
    /*
    this.statusOptions = [...this.statusStore.statuses()];
    this.priorityOptions = [...this.priorityStore.priorities()];
    this.projectTemplateOptions = [...this.frameworkStore.currentFramework()];
*/
    if (this.new() === true) {
      this.initCreateForm();
    } else {
      this.initUpdateForm();
    }
  }

  private initCreateForm(): void {
    this.form = this.fb.nonNullable.group({
      id: ['', Validators.required],
      label: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
      version: ['', Validators.required],
      description: ['', [Validators.minLength(6), Validators.maxLength(255)]],
      icon: [''],
      color: [''],
      configuration: [''],
      technology: [''],
    });
  }
  private initUpdateForm(): void {
    const data: IFramework = this.frameworkStore.currentFramework();
    // const data: IProjectInstance = {};

    if (!data) {
      this.initCreateForm();
      return;
    }

    this.form = this.fb.nonNullable.group({
      id: [data.id, Validators.required],
      label: [
        data.label,
        [Validators.required, Validators.minLength(6), Validators.maxLength(255)],
      ],
      version: ['', Validators.required],
      description: [data.description, [Validators.minLength(6), Validators.maxLength(255)]],
      icon: [''],
      color: [''],
      configuration: [''],
      technology: [''],
    });
  }

  get getForm() {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const formValue = this.form.value;

    if (this.new() === true) {
      //this.projectInstanceStore.createProjectInstance(formValue);
      console.log('Création:', formValue);
    } else {
      //this.projectInstanceStore.updateProjectInstance(String(this.id()), formValue);
      console.log('Modification:', formValue);
    }
  }
}
