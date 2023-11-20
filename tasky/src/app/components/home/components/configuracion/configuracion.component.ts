import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { LocalizacionJson } from 'src/app/interfaces/auth';
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

  tempForm = this.ft.group({
    tiempoTarea: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    tiempoDescanzo: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    tiempoAgua: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
  })

  constructor(
    private fb: FormBuilder,
    private ft: FormBuilder,
    private authService: AuthService,
    private router: Router,
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

  get tiempoTarea(){
    return this.tempForm.controls['tiempoTarea'];
  }

  get tiempoDescanzo(){
    return this.tempForm.controls['tiempoDescanzo'];
  }

  get tiempoAgua(){
    return this.tempForm.controls['tiempoAgua'];
  }

  submitTemporizador(){
    const { tiempoTarea, tiempoDescanzo, tiempoAgua} = this.tempForm.value;

    if(tiempoTarea && tiempoDescanzo && tiempoAgua)
    {
      //guardo en bd
    }
  }

  submitLocalizacion() {
    const { ciudad, provincia, pais} = this.registerForm.value;

    if(ciudad  && provincia && pais)
    {
      try {
        pedirAPI(ciudad, provincia, pais);
        //guardo la lat y long para actualizar en la api
        let lat;
        let lon;

        if(jsonLoc.length != 0)
        {
          lat = jsonLoc[0].lat;
          lon = jsonLoc[0].lon;

          //conectar bd
        }
      }
      catch (error) {
        console.log(error);
      }
    }

    //REDIRECCIONA A INICIO
    this.router.navigate(['/home']);
  }
}

let jsonLoc: LocalizacionJson[];

function pedirAPI(ciudad: string, provincia: string, pais: string) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    let lat: string = '-38.0033';
    let lon: string = '-57.5528';
    let API_key: string = '';

    xhr.open('GET', "https://geocode.maps.co/search?q="+ciudad+","+provincia+","+pais);
    xhr.responseType = 'json';

    xhr.onload = function () {
      if (xhr.status == 200) {
        jsonLoc = xhr.response;
        resolve(jsonLoc);
        console.log(jsonLoc);

      } else {
        reject('error');
      }
    };

    xhr.send();
  })
}

