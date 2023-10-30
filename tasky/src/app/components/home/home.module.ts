import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AsideComponent } from './components/aside/aside.component';
import { ButtonModule } from 'primeng/button';
import { MainComponent } from './components/main/main.component';
import { InicioComponent } from './components/main/inicio/inicio.component';
import { CategoriasComponent } from './components/main/categorias/categorias.component';
import { TareasComponent } from './components/main/tareas/tareas.component';
import { ConfAguaComponent } from './components/main/conf-agua/conf-agua.component';
import { ConfEjercicioComponent } from './components/main/conf-ejercicio/conf-ejercicio.component';
import { ConfPomodoroComponent } from './components/main/conf-pomodoro/conf-pomodoro.component';
import { UsuarioComponent } from './components/main/usuario/usuario.component';
import { EstadisticasComponent } from './components/main/estadisticas/estadisticas.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    MainComponent,
    InicioComponent,
    CategoriasComponent,
    TareasComponent,
    ConfAguaComponent,
    ConfEjercicioComponent,
    ConfPomodoroComponent,
    UsuarioComponent,
    EstadisticasComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ButtonModule
  ]
})
export class HomeModule { }
