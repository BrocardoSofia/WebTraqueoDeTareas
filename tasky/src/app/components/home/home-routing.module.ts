import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { TareasComponent } from './components/tareas/tareas.component';

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent},
  {path: 'categorias', component: CategoriasComponent},
  {path: 'categorias/tareas', component: TareasComponent},
  {path: 'usuario', component: UsuarioComponent},
  {path: 'configuracion', component: ConfiguracionComponent},
  {path: 'estadisticas', component: EstadisticasComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
