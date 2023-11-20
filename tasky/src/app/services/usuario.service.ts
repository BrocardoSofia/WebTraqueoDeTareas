import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = enviroment.endpoint;
    this.myApiUrl = 'api/usuarios'; //tendria que ser api/usuarios/ ?????
  }

  existeEmail(email : string) :  Observable<any>{
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/verificar-email?email=${email}`)
  }

  // existeEmail() {
  //   this.usuarioService.existeEmail(email).subscribe(
  //     (response) => {
  //       // Manejar la respuesta del servidor aquí
  //       console.log(response.respuesta); // true o false
  //       console.log(response.msg); // Mensaje informativo
  //     },
  //     (error) => {
  //       // Manejar errores
  //     }
  //   );
  // }

  registrarUsuario(user : User) : Observable<any>{
    const body = {
      "email" : user.email,
      "nombre" : user.fullName,
      "clave" : user.password
    }
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}/registrar-usuario`,body);
  }

   // registrarUsuario() {
  //   this.usuarioService.registrarUsuario(email,nombre,clave).subscribe(
  //     (response) => {
  //       // Manejar la respuesta del servidor aquí
  //       console.log(response.msg); //mensaje informativo registro exitoso
  //     },
  //     (error) => {
  //       // Manejar errores
  //     }
  //   );
  // }

  login(email : string, clave : string) : Observable<any>{
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/login?email=${email}&clave=${clave}`)
  }

  // login() {
  //   this.usuarioService.login(email,clave).subscribe(
  //     (response) => {
  //       // Manejar la respuesta del servidor aquí
  //       console.log(response.respuesta); //id -> exito/ -1 -> clave incorrecta / 0 -> email no registrado
  //       console.log(response.msg); //mensaje informativo
  //     },
  //     (error) => {
  //       // Manejar errores
  //     }
  //   );
  // }

  obtenerUsuario(id : number) : Observable<any>{
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  // obtenerUsuario() {
  //   this.usuarioService.obtenerUsuario(id).subscribe(
  //     (response) => {
  //       // Manejar la respuesta del servidor aquí
  //       console.log(response.respuesta); //usuario -> exito / false -> id no existe /
  //       console.log(response.msg); //mensaje informativo
  //     },
  //     (error) => {
  //       // Manejar errores
  //     }
  //   );
  // }

  verificarClave(id: number,clave : string) : Observable<any>{
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/verificar-clave/${id}?=clave=${clave}`)
  }

  // verificarClave() {
  //   this.usuarioService.verificarClave(id,clave).subscribe(
  //     (response) => {
  //       // Manejar la respuesta del servidor aquí
  //       console.log(response.respuesta); //true -> clave coincide / false -> clave incorrecta
  //       console.log(response.msg); //mensaje informativo
  //     },
  //     (error) => {
  //       // Manejar errores
  //     }
  //   );
  // }

  modificarClave(clave : string , id : number): Observable<any> {
    //usar verificar clave antes de llamar
    return this.http.put<any>(`${this.myAppUrl}${this.myApiUrl}/modificar-clave/${id}`, clave)
  }

  modificarEmail(email : string , id : number): Observable<any> {
    //usar verificar clave antes de llamar
    return this.http.put<any>(`${this.myAppUrl}${this.myApiUrl}/modificar-email/${id}`, email)
  }

  modificarNombre(nombre : string , id : number): Observable<any> {
    //usar verificar clave antes de llamar
    return this.http.put<any>(`${this.myAppUrl}${this.myApiUrl}/modificar-nombre/${id}`, nombre)
  }
}
