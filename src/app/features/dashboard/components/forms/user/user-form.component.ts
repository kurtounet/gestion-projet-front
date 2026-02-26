import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserStore } from '@app/features/dashboard/stores/index';
import { FormInputComponent, FormSelectComponent } from '../../shared/index';
import { IUser } from '@app/features/dashboard/models/index';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, FormInputComponent, FormSelectComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userStore = inject(UserStore);

  // Options
  protected roleOptions = signal([
    { id: 'ROLE_USER', label: 'Utilisateur' },
    { id: 'ROLE_ADMIN', label: 'Administrateur' },
  ]);

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    id: [0],
    role: [['ROLE_USER'], [Validators.required]],
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    createdAt: [new Date(), [Validators.required]],
    updatedAt: [new Date(), [Validators.required]],
  });

  ngOnInit() {
    const data = this.userStore.currentUser();

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
    const userData: IUser = {
      ...rawValue,
      id: rawValue.id || 0,
    };

    if (this.isNew()) {
      this.userStore.createUser(userData);
    } else {
      this.userStore.updateUser(String(this.id()), userData);
    }
  }
}
