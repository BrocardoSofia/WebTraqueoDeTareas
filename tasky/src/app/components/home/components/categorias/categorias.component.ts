import { Component } from '@angular/core';
import { Categoria } from './Categoria';
import { CategoriasService } from 'src/app/services/categorias.service';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Message } from 'primeng/api';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent {

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

  obtenerCategorias() {
    this.categoriaService.obtenerCategorias(1).subscribe( //ID INCRUSTADO
      (res) => {
        if (res.length == 0) {
          this.updateMensajeAdvertencia('No hay categorias cargadas')
          this.advertir = true;
        } else {
          this.listaCategorias = res;
        }
      },
      (e) => {
        this.updateMensajeAdvertencia('Error al cargar las categorias')
        this.advertir = true;
      }
    );
  }

  agregarCategoria() {

    //si es un nombre invalido
    if (this.vacio(this.nuevo)) {
      this.updateMensajeAdvertencia('Nombre de categoria no valido')
      this.advertir = true;

      //si el nombre el valido
    } else {
      this.advertir = false

      //asignacion de id y limpieza de nombre
      this.objCategoria.id_usuario = 1;//ID HARCODEADO
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
                this.updateMensajeAdvertencia('Error al agregar categoria')
                this.advertir = true;
              }
            );

            //existe una tarea con ese nombre
          } else {
            this.updateMensajeAdvertencia('Esa categoria ya existe')
            this.advertir = true;
          }
        },
        (e) => {
          this.updateMensajeAdvertencia('Error al agregar categoria')
          this.advertir = true;
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
                this.updateMensajeAdvertencia('Error al modificar la categoria')
                this.advertir = true;
              }
            );
            //si existe una categoria con ese nombre
          } else {
            this.updateMensajeAdvertencia('Esa categoria ya existe')
            this.advertir = true;
          }
        },
        (e) => {
          this.updateMensajeAdvertencia('Error al modificar categoria')
          this.advertir = true;
        }
      )
    }
  }

  callBorrarCategoria(c: Categoria) {
    this.objCategoria = c;
    this.showModalBorrar = true;
  }

  eliminarCategoria() {
    this.categoriaService.eliminarCategoria(this.objCategoria.id_categoria).subscribe(
      (res) => {
        this.showModalBorrar = false;
        this.ngOnInit();
      },
      (e) => {
        this.updateMensajeAdvertencia('Ha ocurrido un error al intentar borrar la categoria')
        this.advertir = true;
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

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    //vacio variables
    this.listaCategorias = []
    this.objCategoria = new Categoria()
    this.nuevo = ''
    this.editado = ''

    //cargo las categorias
    this.obtenerCategorias();
  }
}
