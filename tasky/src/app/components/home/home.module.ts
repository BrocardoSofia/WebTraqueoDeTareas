import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AsideComponent } from './components/aside/aside.component';
import { ButtonModule } from 'primeng/button';
import { InicioComponent } from './components/main/inicio/inicio.component';
import { CategoriasComponent } from './components/main/categorias/categorias.component';

import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TareasComponent } from './components/main/tareas/tareas.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    InicioComponent,
    CategoriasComponent,
    TareasComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ButtonModule,
    InputTextModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule
  ]
})
export class HomeModule { }
