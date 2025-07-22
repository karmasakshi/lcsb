import { Routes } from '@angular/router';
import { BpPage } from './components/bp-page/bp-page';
import { HomePage } from './components/home-page/home-page';
import { isAuthenticatedGuard } from './guards/is-authenticated/is-authenticated-guard';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'bp', component: BpPage, canActivate: [isAuthenticatedGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
