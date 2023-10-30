import { Component } from '@angular/core';
import { Categoria } from './Categoria';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent {

  catObj : Categoria = new Categoria();

  catArr : Categoria[] = [];

  newCat : string = '';

  constructor(private categoriasService : CategoriasService){}

  ngOnInit() : void{
    this.catObj = new Categoria();
    this.catArr = [];
    this.getCategorias();
  }

  getCategorias(){
    this.categoriasService.getCategorias().subscribe(res => {
      this.catArr = res;
    }, e => {
      alert("No es posible cargar las categorias");
    })
  }

  agregarCat(){
    this.catObj.nombre = this.newCat;
    this.categoriasService.agregarCategoria(this.catObj).subscribe(res =>{
      this.ngOnInit();
      this.newCat = '';
    },e => {
      alert(e);
    })
  }

  editarCategoria(){
    this.categoriasService.editarCategoria(this.catObj).subscribe(res => {
      this.ngOnInit();
    }, e => {
      alert("Ha ocurrido un error al intentar editar la categoria");
    })
  }

  borrarCategoria(c : Categoria){
    this.categoriasService.borrarCategoria(c).subscribe(res =>  {

    }, e => {
      alert("Ha ocurrido un error al intentar borrar la categoria");
    })
  }
}
