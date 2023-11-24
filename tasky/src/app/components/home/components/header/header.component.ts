import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent {
  checkedAgua: boolean = false;
  visibleAgua: boolean = false;
  checkedPomodoro: boolean = false;
  visiblePomodoro: boolean = false;

  min : any = this.obtenerMinutos()
  seg: any = '0' + 0;

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
    }else{
      this.min = this.obtenerMinutos();
      this.seg = '0' + 0;
    }
  }

  closeAguaInf() {
    this.tempAgua();
    this.visibleAgua = false;
  }

  closePomodoro(){
    this.min = this.obtenerMinutos() ;
    this.seg = '0' + 0
    this.tempPomodoro();
    this.visiblePomodoro = false;
  }

  start() {

    let countDown : any ;

    if (this.checkedPomodoro) {
      countDown = setInterval(() => {

        if(this.checkedPomodoro && (this.seg > 0 || this.min > 0)){
          this.seg--;
          this.seg = this.seg >= 0 ? (this.seg < 10 ? '0' + this.seg : this.seg) : 59;

          if (this.seg === 59 && this.min > 0) {
            this.min--;
            this.min = this.min < 10 ? '0' + this.min : this.min;
          }
        }else{
          clearInterval(countDown)
        }
      }, 1000)
    }
  }

  obtenerMinutos(){
    if(localStorage.getItem('minutos_descanso')){
      let min = JSON.parse(localStorage.getItem('minutos_descanso')!)

      if(min < 10){
        return '0' + min;
      }else{
        return min
      }
    }else{
      return '0' + 0
    }
  }
}

function x() {
  let segundos = 0;

  if(localStorage.getItem('minutos_agua')){
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

  if(localStorage.getItem('minutos_descanso')){
    segundos = JSON.parse(localStorage.getItem('minutos_agua')!) * 60
  }

  segundos *= 1000;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true as boolean);
    }, segundos);
  });
}

