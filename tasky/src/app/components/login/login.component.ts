import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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
    private msgService: MessageService
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

              if (res.length!= 0) {

                //GUARDAR ID
                localStorage.setItem('id_usuario',JSON.stringify(res[0].id))
                localStorage.setItem('nombre_usuario',JSON.stringify(res[0].nombre))

                sessionStorage.setItem('email', email as string);
                this.router.navigate(['/home']);
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
