import { Routes } from '@angular/router';
import { UserPage } from './user-page/user-page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-page',
    pathMatch: 'full',
  },
  {
    path: 'account-page',
    loadComponent: () =>
      import('./account-page/account-page.component').then((m) => m.AccountPageComponent),
  },
  {
    path: 'user-page',
    component: UserPage,
  },
];
