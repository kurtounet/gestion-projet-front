import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'auth',
    loadChildren : () => import('./features/auth/auth.module').then(m => m.AuthModule)

  },
];
