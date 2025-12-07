
import { Component } from '@angular/core'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent { 
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      user_id: ['', [Validators.required, Validators.minLength(8)]],
  role: ['', [Validators.required, Validators.minLength(8)]],
  first_name: ['', [Validators.required, Validators.minLength(8)]],
  last_name: ['', [Validators.required, Validators.minLength(8)]],
  email: ['', [Validators.required, Validators.minLength(8)]],
  password: ['', [Validators.required, Validators.minLength(8)]],
  created_At: ['', [Validators.required, Validators.minLength(8)]],
  updated_At: ['', [Validators.required, Validators.minLength(8)]],      
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    // Traitement du form
    console.log(this.form.value);
  }
}

