import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ToastrModule } from 'ngx-toastr';
import { HelpComponent } from './components/home/components/footerShared/help/help.component';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,//ACA NO PONGO EL MODULO PORQUE YA LO IMPORTO DESDE DENTRO DE ACA
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AccordionModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
