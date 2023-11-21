import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { TareaService } from 'src/app/services/tarea.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent {

  data: any;
  options: any;

  // documentStyle = getComputedStyle(document.documentElement);
  // textColor = documentStyle.getPropertyValue('--text-color');

  arrNombresCategorias: string[] = []
  arrIdsCategorias: number[] = []
  arrTiemposCategorias: number[] = []

  suma: number = 0

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
          this.obtenerTiempoCategorias();
        }
      }
    );
  }

  obtenerTiempoCategorias() {
    this.arrIdsCategorias.forEach(a => {
      (this.tareaService.tiempoDeCategoria(a)).subscribe(
        (res) => {
          this.arrTiemposCategorias.push(parseInt(res))
          for (let i = 0 ;i < this.arrTiemposCategorias.length; i++){
            this.suma += this.arrTiemposCategorias[i]
          }

          this.data = {
            labels: this.arrNombresCategorias,
            datasets: [
              {
                data: this.arrTiemposCategorias,
                // backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                // hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
              }
            ]
          }

        }
      )
    })
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.obtenerNombresCategorias();
    console.log(this.arrNombresCategorias)
    console.log(this.arrIdsCategorias)
    console.log(this.arrTiemposCategorias)

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

