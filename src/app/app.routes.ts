import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', loadComponent: () => import('./components/home/home').then(m => m.Home) },
  { path: 'window-cleaning', loadComponent: () => import('./components/placeholder/placeholder').then(m => m.Placeholder) },
  { path: 'high-ceiling', loadComponent: () => import('./components/placeholder/placeholder').then(m => m.Placeholder) },
  { path: 'commercial-residential', loadComponent: () => import('./components/commercial-residential/commercial-residential').then(m => m.CommercialResidential) },
  { path: 'power-washing', loadComponent: () => import('./components/placeholder/placeholder').then(m => m.Placeholder) },
  { path: '**', redirectTo: 'home' },
];