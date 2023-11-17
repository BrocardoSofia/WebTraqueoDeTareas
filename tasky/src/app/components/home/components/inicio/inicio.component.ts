import { Component, OnInit } from '@angular/core';
import { Weather } from 'src/app/interfaces/auth';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {
  fecha: number = Date.now();
  hora:any;
  localizacion: string = "";
  temp: string = "";
  clima: string = "";
  icon: string = "";
  descripcion: string = "";

  ngOnInit(){
    this.mostrarHora();
    this.mostrarClima();
  }

  mostrarHora(){

    setInterval(()=>{

      this.hora = new Date();

    },1000);
  }

  mostrarClima(){
    llamadaAPI();
  }
}

let jsonData: Weather;

function pedirAPI() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    let lat: string = '-38.0033';
    let lon: string = '-57.5528';
    let API_key: string = '';

    xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+API_key+'&lang=es');
    xhr.responseType = 'json';

    xhr.onload = function () {
      if (xhr.status == 200) {
        jsonData = xhr.response;
        resolve(jsonData);

      } else {
        reject('error');
      }
    };

    xhr.send();
  })
}

async function llamadaAPI() {
  try {
    await pedirAPI();
    cargarClima();
  }
  catch(error)
  {
    console.log(error);
  }

}

function cargarClima() {
  console.log(jsonData);
  console.log('clima: '+jsonData.name);
}
