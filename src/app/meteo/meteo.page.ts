import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';


@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.page.html',
  styleUrls: ['./meteo.page.scss'],
})


export class MeteoPage implements OnInit {

  constructor() { }

  latitutde: number;
  longitude: number;

  // iconEtatMeteo: string;
  iconEtatMeteo = '11d';
  urlIconMeteo = 'https://openweathermap.org/img/wn/' + this.iconEtatMeteo + '@2x.png';

  urlApiGeoloc = 'https://api-adresse.data.gouv.fr/reverse/?lon=-1.6297237&lat=47.2330368';

  getCurrentLocation() {
    Plugins.Geolocation.getCurrentPosition().then(position => {
      this.latitutde = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });
  }

  ngOnInit() {
    this.getCurrentLocation();
  }

}
