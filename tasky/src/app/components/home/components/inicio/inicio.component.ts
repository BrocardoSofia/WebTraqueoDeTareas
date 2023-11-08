import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {
  fecha: number = Date.now();
  hora:any;

  ngOnInit(){
    this.mostrarHora();
  }

  mostrarHora(){

    setInterval(()=>{

      this.hora = new Date();

    },1000);
  }
}
