import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Temporizador } from '../interfaces/Temporizador';

@Injectable({
  providedIn: 'root'
})
export class TemporizadorService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = enviroment.endpoint;
    this.myApiUrl = 'api/temporizadores';
  }

  guardarTemporizador(temporizador: Temporizador): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, temporizador)
  }

  modificarTemporizador(temporizador: Temporizador): Observable<any> {
    return this.http.put<any>(`${this.myAppUrl}${this.myApiUrl}/${temporizador.id_usuario}`, temporizador)
  }

  obtenerTemporizador(id_usuario: number): Observable<Temporizador[]> {
    return this.http.get<Temporizador[]>(`${this.myAppUrl}${this.myApiUrl}?id_usuario=${id_usuario}`)
  }
}
