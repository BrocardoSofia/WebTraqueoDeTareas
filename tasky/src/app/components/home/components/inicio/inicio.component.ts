import { Component, OnInit } from '@angular/core';
import { Weather } from 'src/app/interfaces/auth';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {
  fecha: number = Date.now();
  hora: any;
  localizacion: string = "";
  temp: string = "";
  clima: string = "";
  icon: string = "";
  descripcion: string = "";

  //ID USUARIO DEL LOCAL STORAGE
  nombre_usuario = JSON.parse(localStorage.getItem('nombre_usuario')!);

  ngOnInit() {
    this.mostrarHora();
    this.mostrarClima();
    this.saludar();
  }

  mostrarHora() {

    setInterval(() => {

      this.hora = new Date();

    }, 1000);
  }

  saludar() {
    let nombre: string = this.nombre_usuario;
    let pSaludo = document.getElementById("helloName");
    let tSaludo = document.createTextNode("Hola, " + nombre + "!");
    pSaludo?.appendChild(tSaludo);
  }

  mostrarClima() {
    llamadaAPI();
  }
}

let jsonData: Weather;

function pedirAPI() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    let lat: string = '-38.0033';
    let lon: string = '-57.5528';
    let API_key: string = 'd68ad79be1ac8c2e9d59bd959317eea0';

    xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + API_key + '&units=metric&lang=es');
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
    let loc = 'a';
    if (loc === '') {
      cargarNoClima();
    }
    else {
      await pedirAPI();
      cargarClima();
    }
  }
  catch (error) {
    console.log(error);
  }

}

function cargarNoClima() {
  let weather = document.getElementById("iconoClima");
  let infoWeather = document.getElementById("infoClima");
  let imagen = document.createElement("img");
  let info = document.createElement("section");
  let texto1 = document.createTextNode("Agregar localizacion ");
  let texto2 = document.createTextNode("para obtener datos ");
  let texto3 = document.createTextNode("del clima");
  let salto;

  imagen.src = "./assets/weather/clima.png";
  imagen.width = 300;

  info.style.color = "#151E59";
  info.style.fontSize = "30px";
  info.style.fontFamily = "Poppins";
  info.style.marginBottom = "150px";

  weather?.appendChild(imagen);
  info.appendChild(texto1);
  salto = document.createElement("br");
  info.appendChild(salto);
  info.appendChild(texto2);
  salto = document.createElement("br");
  info.appendChild(salto);
  info.appendChild(texto3);
  infoWeather?.appendChild(info);
}

function cargarClima() {
  let info = document.getElementById("infoClima");
  let weather = document.getElementById("iconoClima");

  let imagen = document.createElement("img");

  let infoSection = document.createElement("section");
  infoSection.style.display = "flex";
  infoSection.style.flexDirection = "row";
  infoSection.style.alignContent = "space-between";

  let infoClimaSection = document.createElement("section");
  infoClimaSection.style.display = "flex";
  infoClimaSection.style.alignContent = "flex-start";

  let infoLocalizacion = document.createElement("section");

  let tempSection = document.createElement("section");
  let espSection = document.createElement("section");

  let pTemp = document.createElement("p");
  let tTemp = document.createTextNode(jsonData.main.temp + "ºC");
  let pDesc = document.createElement("p");
  let tDesc = document.createTextNode("");

  let pLoc = document.createElement("p");
  let tLoc = document.createTextNode(jsonData.name);

  let tPrep = document.createTextNode("Sensación térmica: " + jsonData.main.feels_like + "ºC");
  let pPrep = document.createElement("p");
  let tHumedad = document.createTextNode("Humedad: " + jsonData.main.humidity + "%");
  let pHumedad = document.createElement("p");
  let tViento = document.createTextNode("Viento: " + jsonData.wind.speed + "km/h");
  let pViento = document.createElement("p");

  pPrep.appendChild(tPrep);
  pPrep.style.fontFamily = "Poppins, sans-serif";
  pPrep.style.color = "#151E59";
  pHumedad.appendChild(tHumedad);
  pHumedad.style.fontFamily = "Poppins, sans-serif";
  pHumedad.style.color = "#151E59";
  pViento.appendChild(tViento);
  pViento.style.fontFamily = "Poppins, sans-serif";
  pViento.style.color = "#151E59";

  espSection.appendChild(pPrep);
  espSection.appendChild(pHumedad);
  espSection.appendChild(pViento);

  pTemp.style.marginBottom = "0px";

  pLoc.appendChild(tLoc);
  pLoc.style.fontSize = "18px";
  pLoc.style.fontFamily = "Poppins, sans-serif";
  pLoc.style.color = "#151E59";
  pLoc.style.fontWeight = "bold";
  infoLocalizacion.appendChild(pLoc);


  if (jsonData.weather) {
    imagen.src = "./assets/weather/" + jsonData.weather[0].icon + ".png";
    imagen.width = 300;
    weather?.appendChild(imagen);

    tDesc = document.createTextNode(jsonData.weather[0].description);
  }

  pTemp.appendChild(tTemp);
  pDesc.appendChild(tDesc);
  pDesc.style.textTransform = "capitalize";

  pTemp.style.fontSize = "60px";
  pTemp.style.fontFamily = "Poppins, sans-serif";
  pTemp.style.color = "#151E59";
  pTemp.style.fontWeight = "bold";

  pDesc.style.fontSize = "20px";
  pDesc.style.fontFamily = "Poppins, sans-serif";
  pDesc.style.color = "#151E59";
  pDesc.style.fontWeight = "bold";

  tempSection.appendChild(pTemp);
  tempSection.appendChild(pDesc);

  espSection.style.padding = "10px";
  espSection.style.marginLeft = "30px";
  espSection.style.borderLeft = "thick solid #151E59";

  infoSection.appendChild(tempSection);
  infoSection.style.marginBottom = "120px";

  infoSection.appendChild(espSection);

  info?.appendChild(infoSection);
  info?.appendChild(infoLocalizacion);

}
