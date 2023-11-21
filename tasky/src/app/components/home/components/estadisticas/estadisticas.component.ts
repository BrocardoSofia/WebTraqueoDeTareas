import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { TareaService } from 'src/app/services/tarea.service';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent {

  data: any;
  options: any;

  arrNombresCategorias: string[] = []
  arrIdsCategorias: number[] = []
  arrTiemposCategorias: number[] = []

  suma: number = 0

  //ID USUARIO DEL LOCAL STORAGE
  idUsuarioString = localStorage.getItem('id_usuario');
  idUsuarioNumber = parseInt(this.idUsuarioString!, 10);

  constructor(
    private categoriaService: CategoriaService,
    private tareaService: TareaService,
    private messageService: MessageService) { }

  obtenerNombresCategorias() {
    this.categoriaService.obtenerCategorias(this.idUsuarioNumber).subscribe(
      (res) => {
        if (res && res.length != 0) {
          res.forEach(r => {
            this.arrNombresCategorias.push(r.nombre)
            this.arrIdsCategorias.push(r.id_categoria)
          })
          this.obtenerTiempoCategorias();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No hay estadisticas para mostrar' });
        }
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error al cargar estadisticas' });
      }
    );
  }

  obtenerTiempoCategorias() {
    const observables = this.arrIdsCategorias.map(a =>
      this.tareaService.tiempoDeCategoria(a)
    );

    forkJoin(observables).subscribe(
      (responses: any[]) => {
        responses.forEach(res => {
          this.arrTiemposCategorias.push(parseInt(res));
        });

        for (let i = 0; i < this.arrTiemposCategorias.length; i++) {
          this.suma += this.arrTiemposCategorias[i];
        }

        //recorer el arreglo con un for comun
        //si la suma nos da 0
        //sacamos del arreglo de nombres el elemento almacenado en el indice que estamos parados
        //no incluimos la suma en el arreglo de suma de tiempos

        this.data = {
          labels: this.arrNombresCategorias,
          datasets: [
            {
              data: this.arrTiemposCategorias,
            },
          ],
        };
      },
      (error) => {
        console.error('Error al obtener tiempos de categorías:', error);
      }
    );
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.arrNombresCategorias = []
    this.arrIdsCategorias = []
    this.arrTiemposCategorias = []

    this.obtenerNombresCategorias();

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    }
  }
}

