import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from 'express';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { AuthService } from 'src/app/services/auth.service';
import { passwordMatchValidator } from 'src/app/shared/password-match.directive';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})

export class ConfiguracionComponent {

  }
