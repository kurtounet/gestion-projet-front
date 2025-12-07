import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ILogin } from '../../models/login.model';
import { form, Field, schema, required, minLength, email, validate, customError, submit } from '@angular/forms/signals';
import z from 'zod';
export const loginZodSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})
type TLogin = z.infer<typeof loginZodSchema>;
@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Field],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private readonly authService = inject(AuthService);

  defaultLogin = {email: '', password: ''};

  private readonly credentialSchema = schema<TLogin>(credentials => {
    // email
    required(credentials.email, { message: 'Email is required' });
    email(credentials.email, { message: 'Enter a valid email address' });
    // password
    required(credentials.password, { message: 'Password is required' });
    minLength(credentials.password, 8 , { message: 'Password must be at least 8 characters long' });
  });

  private readonly credentials =  signal<ILogin>(this.defaultLogin);
  protected readonly loginForm = form(this.credentials, this.credentialSchema);


  onSubmit(event: Event): void {
    event.preventDefault();
    submit(this.loginForm, async () => {
      const credentials = this.loginForm().value();
      // In a real app, this would be async:
      this.authService.login(credentials);
      console.log('Logging in with:', credentials.email, credentials.password);
    });
  }
}
/*
    // Valider avec Zod
    const result =  loginZodSchema.safeParse({
      email: credentials.email,
      password: credentials.password
    });
     // Validation email
    const emailResult = loginZodSchema.shape.email.safeParse(credentials.email);
    if (!emailResult.success) {
      required(credentials.email, { message: emailResult.error.issues[0].message });
    } else {
      email(credentials.email, { message: 'Enter a valid email address' });
    }

    // Validation password
    const passwordResult = loginZodSchema.shape.password.safeParse(credentials.password);
    if (!passwordResult.success) {
      required(credentials.password, { message: passwordResult.error.issues[0].message });
    } else {
      minLength(credentials.password, 8, { message: 'Password must be at least 8 characters' });
    }

*/
