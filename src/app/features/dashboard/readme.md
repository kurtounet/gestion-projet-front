// dashboard-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import des composants du dashboard
import { DashboardComponent } from './dashboard.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MessagesComponent } from './components/messages/messages.component';
import { HelpComponent } from './components/help/help.component';

// Import des guards si nécessaire
// import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent, // Layout principal avec sidebar
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: DashboardHomeComponent,
        data: { title: 'Accueil' }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { title: 'Profil' }
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: { title: 'Paramètres' }
      },
      {
        path: 'messages',
        component: MessagesComponent,
        data: { title: 'Messages' }
      },
      {
        path: 'help',
        component: HelpComponent,
        data: { title: 'Aide' }
      }
    ]
    // canActivate: [AuthGuard] // Si vous avez un guard d'authentification
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

// dashboard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import du routing
import { DashboardRoutingModule } from './dashboard-routing.module';

// Import des composants
import { DashboardComponent } from './dashboard.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MessagesComponent } from './components/messages/messages.component';
import { HelpComponent } from './components/help/help.component';

// Import du composant sidebar
import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHomeComponent,
    ProfileComponent,
    SettingsComponent,
    MessagesComponent,
    HelpComponent,
    SidebarComponent // Si pas dans un module partagé
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule // Import du routing en dernier
  ]
})
export class DashboardModule { }

// dashboard.component.ts
import { Component } from '@angular/core';

export interface MenuItem {
  label: string;
  path: string;
  icon?: string;
}

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-layout">
      <app-sidebar 
        [menuGroups]="menuGroups"
        title="Dashboard">
      </app-sidebar>
      
      <main class="dashboard-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-layout {
      display: flex;
      min-height: 100vh;
    }
    
    .dashboard-content {
      flex: 1;
      padding: 2rem;
      margin-left: 250px; /* Largeur de la sidebar */
      transition: margin-left 0.3s ease;
    }
    
    @media (max-width: 767px) {
      .dashboard-content {
        margin-left: 0;
        padding: 1rem;
      }
    }
  `]
})
export class DashboardComponent {
  menuGroups: MenuItem[] = [
    { 
      label: 'Accueil', 
      path: '/dashboard/home', 
      icon: '🏠' 
    },
    { 
      label: 'Profil', 
      path: '/dashboard/profile', 
      icon: '👤' 
    },
    { 
      label: 'Paramètres', 
      path: '/dashboard/settings', 
      icon: '⚙️' 
    },
    { 
      label: 'Messages', 
      path: '/dashboard/messages', 
      icon: '💬' 
    },
    { 
      label: 'Aide', 
      path: '/dashboard/help', 
      icon: '❓' 
    }
  ];
}

// app-routing.module.ts (routing principal de l'application)
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// Exemples de composants enfants

// dashboard-home.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  template: `
    <div class="dashboard-home">
      <h1>Bienvenue sur le Dashboard</h1>
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Utilisateurs</h3>
          <p class="stat-number">1,234</p>
        </div>
        <div class="stat-card">
          <h3>Ventes</h3>
          <p class="stat-number">€45,678</p>
        </div>
        <div class="stat-card">
          <h3>Messages</h3>
          <p class="stat-number">89</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-home {
      max-width: 1200px;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    
    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }
    
    .stat-number {
      font-size: 2rem;
      font-weight: bold;
      color: #3498db;
      margin: 0.5rem 0;
    }
  `]
})
export class DashboardHomeComponent { }

// profile.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  template: `
    <div class="profile">
      <h1>Mon Profil</h1>
      <div class="profile-card">
        <div class="avatar">
          <img src="https://via.placeholder.com/100" alt="Avatar">
        </div>
        <div class="profile-info">
          <h2>John Doe</h2>
          <p>john.doe@example.com</p>
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
export class ProfileComponent { }

// Structure des dossiers recommandée :
/*
src/
├── app/
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── dashboard-home/
│   │   │   ├── profile/
│   │   │   ├── settings/
│   │   │   ├── messages/
│   │   │   └── help/
│   │   ├── dashboard.component.ts
│   │   ├── dashboard.module.ts
│   │   └── dashboard-routing.module.ts
│   ├── shared/
│   │   └── components/
│   │       └── sidebar/
│   ├── app-routing.module.ts
│   └── app.module.ts
*/
