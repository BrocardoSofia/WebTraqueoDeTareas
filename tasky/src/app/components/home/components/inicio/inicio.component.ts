import { Component, OnInit } from '@angular/core';

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

  }
}

let jsonData;


function pedirAPI() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    let lat: string = '-38.0033';
    let lon: string = '-57.5528';
    let API_key: string = '';

    xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+API_key);
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

// async function llamadaAPI() {
//   try {
//     let respuesta = await pedirAPI();
//     console.log(respuesta.results);
//     cargarTablaPelis(respuesta.results);
//   }
//   catch(error)
//   {
//     console.log(error);
//   }

// }

// function cargarTablaPelis(data) {
//   const tabla = document.getElementById("tablaPelis");
//   console.log("entro");

//   for (let i=0; i<data.length; i++) {
//     console.log("entro");

//     let movie = data[i];

//     let titulo = document.createTextNode(movie.originalTitleText.text);
//     let dia = movie.releaseDate.day;
//     let mes = movie.releaseDate.month;
//     let anio = movie.releaseDate.year;
//     let fecha = document.createTextNode(dia+"/"+mes+"/"+anio);
//     let poster = document.createElement("img");

//     if(movie.primaryImage != null)
//     {
//       poster.src = movie.primaryImage.url;
//       poster.width = 100;
//     }
//     poster.alt = "sin imagen";

//     let row = document.createElement("tr");

//     let cell = document.createElement("td");
//     cell.appendChild(titulo);
//     row.appendChild(cell);

//     cell = document.createElement("td");
//     cell.appendChild(fecha);
//     row.appendChild(cell);

//     cell = document.createElement("td");
//     cell.appendChild(poster);
//     row.appendChild(cell);

//     tabla.appendChild(row);

//   }

// }

// llamadaAPI();
