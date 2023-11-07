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

  arrTareas: Tarea[] = [];
  arrNombres: string[] = [];
  nuevaTarea: string = "";
  tareaObj: Tarea = new Tarea();
  tareaSeleccionada: string = ''

  startTimer: any;
  corriendo: boolean = false;
  pausado: boolean = false;
  terminado: boolean = false;
  hr: any = '0' + 0;
  min: any = '0' + 0;
  seg: any = '0' + 0;
  ms: any = '0' + 0;

  advertencia: Message[] = [];
  advertir: boolean = false;
  mensaje: string = 'ha ocurrido un error inesperado'


  constructor(private tareasService: TareasService) { }

  getTareas() {
    this.tareasService.getTareas().subscribe(
      (res) => {
        this.arrTareas = res;
        res.forEach(r => {
          this.arrNombres.push(r.nombre)
        })
        this.limpiarArreglo();
      },
      (e) => {
        alert('error al cargar las tareas');
      }
    )
  }

  limpiarArreglo() {
    this.arrNombres = this.arrNombres.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    })
  }

  // agregarTarea() {

  //   if (this.existe(this.nuevaTarea)) {
  //     this.updateMensaje('Esa tarea ya existe');
  //     this.advertir = true;
  //   } else if (this.vacio(this.nuevaTarea) || this.nuevaTarea.length == 0) {
  //     this.updateMensaje('Nombre de tarea invalida');
  //     this.advertir = true;
  //   } else {
  //     this.tareaObj.nombre = this.nuevaTarea;
  //     this.tareasService.agregarTarea(this.tareaObj).subscribe(
  //       (res) => {
  //         // this.borrar()
  //         this.ngOnInit();
  //         this.nuevaTarea = '';
  //       },
  //       (e) => {
  //         alert('error al intentar agregar una tarea');
  //       }
  //     )
  //   }
  // }

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


  start() {
    if (!this.corriendo) {
      this.corriendo = true;
      this.startTimer = setInterval(() => {

        if (!this.pausado) {
          this.ms++;
          this.ms = this.ms < 10 ? '0' + this.ms : this.ms;

          if (this.ms === 100) {
            this.seg++;
            this.seg = this.seg < 10 ? '0' + this.seg : this.seg;
            this.ms = '0' + 0;
          }

          if (this.seg === 60) {
            this.min++;
            this.min = this.min < 10 ? '0' + this.min : this.min;
            this.seg = '0' + 0;
          }

          if (this.min === 60) {
            this.hr++;
            this.hr = this.hr < 10 ? '0' + this.hr : this.hr;
            this.min = '0' + 0;
          }
        }
      }, 10)
    }
  }

  reanudar() {
    this.pausado = false;
  }

  pause() {
    this.pausado = true;
  }

  stop() {
    clearInterval(this.startTimer)
    this.corriendo = false;
    this.ngOnInit()
  }

  ngOnInit(): void {

    this.arrTareas = [];
    this.arrNombres = [];
    this.tareaObj = new Tarea();
    this.nuevaTarea = "";
    this.advertir = false;
    this.corriendo = false;

    this.hr = '0' + 0;
    this.min = '0' + 0;
    this.seg = '0' + 0;
    this.ms = '0' + 0;

    this.getTareas();
    this.cargarMensaje();
  }
}
