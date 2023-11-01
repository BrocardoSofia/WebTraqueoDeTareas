import { Component } from '@angular/core';
import { Categoria } from './Categoria';
import { CategoriasService } from 'src/app/services/categorias.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { OnInit, Input } from '@angular/core';
import { email } from '../../../../login/login.component';
import { LoginComponent } from 'src/app/components/login/login.component';

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
  catObj: Categoria = new Categoria();
  catArr: Categoria[] = [];
  newCat: string = '';
  editar: string = '';
  @Input()
  email : string = '';

  constructor(private categoriasService: CategoriasService, private authService: AuthService) {}

  ngOnInit(): void {
    (this.editar = ''), (this.newCat = ''), (this.catObj = new Categoria());
    this.catArr = [];
    this.getCategorias();
  }

  getCategorias() {

    this.categoriasService.getCategorias().subscribe(
      (res) => {
        this.catArr = res;
      },
      (e) => {
        alert('No es posible cargar las categorias');
      }
    );
  }

  agregarCategoria() {
    if (this.existe(this.newCat)) {
      alert('Esa categoria ya existe');
    } else {
      this.catObj.nombre = this.newCat;
      this.categoriasService.agregarCategoria(this.catObj).subscribe(
        (res) => {
          this.ngOnInit();
          this.newCat = '';
        },
        (e) => {
          alert(e);
        }
      );
    }
  }

  editarCategoria() {
    if (this.existe(this.editar)) {
      alert('Esa catgoria ya existe');
    } else {
      this.catObj.nombre = this.editar;
      this.categoriasService.editarCategoria(this.catObj).subscribe(
        (res) => {
          this.ngOnInit();
        },
        (e) => {
          alert('Ha ocurrido un error al intentar editar la categoria');
        }
      );
    }
  }

  borrarCategoria(c: Categoria) {
    this.categoriasService.borrarCategoria(c).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (e) => {
        alert('Ha ocurrido un error al intentar borrar la categoria');
      }
    );
  }

  call(c: Categoria) {
    this.catObj = c;
    this.editar = c.nombre;
  }

  //VALIDACION DE QUE NO EXISTA LA CATEGORIA
  existe(nombreCat: string): boolean {
    let flag: boolean = false;

    this.catArr.forEach((c) => {
      if (c.nombre.toUpperCase() == nombreCat.toUpperCase()) {
        flag = true;
      }
    });

    return flag;
  }
}
