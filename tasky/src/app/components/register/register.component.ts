import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';
import { passwordMatchValidator } from 'src/app/shared/password-match.directive';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&_-])[A-Za-z\d$@$!%*?&_-].{7,}/)]],
    confirmPassword: ['', Validators.required]
  }, {
    validators: passwordMatchValidator
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private router: Router) { }

  get fullName() {
    return this.registerForm.controls['fullName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  submitDetails() {
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;

    this.usuarioService.existeEmail(postData.email as string).subscribe(
      response => {
        if (response.length != 0) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email ya registrado' });
        } else {
          this.usuarioService.registrarUsuario(postData as User).subscribe(
            response => {
              console.log(response);
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registro exitoso' });
              this.router.navigate(['login'])
            }
          )
        }
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Algo salió mal' });
      }
    )
  }
}
