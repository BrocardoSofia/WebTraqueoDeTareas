import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { TemporizadorService } from 'src/app/services/temporizador.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router,
    private msgService: MessageService,
    private localizacionService: LocalizacionService,
    private temporizadorService: TemporizadorService,
  ) { }

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  loginUser() {
    const { email, password } = this.loginForm.value;

    this.usuarioService.existeEmail(email as string).subscribe(
      response => {

        if (response.length == 0) {
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'email no registrado' });
        } else {

          this.usuarioService.login(email as string, password as string).subscribe(
            res => {

              if (res.length != 0) {

                //GUARDAR ID
                localStorage.setItem('id_usuario', JSON.stringify(res[0].id))
                localStorage.setItem('nombre_usuario', JSON.stringify(res[0].nombre))


                //recoge los datos de localizacion
                this.localizacionService.tieneLocalizacion(res[0].id).subscribe(
                  res => {

                    if (res.length > 0) {
                      localStorage.setItem('localizacion', JSON.stringify(true))
                      localStorage.setItem('longitud', JSON.stringify(res[0].longitud))
                      localStorage.setItem('latitud', JSON.stringify(res[0].latitud))
                    } else {
                      localStorage.setItem('localizacion', JSON.stringify(false))
                    }

                    //recoge los datos de temporizadores
                    this.temporizadorService.obtenerTemporizador(JSON.parse(localStorage.getItem('id_usuario')!)).subscribe(
                      res => {
                        if (res.length > 0) {
                          localStorage.setItem('minutos_agua', JSON.stringify(res[0].minutos_agua))
                          localStorage.setItem('minutos_descanso', JSON.stringify(res[0].minutos_descanso))
                        }

                        localStorage.setItem('token', 'token') //guardo token para guards
                        sessionStorage.setItem('email', email as string);
                        this.router.navigate(['/home']);
                      }
                    )
                  }
                )

              } else {
                this.msgService.add({ severity: 'error', summary: 'Error', detail: 'email y/o password incorrectos' });
              }

            }
          )
        }
      },
      e => {
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Algo salió mal' });
      }
    )
  }
}
