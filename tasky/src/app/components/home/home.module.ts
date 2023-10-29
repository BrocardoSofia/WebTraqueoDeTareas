import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AsideComponent } from './components/aside/aside.component';
import { MainComponent } from './components/main/main.component';
import { CategoriasComponent } from './components/main/components/categorias/categorias.component';
import { TareasComponent } from './components/main/components/tareas/tareas.component';
import { ConfaguaComponent } from './components/main/components/confagua/confagua.component';
import { ConfejercComponent } from './components/main/components/confejerc/confejerc.component';
import { ConfpomoComponent } from './components/main/components/confpomo/confpomo.component';
import { UsuarioComponent } from './components/main/components/usuario/usuario.component';
import { EstadisticasComponent } from './components/main/components/estadisticas/estadisticas.component';



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    MainComponent,
    CategoriasComponent,
    TareasComponent,
    ConfaguaComponent,
    ConfejercComponent,
    ConfpomoComponent,
    UsuarioComponent,
    EstadisticasComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
