import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../components/home/components/categorias/Categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private myAppUrl : string;
  private myApiUrl : string;

  constructor(private http: HttpClient) {
    this.myAppUrl = enviroment.endpoint;
    this.myApiUrl = 'api/categorias/';
  }

  getCategorias() : Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  deleteCategoria(id : number) : Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  saveCategoria(categoria : Categoria) : Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, categoria)
  }
}
