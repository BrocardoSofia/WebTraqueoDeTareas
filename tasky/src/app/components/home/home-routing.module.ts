import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { LoginComponent } from '../login/login.component';
import { HelpComponent } from './components/footerShared/help/help.component';
import { AboutTaskyComponent } from './components/footerShared/about-tasky/about-tasky.component';
import { TeamComponent } from './components/footerShared/team/team.component';
import { ContactUsComponent } from './components/footerShared/contact-us/contact-us.component';
import { TermsAndConditionsComponent } from './components/footerShared/terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent},
  {path: 'categorias', component: CategoriasComponent},
  {path: 'categorias/tareas', component: TareasComponent},
  {path: 'usuario', component: UsuarioComponent},
  {path: 'configuracion', component: ConfiguracionComponent},
  {path: 'estadisticas', component: EstadisticasComponent},
  {path: 'login', component: LoginComponent},
  {path: 'help', component: HelpComponent},
  {path: 'about', component: AboutTaskyComponent},
  {path: 'team', component: TeamComponent},
  {path: 'contact', component: ContactUsComponent},
  {path: 'legal', component: TermsAndConditionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
