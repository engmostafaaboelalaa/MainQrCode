import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'No-clientId',
    pathMatch: 'full',
  },
  {
    path: 'user/:id',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'No-clientId',
    loadComponent: () =>
      import('./features/no-data/no-data.component').then((m) => m.NoDataComponent),
  },
  {
    path: 'user/:id/user-form',
    loadComponent: () =>
      import('./features/enter-client-id/enter-client-id.component').then(
        (m) => m.EnterClientIdComponent
      ),
  },
  {
    path: 'user-form/:id',
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
