import { Routes } from '@angular/router';


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
    path: 'user/:current_user_id',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'No-clientId',
    loadComponent: () =>
      import('./features/no-data/no-data.component').then((m) => m.NoDataComponent),
  },
  {
    path: 'user/:current_user_id/user-form',
    loadComponent: () =>
      import('./features/enter-client-id/enter-client-id.component').then(
        (m) => m.EnterClientIdComponent
      ),
  },
  {
    path: 'user/:current_user_id/user-form/:update_id',
    loadComponent: () =>
      import('./features/change-data/change-data.component').then(
        (m) => m.ChangeDataComponent
      ),
  },
  {
    path: 'user-form',
    loadComponent: () =>
      import('./features/change-data/change-data.component').then(
        (m) => m.ChangeDataComponent
      ),
  },
  {
    path: 'qr-code/:clientId',
    loadComponent: () =>
      import('./features/qr-image/qr-image.component').then(
        (m) => m.QrImageComponent
      ),
  },
  
];
