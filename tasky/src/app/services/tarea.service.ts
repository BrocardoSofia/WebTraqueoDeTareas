import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../components/home/components/tareas/Tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = enviroment.endpoint;
    this.myApiUrl = 'api/tareas';
  }

  guardarTarea(tarea: Tarea): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, tarea)
  }

  obtenerTareas(id_categoria: number): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.myAppUrl}${this.myApiUrl}?id_categoria=${id_categoria}`)
  }

  obtenerNombresTareas(id_categoria: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl}/nombres?id_categoria=${id_categoria}`)
  }

  tiempoDeCategoria(id_categoria: number): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/tiempo-categoria?id_categoria=${id_categoria}`)
  }

  tiempoDeTarea(nombre: string): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/tiempo-tarea?nombre=${nombre}`)
  }
}
