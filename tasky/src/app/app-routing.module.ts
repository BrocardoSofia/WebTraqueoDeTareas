import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { loginGuard,logoutGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate : [logoutGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate : [logoutGuard]
  },
  {
    //ACLARO LA RUTA Y EL MODULO A CARGAR
    path: 'home',
    component: HomeComponent,
    loadChildren : () => import('./components/home/home.module').then(m => m.HomeModule),
    canActivate : [loginGuard]
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
