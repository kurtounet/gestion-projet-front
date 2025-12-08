import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  forgotForm!: FormGroup;

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.forgotForm.valid) {
      this.authService.forgotPassword(this.forgotForm.value).subscribe(
        (response) => {
          console.log('Forgot password request successful', response);
          // Handle successful request, e.g., show a message to the user
        },
        (error) => {
          console.error('Forgot password request failed', error);
          // Handle error
        },
      );
    }
  }
}
