import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { LocalizacionJson } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';
import { passwordMatchValidator } from 'src/app/shared/password-match.directive';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { Localizacion } from 'src/app/interfaces/Localizacion';

import { UsuarioService } from 'src/app/services/usuario.service';
import { TemporizadorService } from 'src/app/services/temporizador.service';
import { Temporizador } from 'src/app/interfaces/Temporizador';

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

  //ID USUARIO DEL LOCAL STORAGE
  idUsuarioString = localStorage.getItem('id_usuario');
  idUsuarioNumber = parseInt(this.idUsuarioString!, 10);

  tempForm = this.ft.group({
    tiempoTarea: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    tiempoDescanzo: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    tiempoAgua: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
  })

  nombreForm = this.fn.group({
    nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    password: ['', [Validators.required]],
  })

  passwordForm = this.fp.group({
    nuevoPassword: ['', [Validators.required]],
    passwordF: ['', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private ft: FormBuilder,
    private fn: FormBuilder,
    private fp: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private localizacionService: LocalizacionService,
    private usuarioService: UsuarioService,
    private temporizadorService: TemporizadorService) { }

  get nuevoPassword() {
    return this.passwordForm.controls['nuevoPassword'];
  }

  get passwordF() {
    return this.passwordForm.controls['passwordF'];
  }

  get nombre() {
    return this.nombreForm.controls['nombre'];
  }

  get password() {
    return this.nombreForm.controls['password'];
  }

  get ciudad() {
    return this.registerForm.controls['ciudad'];
  }

  get provincia() {
    return this.registerForm.controls['provincia'];
  }

  get pais() {
    return this.registerForm.controls['pais'];
  }

  get tiempoTarea() {
    return this.tempForm.controls['tiempoTarea'];
  }

  get tiempoDescanzo() {
    return this.tempForm.controls['tiempoDescanzo'];
  }

  get tiempoAgua() {
    return this.tempForm.controls['tiempoAgua'];
  }

  submitPassword() {
    const { nuevoPassword, passwordF } = this.passwordForm.value;

    this.usuarioService.verificarClave(this.idUsuarioNumber, passwordF!).subscribe(
      res => {
        if (res.length > 0) {
          this.usuarioService.modificarClave(nuevoPassword!, this.idUsuarioNumber).subscribe(
            res => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se modifico la contraseña correctamente' });
              //REDIRECCIONA A INICIO
              this.router.navigate(['/home']);
            }
          )
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Contraseña incorrecta' });
        }
      },
      e => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'ha ocurrido un error' });
      }
    )
  }

  submitTemporizador() {
    const { tiempoTarea, tiempoDescanzo, tiempoAgua } = this.tempForm.value;

    if (tiempoTarea && tiempoDescanzo && tiempoAgua) {
      //guardo en bd

      let temporizador = new Temporizador;
      temporizador.id_usuario = this.idUsuarioNumber;
      temporizador.ejercicio = 0;
      temporizador.minutos_agua = parseInt(tiempoAgua)
      temporizador.minutos_descanso = parseInt(tiempoDescanzo)
      temporizador.minutos_tarea = parseInt(tiempoTarea)

      this.temporizadorService.obtenerTemporizador(this.idUsuarioNumber).subscribe(
        res => {

          if (res.length > 0) {
            this.temporizadorService.modificarTemporizador(temporizador).subscribe(
              res => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se modifico correctamente' });
              }
            )
          } else {
            this.temporizadorService.guardarTemporizador(temporizador).subscribe(
              res => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se guardo correctamente' });
              }
            )
          }
        }
      )


      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se modifico correctamente' });

      //REDIRECCIONA A INICIO
      this.router.navigate(['/home']);
    }
  }

  submitNombre() {
    const { nombre, password } = this.nombreForm.value;

    this.usuarioService.verificarClave(this.idUsuarioNumber, password!).subscribe(
      res => {
        if (res.length > 0) {
          this.usuarioService.modificarNombre(nombre!, this.idUsuarioNumber).subscribe(
            res => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se modifico el nombre correctamente' });
              localStorage.setItem('nombre_usuario', JSON.stringify(nombre))
              //REDIRECCIONA A INICIO
              this.router.navigate(['/home']);
            }
          )
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Contraseña incorrecta' });
        }
      },
      e => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'ha ocurrido un error' });
      }
    )
  }

  async submitLocalizacion() {
    const { ciudad, provincia, pais } = this.registerForm.value;

    if (ciudad && provincia && pais) {
      try {
        await pedirAPI(ciudad, provincia, pais);
        //guardo la lat y long para actualizar en la api
        let lat;
        let lon;

        if ((jsonLoc.length != 0)) {
          lat = jsonLoc[0].lat;
          lon = jsonLoc[0].lon;

          //conectar bd
          let tieneLocalizacion = JSON.parse(localStorage.getItem('localizacion')!);

          let localizacion = new Localizacion()
          localizacion.id_usuario = this.idUsuarioNumber;
          localizacion.latitud = parseFloat(lat);
          localizacion.longitud = parseFloat(lon);

          localStorage.setItem('longitud', JSON.stringify(lon))
          localStorage.setItem('latitud', JSON.stringify(lat))

          if (tieneLocalizacion) {
            this.localizacionService.modificarLocalizacion(localizacion).subscribe(
              res => {
                this.messageService.add({ severity: 'succes', summary: 'succes', detail: 'Localizacion modificada' });
              }
            )
          } else {
            this.localizacionService.guardarLocalizacion(localizacion).subscribe(
              res => {
                this.messageService.add({ severity: 'succes', summary: 'succes', detail: 'Localizacion guardada' });
              }
            )
          }
          localStorage.setItem('localizacion', JSON.stringify(true))
          //REDIRECCIONA A INICIO
          this.router.navigate(['/home']);
        }
      }
      catch (error) {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Problemas con la API' });
      }
    }
  }
}

let jsonLoc: LocalizacionJson[];

function pedirAPI(ciudad: string, provincia: string, pais: string) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', "https://geocode.maps.co/search?q=" + ciudad + "," + provincia + "," + pais);
    xhr.responseType = 'json';

    xhr.onload = function () {
      if (xhr.status == 200) {
        jsonLoc = xhr.response;
        resolve(jsonLoc);
        console.log(jsonLoc);

        //aca



        //hasta aca

      } else {
        reject('error');
      }
    };

    xhr.send();
  })
}

