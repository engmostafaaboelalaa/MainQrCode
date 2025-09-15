import { Routes } from '@angular/router';
import { ChangeDataComponent } from './features/change-data/change-data.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'user/:id',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
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
];
