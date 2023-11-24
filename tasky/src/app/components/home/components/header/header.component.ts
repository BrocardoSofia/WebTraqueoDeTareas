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
      y().then((done) => {
        if (done === true && this.checkedPomodoro) {
          this.visiblePomodoro = done;
        }
      });
    }
  }

  closeAguaInf() {
    this.tempAgua();
    this.visibleAgua = false;
  }

  closePomodoro(){
    this.tempPomodoro();
    this.visiblePomodoro = false;
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

