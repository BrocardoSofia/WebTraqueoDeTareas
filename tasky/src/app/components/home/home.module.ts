import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AsideComponent } from './components/aside/aside.component';
import { ButtonModule } from 'primeng/button';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ButtonModule
  ]
})
export class HomeModule { }
