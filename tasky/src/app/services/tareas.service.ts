import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs';
import { Tarea } from '../components/home/components/tareas/Tarea';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  serviceURL : string;
  private _refresh$ = new Subject<void>()

  constructor(private http : HttpClient) {
    this.serviceURL = "http://localhost:5000/tareas"
  }

  get refresh$(){
    return this._refresh$;
  }

  agregarTarea(tarea : Tarea) : Observable<Tarea>{
    return this.http.post<Tarea>(this.serviceURL,tarea)
      .pipe(
        tap( () => {
          this.refresh$.next()
        } )
      )
  }

  getTareas() : Observable<Tarea[]>{
    return this.http.get<Tarea[]>(this.serviceURL)
  }
}
