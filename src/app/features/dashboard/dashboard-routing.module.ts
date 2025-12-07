import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProjetComponent } from './pages/projet/projet.component';
import { ProjetListComponent } from './pages/projet-list/projet-list.component';
import { authGuard } from '../auth/guard/auth-guard';

// Import des composants du dashboard


// Import des guards si nécessaire
// import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: DashboardComponent, // Layout principal avec sidebar
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
        data: { title: 'Accueil' }
      },
      {
        path: 'profiles',
        component: ProfilesComponent,
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
        path: 'projects',
        component: ProjetListComponent,
        data: { title: 'Projets' }
      },
      {
        path: 'project/:id',
        component: ProjetComponent,
        data: { title: 'Projet' }
      },
      // {
      //   path: 'help',
      //   component: HelpComponent,
      //   data: { title: 'Aide' }
      // }
    ]
    // canActivate: [AuthGuard] // Si vous avez un guard d'authentification
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
