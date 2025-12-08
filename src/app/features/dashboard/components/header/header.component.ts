import { Component, inject } from '@angular/core';
import { AuthService } from '@app/features/auth/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  authService = inject(AuthService);
  logout() {
    this.authService.logOut();
  }
}
