import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../components/home/components/main/categorias/Categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  serviceURL : string;

  constructor(private http : HttpClient) {
    this.serviceURL = "http://localhost:3000/categorias"
  }

  agregarCategoria(categoria : Categoria) : Observable<Categoria>{
    return this.http.post<Categoria>(this.serviceURL,categoria)
  }

  getCategorias() : Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.serviceURL)
  }

  borrarCategoria(categoria : Categoria) : Observable<Categoria>{
    return this.http.delete<Categoria>(this.serviceURL+'/'+categoria.id)
  }

  editarCategoria(categoria : Categoria) : Observable<Categoria>{
    return this.http.put<Categoria>(this.serviceURL+'/'+categoria.id,categoria)
  }
}
