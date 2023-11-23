import { Component } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent {
  checkedPomodoro: boolean = false;
  checkedAgua: boolean = false;
  visible: boolean = false;

  async tempAgua() {
    if (this.checkedAgua) {
      x().then((done) => {
        if(done === true && this.checkedAgua)
        {
          this.visible = done;
        }
       });
    }
  }

  closeAguaInf()
  {
    this.tempAgua();
    this.visible = false;
  }
}

function x() {
  let segundos = 1; //obtener segundos de la base de datos----------------------------------------------
  segundos*=1000;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true as boolean);
    },segundos);
  });
}

