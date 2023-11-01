import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/main/inicio/inicio.component';
import { CategoriasComponent } from './components/main/categorias/categorias.component';
import { TareasComponent } from './components/main/tareas/tareas.component';

const routes: Routes = [
  {
    path : '',
    component : InicioComponent
  },
  {
    path : 'categorias',
    component : CategoriasComponent
  },
  {
    path : 'tareas',
    component : TareasComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
