import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../components/home/components/categorias/Categoria';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private myAppUrl : string;
  private myApiUrl : string;

  constructor(private http : HttpClient) {
    this.myAppUrl = enviroment.endpoint;
    this.myApiUrl = 'api/categorias/';
  }

  getCategorias() : Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  borrarCategoria(id : number) : Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  agregarCategoria(categoria : Categoria) : Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, categoria)
  }

  getCategoria(id : number) : Observable<Categoria>{
    return this.http.get<Categoria>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  editarCategoria(id:number, categoria : Categoria) : Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}${id}`,categoria)
  }
}
