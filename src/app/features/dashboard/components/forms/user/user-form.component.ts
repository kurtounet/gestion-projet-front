import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserStore } from '@app/features/dashboard/stores/user.store';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  id = signal<string | number>(0);
  submitted = false;
  private fb = inject(FormBuilder);
  private userStore = inject(UserStore);

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
      user_id: ['', Validators.required],
      role: ['', Validators.required],
      first_name: ['', Validators.required, Validators.minLength(6), Validators.maxLength(255)],
      last_name: ['', Validators.required, Validators.minLength(6), Validators.maxLength(255)],
      email: ['', Validators.required, Validators.minLength(6), Validators.maxLength(255)],
      password: ['', Validators.required, Validators.minLength(6), Validators.maxLength(255)],
      created_At: ['', Validators.required],
      updated_At: ['', Validators.required],
    });
  }
  private initUpdateForm(): void {
    //this.projectInstanceStore.getProjectInstanceById(Number(this.id()));
    // const data: IProjectInstance = this.projectInstanceStore.currentProject();
    // const data: IUser = {};
    const data = {};

    if (!data) {
      this.initCreateForm();
      return;
    }

    this.form = this.fb.nonNullable.group({
      user_id: ['', Validators.required],
      role: ['', Validators.required],
      first_name: ['', Validators.required, Validators.minLength(6), Validators.maxLength(255)],
      last_name: ['', Validators.required, Validators.minLength(6), Validators.maxLength(255)],
      email: ['', Validators.required, Validators.minLength(6), Validators.maxLength(255)],
      password: ['', Validators.required, Validators.minLength(6), Validators.maxLength(255)],
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
