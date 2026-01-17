import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotificationStore } from '@app/features/dashboard/stores/notification.store';

@Component({
  selector: 'app-notification-form',
  imports: [ReactiveFormsModule],
  templateUrl: './notification-form.component.html',
  styleUrl: './notification-form.component.css',
})
export class NotificationFormComponent {
  id = signal<string | number>(0);
  submitted = false;
  private fb = inject(FormBuilder);
  private notificationStore = inject(NotificationStore);

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
      id: ['', Validators.required],
      user_id: [''],
      message: ['', Validators.minLength(6), Validators.maxLength(255)],
      date: [''],
      type: ['', Validators.required, Validators.minLength(6), Validators.maxLength(255)],
    });
  }
  private initUpdateForm(): void {
    //this.projectInstanceStore.getProjectInstanceById(Number(this.id()));
    // const data: IProjectInstance = this.projectInstanceStore.currentProject();
    // const data: INotification3 = {};
    const data = {};

    if (!data) {
      this.initCreateForm();
      return;
    }

    this.form = this.fb.nonNullable.group({
      id: ['', Validators.required],
      user_id: [''],
      message: ['', Validators.minLength(6), Validators.maxLength(255)],
      date: [''],
      type: ['', Validators.required, Validators.minLength(6), Validators.maxLength(255)],
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
