import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AsideComponent } from './components/aside/aside.component';
import { ButtonModule } from 'primeng/button';
import { InicioComponent } from './components/inicio/inicio.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { BodyComponent } from './components/body/body.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    InicioComponent,
    CategoriasComponent,
    TareasComponent,
    UsuarioComponent,
    EstadisticasComponent,
    BodyComponent,
    ConfiguracionComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    
  ]
})
export class HomeModule { }
