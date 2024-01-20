import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit{
  checkedAgua: boolean = false;
  visibleAgua: boolean = false;
  checkedPomodoro: boolean = false;
  visiblePomodoro: boolean = false;
  intervalId: any;

  min: any = this.obtenerMinutos()
  seg: any = '0' + 0;

  min_descanso: any = this.obtenerMinutos()
  seg_descanso: any = '0' + 0;
  private subscription!: Subscription;

  constructor(private nabBarService: NavbarService){}

  ngOnInit(): void {
    this.subscription = this.nabBarService.temporizadorActualizado$.subscribe(() => {
      // Lógica para actualizar la información del nav bar aquí
      this.min = this.obtenerMinutos();
      this.seg = '0' + 0;

      this.min_descanso = this.obtenerMinutos()
      this.seg_descanso= '0' + 0;
    });
  }

  async tempAgua() {
    if (this.checkedAgua) {
      x().then((done) => {
        if (done === true && this.checkedAgua) {
          this.visibleAgua = done;
        }
      });
    }
  }

  async tempPomodoro() {
    if (this.checkedPomodoro) {
      this.start()
      y().then((done) => {
        if (done === true && this.checkedPomodoro) {
          this.visiblePomodoro = done;
        }
      });
    } else {
      //reinicio el temporizador
      this.min = this.obtenerMinutos();
      this.seg = '0' + 0;
    }
  }

  closeAguaInf() {
    this.tempAgua();
    this.visibleAgua = false;
  }

  closePomodoro() {
    this.min = this.obtenerMinutos();
    this.seg = '0' + 0
    this.tempPomodoro();
    this.visiblePomodoro = false;
  }

  start() {
    let countDown: any;

    if (this.checkedPomodoro) {
      countDown = setInterval(() => {

        if (this.checkedPomodoro && (this.seg > 0 || this.min > 0)) {
          this.seg--;
          this.seg = this.seg >= 0 ? (this.seg < 10 ? '0' + this.seg : this.seg) : 59;

          if (this.seg === 59 && this.min > 0) {
            this.min--;
            this.min = this.min < 10 ? '0' + this.min : this.min;
          }
        } else {
          clearInterval(countDown);
          console.log("entro al temporizador de descanzo");
          this.intervalId = setInterval(this.temporizador_descanso.bind(this), 1000);
        }
      }, 1000)
    }
  }

  start_descanso() {
    let countDown: any;

    if (this.checkedPomodoro) {
      countDown = setInterval(() => {

        if (this.checkedPomodoro && (this.seg_descanso > 0 || this.min_descanso > 0)) {
          this.seg_descanso--;
          this.seg_descanso = this.seg_descanso >= 0 ?
          (this.seg_descanso < 10 ? '0' + this.seg_descanso : this.seg_descanso) : 59;

          if (this.seg_descanso === 59 && this.min_descanso > 0) {
            this.min_descanso--;
            this.min_descanso = this.min_descanso < 10 ? '0' + this.min_descanso : this.min_descanso;
          }
        } else {
          clearInterval(countDown)
        }
      }, 1000)
    }
  }

  obtenerMinutos() {
    if (localStorage.getItem('minutos_tarea')) {
      let min = JSON.parse(localStorage.getItem('minutos_tarea')!)

      if (min < 10) {
        return '0' + min;
      } else {
        return min
      }
    } else {
      return '0' + 0
    }
  }

  obtenerMinutosDescanso() {
    if (localStorage.getItem('minutos_descanso')) {
      let min = JSON.parse(localStorage.getItem('minutos_descanso')!)

      if (min < 10) {
        return '0' + min;
      } else {
        return min
      }
    } else {
      return '0' + 0
    }
  }

  temporizador_descanso() {
    // Resta un segundo a seg_descanso
    this.seg_descanso--;

    // Si seg_descanso llega a 0, resta un minuto a min_descanso y reinicia seg_descanso a 59
    if (this.seg_descanso < 0) {
      this.min_descanso--;
      this.seg_descanso = 59;
    }

    // Si min_descanso llega a 0, detiene el temporizador y asigna visiblePomodoro a false
    if (this.min_descanso === 0 && this.seg_descanso === 0) {
      clearInterval(this.intervalId);
    }
  }
}



function x() {
  let segundos = 0;

  if (localStorage.getItem('minutos_agua')) {
    segundos = JSON.parse(localStorage.getItem('minutos_agua')!) * 60
  }

  segundos *= 1000;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true as boolean);
    }, segundos);
  });
}

function y() {
  let segundos = 0;

  if (localStorage.getItem('minutos_tarea')) {
    segundos = JSON.parse(localStorage.getItem('minutos_tarea')!) * 60
  }

  segundos *= 1000;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true as boolean);
    }, segundos);
  });
}


