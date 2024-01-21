import { Component, OnInit } from '@angular/core';
import { Categoria } from './Categoria';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Message } from 'primeng/api';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MessageService } from 'primeng/api';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit{

  //ID USUARIO DEL LOCAL STORAGE
  idUsuarioString = localStorage.getItem('id_usuario');
  idUsuarioNumber = parseInt(this.idUsuarioString!, 10);

  //CRUD CATEGORIAS
  listaCategorias: Categoria[] = []
  objCategoria: Categoria = new Categoria()
  nuevo: string = ''
  editado: string = ''

  //ADVERTENCIA
  advertencia: Message[] = [];
  mensaje: string = '';
  advertir: boolean = false;

  //MODALES
  showModalEditar: boolean = false;
  showModalBorrar: boolean = false;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private msgService : MessageService,
    private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    //vacio variables
    this.listaCategorias = []
    this.objCategoria = new Categoria()
    this.nuevo = ''
    this.editado = ''

    //cargo las categorias
    this.obtenerCategorias();

    this.viewportScroller.scrollToPosition([0, 0]);
  }

  obtenerCategorias() {

    this.categoriaService.obtenerCategorias(this.idUsuarioNumber).subscribe(
      (res) => {
        if (res.length != 0) {
          this.listaCategorias = res;
        }
      },
      (e) => {
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar las categorias' });
      }
    );
  }

  agregarCategoria() {

    //si es un nombre invalido
    if (this.vacio(this.nuevo)) {
      this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Nombre de categoria no valido' });

      //si el nombre el valido
    } else {

      //asignacion de id y limpieza de nombre
      this.objCategoria.id_usuario = this.idUsuarioNumber;
      this.objCategoria.nombre = this.limpiarEspacios(this.nuevo).toLowerCase()

      this.categoriaService.existeCategoria(this.objCategoria).subscribe(
        (res) => {

          //no existe una categoria con ese nombre
          if (res.respuesta == false) {

            //realizo la carga de la categoria a la base de datos
            this.categoriaService.agregarCategoria(this.objCategoria).subscribe(

              //carga exitosa
              (resp) => {
                this.ngOnInit();
              },

              //error en la carga
              (e) => {
                this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Error al agregar categoria' });
              }
            );

            //existe una tarea con ese nombre
          } else {
            this.msgService.add({ severity: 'warn', summary: 'Warning', detail: 'Esa categoria ya existe' });
          }
        },
        (e) => {
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Error al agregar categoria' });
        }
      )
    }
  }

  callEditarCategoria(c: Categoria) {
    this.objCategoria = c;
    this.editado = c.nombre;
    this.showModalEditar = true;
  }

  modificarCategoria() {

    //si el nombre es invalido o no hubo modificaciones
    if (this.vacio(this.editado) || this.editado.length == 0 || this.editado == this.objCategoria.nombre) {
      this.showModalEditar = false;

      //si el nombre es valido
    } else {

      //asignacion y limpieza de nombre
      this.objCategoria.nombre = this.limpiarEspacios(this.editado).toLowerCase();

      this.categoriaService.existeCategoria(this.objCategoria).subscribe(
        (res) => {
          //no existe una categoria con ese nombre
          if (res.respuesta == false) {

            //se realiza la modificacion
            this.categoriaService.modificarCategoria(this.objCategoria).subscribe(
              (res) => {
                this.showModalEditar = false;
              },
              (e) => {
                this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Error al modificar la categoria' });
              }
            );
            //si existe una categoria con ese nombre
          } else {
            this.msgService.add({ severity: 'warn', summary: 'Warning', detail: 'Esa categoria ya existe' });
          }
        },
        (e) => {
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Error al modificar categoria' });
        }
      )
    }
  }

  callBorrarCategoria(c: Categoria) {
    this.objCategoria = c;
    this.showModalBorrar = true;
  }

  eliminarCategoria() {
    //llamar a verificar clave
    this.categoriaService.eliminarCategoria(this.objCategoria.id_categoria).subscribe(
      (res) => {
        this.showModalBorrar = false;
        this.ngOnInit();
      },
      (e) => {
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error al intentar borrar la categoria' });
      }
    );
  }

  vacio(c: string): boolean {
    const regex = /^\s*$/;
    return (regex.test(c)) ? true : false;
  }

  limpiarEspacios(cadena: string): string {
    // Elimina espacios en blanco al principio y final de la cadena
    let cadenaLimpia = cadena.trim();
    // Reduce múltiples espacios en blanco entre palabras a solo uno
    cadenaLimpia = cadenaLimpia.replace(/\s+/g, ' ');
    return cadenaLimpia;
  }

  updateMensajeAdvertencia(m: string) {
    this.advertencia = [
      {
        severity: 'error',
        summary: 'Error',
        detail: m,
      },
    ];
  }

  //VALIDACION REACTIVA AL AGREGAR UNA NUEVA CATEGORIA
  nuevaCategoriaForm = new FormGroup({
    nombre: new FormControl('', [Validators.maxLength(20)]),
  });

  get nombre() {
    return this.nuevaCategoriaForm.get('nombre');
  }

  redirigir(categoria : Categoria){
    localStorage.setItem('id_categoria',JSON.stringify(categoria.id_categoria))
    localStorage.setItem('nombre_categoria',JSON.stringify(categoria.nombre))
    this.router.navigate(['/home/categorias/tareas']);
  }


}
