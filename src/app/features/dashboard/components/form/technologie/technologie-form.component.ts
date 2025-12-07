
import { Component } from '@angular/core'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-technologie-form',
  imports: [ReactiveFormsModule],
  templateUrl: './technologie-form.component.html',
  styleUrl: './technologie-form.component.css',
})
export class TechnologieFormComponent { 
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(8)]],
  label: ['', [Validators.required, Validators.minLength(8)]],      
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

