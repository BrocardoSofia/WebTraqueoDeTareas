import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './components/categorias/categorias.component';

const routes: Routes = [
  {
    path: 'categorias',
    component: CategoriasComponent
  },
  {
    path: '', redirectTo: 'categorias', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
