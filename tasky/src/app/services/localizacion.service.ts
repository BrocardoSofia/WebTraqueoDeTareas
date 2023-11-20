import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Localizacion } from '../interfaces/Localizacion';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = enviroment.endpoint;
    this.myApiUrl = 'api/localizacion';
  }

  guardarLocalizacion(localizacion: Localizacion): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, localizacion)
  }

  modificarLocalizacion(localizacion: Localizacion): Observable<any> {
    return this.http.put<any>(`${this.myAppUrl}${this.myApiUrl}/modificar-categoria/${localizacion.id_usuario}`, localizacion)
  }

  eliminarLocalizacion(id_usuario: number) : Observable<any>{
    return this.http.delete<any>(`${this.myAppUrl}${this.myApiUrl}?id_usuario=${id_usuario}`)
  }
}
