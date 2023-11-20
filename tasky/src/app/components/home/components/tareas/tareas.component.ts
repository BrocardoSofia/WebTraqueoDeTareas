import { Component } from '@angular/core';
import { Tarea } from './Tarea';
import { TareaService } from 'src/app/services/tarea.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent {
  constructor(private tareaService: TareaService) { }

  //CRUD
  arrTareas: Tarea[] = [];
  arrTareasInverso: Tarea[] = [];
  arrNombres: string[] = [];
  tareaObj: Tarea = new Tarea();
  tareaSeleccionada: string = ''

  //TIMER
  startTimer: any;
  corriendo: boolean = false;
  pausado: boolean = false;
  terminado: boolean = false;
  hr: any = '0' + 0;
  min: any = '0' + 0;
  seg: any = '0' + 0;

  //MENSAJE
  advertencia: Message[] = [];
  advertir: boolean = false;
  mensaje: string = 'ha ocurrido un error inesperado'

  obtenerTareas() {
    let id_categoria = 34
    this.tareaService.obtenerTareas(id_categoria).subscribe(
      (res) => {
        this.arrTareas = res;
        this.arrTareasInverso = this.arrTareas.reverse()
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

  validarNombre() {
    const regex = /^(\s+\S+\s*)*(?!\s).*$/;
    return (this.tareaSeleccionada.length == 0 || !regex.test(this.tareaSeleccionada)) ? true : false
  }

  obtenerFechaHoy(): string {
    const hoy: Date = new Date();

    const day: number = hoy.getDate();
    const month: number = hoy.getMonth() + 1;
    const year: number = hoy.getFullYear();

    const formattedDay: string = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;

    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  guardarTarea() {

    this.tareaObj.id_categoria = 34
    this.tareaObj.nombre = this.tareaSeleccionada;
    this.tareaObj.tiempo = this.hr + this.min + this.seg
    this.tareaObj.fecha = this.obtenerFechaHoy()

    this.tareaService.guardarTarea(this.tareaObj).subscribe(
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
      if (c.nombre.toUpperCase() == nombreTarea.toUpperCase() && c.id_categoria != this.tareaObj.id_categoria) {
        flag = true;
      }
    })

    return flag;
  }

  vacio(nombreCat: string): boolean {

    const regex = /^(\s+\S+\s*)*(?!\s).*$/;

    return (regex.test(nombreCat)) ? false : true;
  }

  convertirNumeroAHora(numero: number): string {
    const horas: number = Math.floor(numero / 10000);
    const minutos: number = Math.floor((numero % 10000) / 100);
    const segundos: number = numero % 100;

    const horaFormateada: string = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    return horaFormateada;
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
          this.seg++;
          this.seg = this.seg < 10 ? '0' + this.seg : this.seg;

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
      }, 1000)
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
    this.guardarTarea();
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

    this.obtenerTareas();
    this.cargarMensaje();
  }
}
