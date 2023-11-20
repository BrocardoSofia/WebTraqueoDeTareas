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
    this.myApiUrl = 'api/categorias';
  }

  guardarTarea(tarea: Tarea): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, tarea)
  }

  obtenerTareas(id_categoria: number): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.myAppUrl}${this.myApiUrl}?id_usuario=${id_categoria}`)
  }

  obtenerNombresTareas(id_categoria: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.myAppUrl}${this.myApiUrl}/nombres?id_usuario=${id_categoria}`)
  }
}
