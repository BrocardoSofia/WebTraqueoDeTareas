import { Component } from '@angular/core';
import { Categoria } from './Categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent {

  //VALIDACION REACTIVA AL AGREGAR UNA NUEVA CATEGORIA
  nuevaCategoriaForm = new FormGroup({
    nombre: new FormControl('', [Validators.maxLength(20)]),
  });

  get nombre() {
    return this.nuevaCategoriaForm.get('nombre');
  }

  //CRUD CATEGORIAS
  objCategoria: Categoria = new Categoria();
  listCategorias: Categoria[] = [];
  newCat: string = '';
  editar: string = '';

  //mensaje de advertencia
  advertencia: Message[] = [];
  mensaje: string = '';
  advertir: boolean = false;

  showModalEditar:boolean = false;
  showModalBorrar:boolean = false;

  constructor(private _categoriaService : CategoriaService) { }

  getListaCategorias(){
    this._categoriaService.getCategorias().subscribe(
      (data) => {
      this.listCategorias = data;
      },
      (error) => {
        this.updateMensajeAdvertencia('No es posible cargar las categorias')
        this.advertir = true;
      }
    );
  }

  // agregarCategoria() {
  //   if (this.existe(this.newCat)) {
  //     this.updateMensajeAdvertencia('Esa categoria ya existe')
  //     this.advertir = true;
  //   } else if (this.vacio(this.newCat) || this.newCat.length == 0) {
  //     this.updateMensajeAdvertencia('Nombre de categoria no valido')
  //     this.advertir = true;
  //   } else {
  //     this.objCategoria.nombre = this.newCat;
  //     this.categoriasService.agregarCategoria(this.objCategoria).subscribe(
  //       (res) => {
  //         this.advertir = false;
  //         this.ngOnInit();
  //         this.newCat = '';
  //       },
  //       (e) => {
  //         this.updateMensajeAdvertencia('Ha ocurrido un error al intentar agregar la categoria')
  //         this.advertir = true;
  //       }
  //     );
  //   }
  // }

  // editarCategoria() {
  //   this.showModalEditar = false;

  //   if (this.existe(this.editar)) {
  //     this.updateMensajeAdvertencia('Esa categoria ya existe')
  //     this.advertir = true;
  //   } else if (this.vacio(this.editar) || this.editar.length == 0) {
  //     this.updateMensajeAdvertencia('Nombre de categoria no valido')
  //     this.advertir = true;
  //   } else {
  //     this.objCategoria.nombre = this.editar;
  //     this.categoriasService.editarCategoria(this.objCategoria).subscribe(
  //       (res) => {
  //         this.advertir = false;
  //         this.ngOnInit();
  //       },
  //       (e) => {
  //         this.updateMensajeAdvertencia('Ha ocurrido un error al intentar editar la categoria')
  //         this.advertir = true;
  //       }
  //     );
  //   }
  // }

  // borrarCategoria() {
  //   this.categoriasService.borrarCategoria(this.objCategoria).subscribe(
  //     (res) => {
  //       this.advertir = false;
  //       this.ngOnInit();
  //     },
  //     (e) => {
  //       this.updateMensajeAdvertencia('Ha ocurrido un error al intentar borrar la categoria')
  //       this.advertir = true;
  //     }
  //   );
  // }

  // callEditarCategoria(c: Categoria) {
  //   this.objCategoria = c;
  //   this.editar = c.nombre;
  //   this.showModalEditar = true;
  // }

  // callBorrarCategoria(c: Categoria){
  //   this.objCategoria = c;
  //   this.showModalBorrar = true;
  // }

  // //VALIDACION DE QUE NO EXISTA LA CATEGORIA
  // existe(nombreCat: string): boolean {
  //   let flag = false;

  //   this.listCategorias.forEach((c) => {
  //     if (c.nombre.toUpperCase() == nombreCat.toUpperCase() && c.id != this.objCategoria.id) {
  //       flag = true;
  //     }
  //   });

  //   return flag;
  // }

  // //VALIDACION DE ESPACIOS EN BLANCO
  // vacio(nombreCat: string): boolean {

  //   const regex = /^(\s+\S+\s*)*(?!\s).*$/;

  //   return (regex.test(nombreCat)) ? false : true;
  // }

  // ngOnInit(): void {
  //   this.editar = '';
  //   this.newCat = '';
  //   this.objCategoria = new Categoria();
  //   this.listCategorias = [];
  //   this.getCategorias();
  //   this.showModalBorrar = false;
  //   this.showModalEditar = false;


  //   this.advertencia = [
  //     {
  //       severity: 'error',
  //       summary: 'Error',
  //       detail: this.mensaje,
  //     },
  //   ];
  // }

  //UPDATE DEL MENSAJE DE ALERT
  updateMensajeAdvertencia(m: string) {
    this.advertencia = [
      {
        severity: 'error',
        summary: 'Error',
        detail: m,
      },
    ];
  }
}
