import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'No-clientId',
    pathMatch: 'full',
  },
  {
    path: 'No-clientId',
    loadComponent: () =>
      import('./features/no-data/no-data.component').then(
        (m) => m.NoDataComponent
      ),
  },
  // Home
  {
    path: 'profile/:current_user_id',
    loadComponent: () =>
      import('./features/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },
  // Login
  {
    path: 'profile/:current_user_id/auth',
    loadComponent: () =>
      import('./features/enter-client-id/enter-client-id.component').then(
        (m) => m.EnterClientIdComponent
      ),
  },
  // Change Data
  {
    path: 'profile/:current_user_id/edit',
    loadComponent: () =>
      import('./features/change-data/change-data.component').then(
        (m) => m.ChangeDataComponent
      ),
    // canActivate: [authGuard],
  },

  {
    path: 'qr-code/:clientId',
    loadComponent: () =>
      import('./features/qr-image/qr-image.component').then(
        (m) => m.QrImageComponent
      ),
  },
  
];
