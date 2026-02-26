import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationStore, UserStore } from '@app/features/dashboard/stores/index';
import {
  FormInputComponent,
  FormTextareaComponent,
  FormSelectComponent,
} from '../../shared/index';
import { INotification } from '@app/features/dashboard/models/index';

@Component({
  selector: 'app-notification-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormInputComponent, FormTextareaComponent, FormSelectComponent],
  templateUrl: './notification-form.component.html',
  styleUrl: './notification-form.component.css',
})
export class NotificationFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private notificationStore = inject(NotificationStore);
  private userStore = inject(UserStore);

  // Options
  protected userOptions = this.userStore.users;

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    id: [0],
    userId: [0, [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
    date: [new Date()],
    type: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  });

  ngOnInit() {
    const data = this.notificationStore.currentNotification();

    if (data && !this.isNew()) {
      this.form.patchValue({
        ...data,
        userId: data.userId || 0,
      });
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
    const notificationData: INotification = {
      ...rawValue,
      id: rawValue.id || 0,
    };

    if (this.isNew()) {
      this.notificationStore.createNotification(notificationData);
    } else {
      this.notificationStore.updateNotification(String(this.id()), notificationData);
    }
  }
}
