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
  objCategoriaModificada: Categoria = new Categoria()
  nuevoNombre: string = ''

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

  limpiarEspacios(cadena: string): string {
    // Elimina espacios en blanco al principio y final de la cadena
    let cadenaLimpia = cadena.trim();
    // Reduce múltiples espacios en blanco entre palabras a solo uno
    cadenaLimpia = cadenaLimpia.replace(/\s+/g, ' ');
    return cadenaLimpia;
  }

  agregarCategoria() {

    //si es un nombre invalido
    if (this.vacio(this.objCategoria.nombre)) {
      this.updateMensajeAdvertencia('Nombre de categoria no valido')
      this.advertir = true;

      //si el nombre el valido
    } else {
      this.advertir = false

      //asignacion de id y limpieza de nombre
      this.objCategoria.id_usuario = 1;//ID HARCODEADO
      this.objCategoria.nombre = this.limpiarEspacios(this.objCategoria.nombre)

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

  callEditarCategoria(categoria: number) {
    // this.objCategoriaModificada = categoria;
    // this.nuevoNombre = categoria.nombre;
    // this.showModalEditar = true;

    alert(categoria)
  }

  modificarCategoria() {

    //si el nombre es invalido o no hubo modificaciones
    if (this.vacio(this.nuevoNombre) || this.nuevoNombre.length == 0 || this.nuevoNombre == this.objCategoriaModificada.nombre) {
      this.showModalEditar = false;

      //si el nombre es valido
    } else {

      //asignacion y limpieza de nombre
      this.objCategoria.nombre = this.limpiarEspacios(this.nuevoNombre);

      this.categoriaService.existeCategoria(this.objCategoria).subscribe(
        (res) => {
          //no existe una categoria con ese nombre
          if (res.respuesta == false) {

            //se realiza la modificacion
            this.categoriaService.modificarCategoria(this.objCategoria).subscribe(
              (res) => {
                this.ngOnInit();
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

  //CRUD CATEGORIAS
  catObj: Categoria = new Categoria();
  catArr: Categoria[] = [];
  newCat: string = '';
  editar: string = '';

  //mensaje de advertencia
  advertencia: Message[] = [];
  mensaje: string = '';
  advertir: boolean = false;

  showModalEditar: boolean = false;
  showModalBorrar: boolean = false;

  //VALIDACION REACTIVA AL AGREGAR UNA NUEVA CATEGORIA
  nuevaCategoriaForm = new FormGroup({
    nombre: new FormControl('', [Validators.maxLength(20)]),
  });

  get nombre() {
    return this.nuevaCategoriaForm.get('nombre');
  }

  constructor(private categoriasService: CategoriasService, private categoriaService: CategoriaService) { }

  // getCategorias() {
  //   this.categoriasService.getCategorias().subscribe(
  //     (res) => {
  //       this.catArr = res;
  //     },
  //     (e) => {
  //       this.updateMensajeAdvertencia('No es posible cargar las categorias')
  //       this.advertir = true;
  //     }
  //   );
  // }

  // agregarCategoria() {
  //   if (this.existe(this.newCat)) {
  //     this.updateMensajeAdvertencia('Esa categoria ya existe')
  //     this.advertir = true;
  //   } else if (this.vacio(this.newCat) || this.newCat.length == 0) {
  //     this.updateMensajeAdvertencia('Nombre de categoria no valido')
  //     this.advertir = true;
  //   } else {
  //     this.catObj.nombre = this.newCat;
  //     this.categoriasService.agregarCategoria(this.catObj).subscribe(
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
  //     this.catObj.nombre = this.editar;
  //     this.categoriasService.editarCategoria(this.catObj).subscribe(
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

  borrarCategoria() {
    this.categoriasService.borrarCategoria(this.catObj).subscribe(
      (res) => {
        this.advertir = false;
        this.ngOnInit();
      },
      (e) => {
        this.updateMensajeAdvertencia('Ha ocurrido un error al intentar borrar la categoria')
        this.advertir = true;
      }
    );
  }

  callBorrarCategoria(c: Categoria) {
    this.catObj = c;
    this.showModalBorrar = true;
  }

  //VALIDACION DE ESPACIOS EN BLANCO
  vacio(c: string): boolean {
    const regex = /^\s*$/;
    return (regex.test(c)) ? true : false;
  }

  ngOnInit(): void {
    // this.editar = '';
    // this.newCat = '';
    // this.catObj = new Categoria();
    // this.catArr = [];
    // this.getCategorias();
    // this.showModalBorrar = false;
    // this.showModalEditar = false;


    // this.advertencia = [
    //   {
    //     severity: 'error',
    //     summary: 'Error',
    //     detail: this.mensaje,
    //   },
    // ];

    //vacio variables
    this.listaCategorias = []
    this.objCategoria = new Categoria()
    this.objCategoriaModificada = new Categoria()
    this.nuevoNombre = ''

    //reseteo booleanos
    this.showModalEditar = false;

    //cargo las categorias
    this.obtenerCategorias();
  }

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
