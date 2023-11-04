import { Component } from '@angular/core';
import { Tarea } from './Tarea';
import { TareasService } from 'src/app/services/tareas.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent {

  arrTareas : Tarea[] = []
  nuevaTarea : string = ""
  tareaObj : Tarea = new Tarea()

  constructor(private tareasService:TareasService){}

  getTareas(){
    this.tareasService.getTareas().subscribe(
      (res) => {
        this.arrTareas = res;
      },
      (e) => {
        alert('error al cargar las tareas')
      }
    )
  }

  agregarTarea(){
    this.tareaObj.nombre = this.nuevaTarea;
    this.tareasService.agregarTarea(this.tareaObj).subscribe(
      (res) => {
        this.ngOnInit();
        this.nuevaTarea = '';
      },
      (e) => {
        alert('error al intentar agregar una tarea')
      }
    )
  }

  ngOnInit() :void{

    this.arrTareas = []
    this.nuevaTarea = ""
    this.tareaObj = new Tarea()

  }

}
