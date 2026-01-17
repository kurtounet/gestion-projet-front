import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectTemplateSprintTemplateStore } from '@app/features/dashboard/stores/project-template-sprint-template.store';

@Component({
  selector: 'app-project-template-sprint-template-form',
  imports: [ReactiveFormsModule],
  templateUrl: './project-template-sprint-template-form.component.html',
  styleUrl: './project-template-sprint-template-form.component.css',
})
export class ProjectTemplateSprintTemplateFormComponent {
  id = signal<string | number>(0);
  submitted = false;
  private fb = inject(FormBuilder);
  private projectTemplateSprintTemplateStore = inject(ProjectTemplateSprintTemplateStore);

  form!: FormGroup;

  ngOnInit() {
    if (this.id() === 0 || this.id() === null) {
      this.initCreateForm();
    } else {
      this.initUpdateForm();
    }
  }

  private initCreateForm(): void {
    this.form = this.fb.nonNullable.group({
      project_template_id: ['', Validators.required],
      sprint_template_id: ['', Validators.required],
      sprint_order: [''],
      created_At: ['', Validators.required],
      updated_At: ['', Validators.required],
    });
  }
  private initUpdateForm(): void {
    //this.projectInstanceStore.getProjectInstanceById(Number(this.id()));
    // const data: IProjectInstance = this.projectInstanceStore.currentProject();
    // const data: IProjectTemplateSprintTemplate = {};
    const data = {};

    if (!data) {
      this.initCreateForm();
      return;
    }

    this.form = this.fb.nonNullable.group({
      project_template_id: ['', Validators.required],
      sprint_template_id: ['', Validators.required],
      sprint_order: [''],
      created_At: ['', Validators.required],
      updated_At: ['', Validators.required],
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

    if (this.id() === 0 || this.id() === null) {
      //this.projectInstanceStore.createProjectInstance(formValue);
      console.log('Création:', formValue);
    } else {
      //this.projectInstanceStore.updateProjectInstance(String(this.id()), formValue);
      console.log('Modification:', formValue);
    }
  }
}
