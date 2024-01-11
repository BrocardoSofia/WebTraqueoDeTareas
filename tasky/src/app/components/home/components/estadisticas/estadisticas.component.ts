import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { TareaService } from 'src/app/services/tarea.service';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { Categoria } from '../categorias/Categoria';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})

export class EstadisticasComponent {

  //CATEGORIAS
  categorias: any;
  tareas: any;
  options: any;

  arrCategorias: Categoria[] = []
  arrNombresCategorias: string[] = []
  arrIdsCategorias: number[] = []
  arrTiemposCategorias: number[] = []
  suma: number = 0
  backgorundcolor: any[] = ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 200, 0.2)', 'rgba(50, 205, 50, 0.2)', 'rgba(128, 0, 128, 0.2)', 'rgba(0, 128, 128, 0.2)',]
  bordercolor: any[] = ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(255, 205, 86)', 'rgb(255, 99, 132)', 'rgb(255, 159, 200)', 'rgb(50, 205, 50)', 'rgb(128, 0, 128)', 'rgb(0, 128, 128)',]

  //TAREAS
  categoriaSeleccionada: string = '';
  arrNombresTareas: string[] = []
  arrIdsTareas: number[] = []
  arrTiemposTareas: number[] = []

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

            let cat: Categoria = new Categoria();

            cat.id_categoria = r.id_categoria;
            cat.nombre = r.nombre;

            this.arrCategorias.push(cat)
            this.arrNombresCategorias.push(cat.nombre)
          })

          this.obtenerTiempoCategorias();
        }
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error al cargar estadisticas' });
      }
    );
  }

  obtenerTiempoCategorias() {
    // Se crea un array de observables mediante la función map con los IDs de categorías
    const observables = this.arrCategorias.map(cat =>
      this.tareaService.tiempoDeCategoria(cat.id_categoria)
    );

    // Se utilizan los observables y se espera a que todos se completen usando forkJoin
    forkJoin(observables).subscribe(
      // Cuando todas las solicitudes se completan con éxito
      (responses) => {
        // Se itera sobre cada respuesta para convertirla a un número y agregarla a un array
        responses.forEach(res => {
          this.arrTiemposCategorias.push(parseInt(res))

        });

        // Se calcula la suma de los tiempos obtenidos
        for (let i = 0; i < this.arrTiemposCategorias.length; i++) {
          this.suma += this.arrTiemposCategorias[i];
        }

        // Se verifica si la suma es igual a 0
        if (this.suma != 0) {

          // Si la suma no es 0, se configura el objeto 'data' para mostrar los datos en el gráfico
          this.categorias = {
            labels: this.arrNombresCategorias,
            datasets: [
              {
                data: this.arrTiemposCategorias,
                backgroundColor: this.backgorundcolor,
                borderColor: this.bordercolor,
                borderWidth: 1
              },
            ],
          }
        }
      },

      // Manejo de errores en caso de que falle alguna de las solicitudes
      (error) => {
        console.error('Error al obtener tiempos de categorías', error);
      }
    );
  }

  obtenerNombresTareas(seleccion: any) {

    // Reseteo de arreglos
    this.arrNombresTareas = [];
    this.arrTiemposTareas = [];

    this.tareaService.obtenerNombresTareas(seleccion.id_categoria).subscribe(
      res => {

        if(res.length > 0){
          this.arrNombresTareas = res.map(r => r.nombre);

          const observables = this.arrNombresTareas.map(nombre =>
            this.tareaService.tiempoDeTarea(nombre)
          );

          forkJoin(observables).subscribe(
            responses => {
              responses.forEach(response => {
                this.arrTiemposTareas.push(response.tiempo);
              });

              this.tareas = {
                labels: this.arrNombresTareas,
                datasets: [
                  {
                    data: this.arrTiemposTareas,
                    backgroundColor: this.backgorundcolor,
                    borderColor: this.bordercolor,
                    borderWidth: 1
                  },
                ],
              };

            },
            error => {
              console.error('Error al obtener tiempos de tareas:', error);
            }
          );

        }
      },
      error => {
        console.error('Error al obtener nombres de tareas:', error);
      }
    );
  }

  limpiarSeleccion() {
    this.tareas = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: this.backgorundcolor,
          borderColor: this.bordercolor,
          borderWidth: 1
        },
      ],
    }
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.arrNombresCategorias = []
    this.arrIdsCategorias = []
    this.arrTiemposCategorias = []

    this.arrNombresTareas = []
    this.arrTiemposTareas = []

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

