import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../components/home/components/categorias/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = enviroment.endpoint;
    this.myApiUrl = 'api/categorias';
  }

  existeCategoria(categoria: Categoria): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/existe-categoria?id_usuario=${categoria.id_usuario}&nombre=${categoria.nombre}`)
  }

  agregarCategoria(categoria: Categoria): Observable<any> {
    //usar existe cateogria antes de llamar
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}/agregar-categoria`, categoria)
  }

  modificarCategoria(categoria: Categoria): Observable<any> {
    //usar existe cateogria antes de llamar
    return this.http.put<any>(`${this.myAppUrl}${this.myApiUrl}/modificar-categoria/${categoria.id}`, categoria)
  }

  obtenerCategorias(id_usuario: number): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.myAppUrl}${this.myApiUrl}?id_usuario=${id_usuario}`)
  }

  eliminarCategoria(id: number): Observable<any> {
    //usar verificar contrasenia de usuario antes de llamar
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }
}
