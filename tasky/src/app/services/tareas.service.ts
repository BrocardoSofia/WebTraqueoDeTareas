import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../components/home/components/tareas/Tarea';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  serviceURL : string;

  constructor(private http : HttpClient) {
    this.serviceURL = "http://localhost:4000/categorias"
  }

  agregarTarea(tarea : Tarea) : Observable<Tarea>{
    return this.http.post<Tarea>(this.serviceURL,tarea)
  }

  getTareas() : Observable<Tarea[]>{
    return this.http.get<Tarea[]>(this.serviceURL)
  }

  borrarTareas(tarea : Tarea) : Observable<Tarea>{
    return this.http.delete<Tarea>(this.serviceURL+'/'+tarea.id)
  }
}
