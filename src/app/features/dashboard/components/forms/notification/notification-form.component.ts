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
    message: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(65535)]],
    date: [new Date().toISOString(), [Validators.required]],
    type: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    user: [null as string | null],
  });

  ngOnInit() {
    const data = this.notificationStore.currentNotification();

    if (data && !this.isNew()) {
      this.form.patchValue({
        ...data,
        user: data.user || null,
      } as any);
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
      createdAt: '', // Will be set by backend
    };

    if (this.isNew()) {
      this.notificationStore.createNotification(notificationData);
    } else {
      this.notificationStore.updateNotification(String(notificationData.id), notificationData);
    }
  }
}
