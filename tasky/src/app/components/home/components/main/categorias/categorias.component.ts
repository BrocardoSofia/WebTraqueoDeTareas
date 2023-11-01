import { Component } from '@angular/core';
import { Categoria } from './Categoria';
import { CategoriasService } from 'src/app/services/categorias.service';
import { FormGroup,FormControl,Validators, ValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent {

  //VALIDACION AL AGREGAR UNA NUEVA CATEGORIA
  nuevaCategoriaForm = new FormGroup({
    nombre : new FormControl('',[Validators.maxLength(20)])
  })

  get nombre(){
    return this.nuevaCategoriaForm.get('nombre')
  }

  //CRUD CATEGORIAS
  catObj : Categoria = new Categoria();
  catArr : Categoria[] = [];
  newCat : string = '';
  editar : string = '';

  constructor(private categoriasService : CategoriasService){}

  ngOnInit() : void{
    this.editar = '',
    this.newCat = '',
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

  agregarCategoria(){

    let flag = 0;

    //VALIDACION DE QUE NO EXISTA LA CATEGORIA
    //habria que validar si esta vacio?
    this.catArr.forEach( c => {
      if(c.nombre.toUpperCase() == this.newCat.toUpperCase()){
          flag = 1;
      }
    } )

    if(!flag){
      this.catObj.nombre = this.newCat;

      this.categoriasService.agregarCategoria(this.catObj).subscribe(res =>{
        this.ngOnInit();
        this.newCat = '';
      },e => {
        alert(e);
      })
    }else {
      alert('Esa categoria ya existe');
    }
  }

  editarCategoria(){
    this.catObj.nombre = this.editar;
    this.categoriasService.editarCategoria(this.catObj).subscribe(res => {
      this.ngOnInit();
    }, e => {
      alert("Ha ocurrido un error al intentar editar la categoria");
    })
  }

  borrarCategoria(c : Categoria){
    this.categoriasService.borrarCategoria(c).subscribe(res =>  {
        this.ngOnInit();
    }, e => {
      alert("Ha ocurrido un error al intentar borrar la categoria");
    });
  }

  call(c : Categoria){
    this.catObj = c;
    this.editar = c.nombre;
  }
}
