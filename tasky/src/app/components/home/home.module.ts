import { LOCALE_ID, NgModule } from '@angular/core';
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
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';

import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import {AccordionModule} from 'primeng/accordion'

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { AboutTaskyComponent } from './components/footerShared/about-tasky/about-tasky.component';
import { TeamComponent } from './components/footerShared/team/team.component';
import { ContactUsComponent } from './components/footerShared/contact-us/contact-us.component';
import { TermsAndConditionsComponent } from './components/footerShared/terms-and-conditions/terms-and-conditions.component';
registerLocaleData(localeEs, 'es');
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
    ConfiguracionComponent,
    AboutTaskyComponent,
    TeamComponent,
    ContactUsComponent,
    TermsAndConditionsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    MessagesModule,
    DialogModule,
    TableModule,
    DropdownModule,
    CardModule,
    ChartModule,
    SelectButtonModule,
    ToggleButtonModule,
    AccordionModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es'}]
})
export class HomeModule { }
