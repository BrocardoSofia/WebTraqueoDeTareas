import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ConfAguaComponent } from './components/conf-agua/conf-agua.component';
import { ConfEjercicioComponent } from './components/conf-ejercicio/conf-ejercicio.component';
import { ConfPomodoroComponent } from './components/conf-pomodoro/conf-pomodoro.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent},
  {path: 'categorias', component: CategoriasComponent},
  {path: 'usuario', component: UsuarioComponent},
  {path: 'conf-agua', component: ConfAguaComponent},
  {path: 'conf-ejercicio', component: ConfEjercicioComponent},
  {path: 'conf-pomodoro', component: ConfPomodoroComponent},
  {path: 'estadisticas', component: EstadisticasComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
