import { Component } from '@angular/core';

@Component({
  selector: 'app-profiles',
  template: `
    <div class="profile">
      <h1>Mon Profil</h1>
      <div class="profile-card">
        <div class="avatar">
          <img src="https://via.placeholder.com/100" alt="Avatar">
        </div>
        <div class="profile-info">
          <h2>John Doe</h2>
          <p>john.do&#64;example.com</p>
          <button class="btn-primary">Modifier le profil</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-top: 2rem;
    }

    .avatar img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }

    .btn-primary {
      background: #3498db;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 1rem;
    }
  `]
})
export class ProfilesComponent { }
