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
  registerForm = this.fb.group({
    ciudad: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    provincia: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    pais: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService)
  { }

  get ciudad(){
    return this.registerForm.controls['ciudad'];
  }

  get provincia(){
    return this.registerForm.controls['provincia'];
  }

  get pais(){
    return this.registerForm.controls['pais'];
  }

  submitLocalizacion() {
    const { ciudad, provincia, pais} = this.registerForm.value;
  }
}
