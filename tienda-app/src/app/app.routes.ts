import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaComponent } from './tienda/tienda.component';

export const routes: Routes = [
  { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'tiendas', component: TiendaComponent },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent) },
  { path: 'clientes', loadComponent: () => import('./components/cliente-list/cliente-list.component').then(m => m.ClienteListComponent) },
  { path: 'cliente-form', loadComponent: () => import('./components/cliente-form/cliente-form.component').then(m => m.ClienteFormComponent) },
  { path: 'cliente-form/:id', loadComponent: () => import('./components/cliente-form/cliente-form.component').then(m => m.ClienteFormComponent) },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
