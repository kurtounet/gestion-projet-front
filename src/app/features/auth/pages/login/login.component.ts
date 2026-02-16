import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ICredentials, IToken } from '../../models/login.model';
import {
  form,
  Field,
  schema,
  required,
  minLength,
  email,
  submit,
} from '@angular/forms/signals';
import { Router } from '@angular/router';
import { AUTH_CONFIG } from '../../models/auth-config.model';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Field],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly config = inject(AUTH_CONFIG);

  defaultLogin = { email: '', password: '' };

  private readonly credentialSchema = schema<ICredentials>((credentials) => {
    // email
    required(credentials.email, { message: 'Email is required' });
    email(credentials.email, { message: 'Enter a valid email address' });
    // password
    required(credentials.password, { message: 'Password is required' });
    minLength(credentials.password, 8, { message: 'Password must be at least 8 characters long' });
  });

  private readonly credentials = signal<ICredentials>(this.defaultLogin);
  protected readonly loginForm = form(this.credentials, this.credentialSchema);

  onSubmit(event: Event): void {
    event.preventDefault();
    submit(this.loginForm, async () => {
      const credentials = this.loginForm().value();
      this.authService.login(credentials).subscribe({
        next: (token: IToken) => {
          if (token?.token) {
            if (this.authService.isLogged()) {
              this.router.navigateByUrl(this.config.defaultRedirectUrl);
            }
          } else {
            this.router.navigate([this.config.loginRoute]);
          }
        },
        error: (error) => {
          console.error('Login failed', error);
        },
      });
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
