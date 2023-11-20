import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent {
  //categorias
  categorias: any;
  options: any;

  arrNombresCategorias: string[] = []
  arrIdsCategorias: number[] = []
  arrTiemposCategorias: number[] = []

  //tareas
  tareas : any
  options2: any;

  arrNombresTareas : string [] = []
  arrTiemposTareas: number[] = []
  selectedCity: string | undefined;

  //ID USUARIO DEL LOCAL STORAGE
  idUsuarioString = localStorage.getItem('id_usuario');
  idUsuarioNumber = parseInt(this.idUsuarioString!, 10);

  constructor(private categoriaService: CategoriaService, private tareaService: TareaService) { }

  obtenerNombresCategorias() {
    this.categoriaService.obtenerCategorias(this.idUsuarioNumber).subscribe(
      (res) => {
        if (res.length != 0) {
          res.forEach(r => {
            this.arrNombresCategorias.push(r.nombre)
            this.arrIdsCategorias.push(r.id_categoria)
          })
          this.obtenerTiempoCategorias()
        }
      }
    );
  }

  obtenerTiempoCategorias() {
    this.arrIdsCategorias.forEach(a => {
      this.tareaService.tiempoDeCategoria(a).subscribe(
        (res) => {
          this.arrTiemposCategorias.push(res)
        }
      )
    })
  }

  obtenerNombresTareas() {
    this.tareaService.obtenerNombresTareas(this.idUsuarioNumber).subscribe(
      (res) => {
        if (res.length != 0) {
          res.forEach(r => {
            this.arrNombresTareas.push(r)
          })
        }
      }
    );
  }

  ngOnInit() {

    //CATEGORIAS
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.obtenerNombresCategorias();

    this.categorias = {
      labels: this.arrNombresCategorias,
      datasets: [
        {
          data: [1],
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };
    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };

    this.tareas = {
      labels: this.arrNombresTareas,
      datasets: [
        {
          data: [1],
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };
    this.options2 = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }
}
