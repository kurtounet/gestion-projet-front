import { Routes } from '@angular/router';
import { authMatchGuard } from './features/auth/guard/auth-guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    // canMatch: [authMatchGuard],
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'auth',
    loadChildren : () => import('./features/auth/auth.module').then(m => m.AuthModule)

  },
];
