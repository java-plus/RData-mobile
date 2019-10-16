import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.page.html',
  styleUrls: ['./meteo.page.scss'],
})


export class MeteoPage implements OnInit {

  constructor() { }

  lat: number;
  long: number;


  // iconEtatMeteo: string;
  iconEtatMeteo = '11d';
  urlIconMeteo = 'https://openweathermap.org/img/wn/' + this.iconEtatMeteo + '@2x.png';

  getCurrentLocation() {
    Plugins.Geolocation.getCurrentPosition().then(position => {
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
      console.log('lat : ', this.lat, ' / long : ', this.long);
    });
  }


  ngOnInit() {
    this.getCurrentLocation();
  }

}
