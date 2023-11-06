import { Component } from '@angular/core';
import { Tarea } from './Tarea';
import { TareasService } from 'src/app/services/tareas.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent {

  arrTareas: Tarea[] = []
  nuevaTarea: string = ""
  tareaObj: Tarea = new Tarea()

  advertencia: Message[] = [];
  advertir: boolean = false;
  mensaje: string = 'ha ocurrido un error inesperado'

  constructor(private tareasService: TareasService) { }

  getTareas() {
    this.tareasService.getTareas().subscribe(
      (res) => {
        this.arrTareas = res;
      },
      (e) => {
        alert('error al cargar las tareas');
      }
    )
  }

  agregarTarea() {

    if (this.existe(this.nuevaTarea)) {
      this.updateMensaje('Esa tarea ya existe');
      this.advertir = true;
    } else if (this.vacio(this.nuevaTarea) || this.nuevaTarea.length == 0) {
      this.updateMensaje('Nombre de tarea invalida');
      this.advertir = true;
    } else {
      this.tareaObj.nombre = this.nuevaTarea;
      this.tareasService.agregarTarea(this.tareaObj).subscribe(
        (res) => {
          this.ngOnInit();
          this.nuevaTarea = '';
        },
        (e) => {
          alert('error al intentar agregar una tarea');
        }
      )
    }
  }

  refrescarTabla(){
    let cargar = '';

    for (let t of this.arrTareas){
      cargar+= `<tr><td>${t.nombre}</td><td>${t.tiempo}</td><td>${t.fecha}</td></tr>`
    }

    document.getElementById("tabla-tareas").innerHTML = cargar;
  }

  existe(nombreTarea: string): boolean {
    let flag = false;

    this.arrTareas.forEach(c => {
      if (c.nombre.toUpperCase() == nombreTarea.toUpperCase() && c.id != this.tareaObj.id) {
        flag = true;
      }
    })

    return flag;
  }

  vacio(nombreCat: string): boolean {

    const regex = /^(\s+\S+\s*)*(?!\s).*$/;

    return (regex.test(nombreCat)) ? false : true;
  }

  cargarMensaje() {
    this.advertencia = [
      { severity: 'error', summary: 'Error', detail: this.mensaje }
    ];
  }

  updateMensaje(m: string) {
    this.advertencia = [
      { severity: 'error', summary: 'Error', detail: m }
    ];
  }

  ngOnInit(): void {

    this.arrTareas = [];
    this.nuevaTarea = "";
    this.tareaObj = new Tarea();

    this.getTareas();
    this.cargarMensaje();
    this.refrescarTabla()
  }
}
