import { Routes } from '@angular/router';
import { ChangeDataComponent } from './features/change-data/change-data.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'edit',
    loadComponent: () =>
      import('./features/change-data/change-data.component').then(
        (m) => m.ChangeDataComponent
      ),
  },
];
