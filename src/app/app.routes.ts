import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'No-clientId',
    pathMatch: 'full',
  },
  {
    path: 'user/:current_user_id',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'No-clientId',
    loadComponent: () =>
      import('./features/no-data/no-data.component').then(
        (m) => m.NoDataComponent
      ),
  },
  {
    path: 'profile/:current_user_id/user-form/:product_id',
    loadComponent: () =>
      import('./features/change-data/change-data.component').then(
        (m) => m.ChangeDataComponent
      ),
  },
  {
    path: 'user/:current_user_id/auth',
    loadComponent: () =>
      import('./features/enter-client-id/enter-client-id.component').then(
        (m) => m.EnterClientIdComponent
      ),
  },
  {
    path: 'user/:current_user_id/edit',
    loadComponent: () =>
      import('./features/change-data/change-data.component').then(
        (m) => m.ChangeDataComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'qr-code/:clientId',
    loadComponent: () =>
      import('./features/qr-image/qr-image.component').then(
        (m) => m.QrImageComponent
      ),
  },
  {
    path: 'profile/:current_user_id',
    loadComponent: () =>
      import('./features/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },
];
