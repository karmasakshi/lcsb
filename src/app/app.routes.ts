import { Routes } from '@angular/router';
import { BpPage } from './components/bp-page/bp-page';
import { HomePage } from './components/home-page/home-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'bp', component: BpPage },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
