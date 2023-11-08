import { Component } from '@angular/core';
import { Tarea } from './Tarea';
import { TareasService } from 'src/app/services/tareas.service';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent {
  constructor(private tareasService: TareasService) {}

  arrTareas: Tarea[] = [];
  arrNombres: string[] = [];
  tareaObj: Tarea = new Tarea();
  tareaSeleccionada: string = ''

  suscription : Subscription = new Subscription();

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

  agregarTarea() {
    this.tareaObj.nombre = this.tareaSeleccionada;
    this.tareasService.agregarTarea(this.tareaObj).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (e) => {
        alert('error al intentar agregar una tarea');
      }
    )
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
    this.agregarTarea();
  }

  ngOnInit(): void {

    this.arrTareas = [];
    this.arrNombres = [];
    this.tareaObj = new Tarea();
    this.tareaSeleccionada = "";
    this.advertir = false;
    this.corriendo = false;

    this.hr = '0' + 0;
    this.min = '0' + 0;
    this.seg = '0' + 0;
    this.ms = '0' + 0;

    this.getTareas();
    this.cargarMensaje();

    this.suscription = this.tareasService.refresh$.subscribe( () => {
      this.getTareas()
    })
  }
}
