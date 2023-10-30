import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    CategoriasComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ButtonModule
  ]
})
export class MainModule { }
