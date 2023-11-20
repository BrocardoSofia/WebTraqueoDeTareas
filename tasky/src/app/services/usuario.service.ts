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

  registrarUsuario(user : User) : Observable<any>{
    const body = {
      "email" : user.email,
      "nombre" : user.fullName,
      "clave" : user.password
    }
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}/registrar-usuario`,body);
  }

  login(email : string, clave : string) : Observable<any>{
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/login?email=${email}&clave=${clave}`)
  }

  obtenerUsuario(id : number) : Observable<any>{
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  verificarClave(id: number,clave : string) : Observable<any>{
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/verificar-clave/${id}?=clave=${clave}`)
  }

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
