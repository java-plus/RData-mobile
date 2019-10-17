import { Component, OnInit } from '@angular/core';
import { MeteoService } from '../services/meteo.service';
import { GeolocalisationService } from '../services/geolocalisation.service';
import { LocalisationCommune } from '../model/localisation-commune';
import { MesureMeteo } from '../model/MesureMeteo';
import { MesurePollution } from '../model/MesurePollution';



@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.page.html',
  styleUrls: ['./meteo.page.scss'],
})


export class MeteoPage implements OnInit {

  urlIconMeteoBase = 'https://openweathermap.org/img/wn/';
  iconMeteoDefinition = '@2x.png';

  nomCommune: string;
  codePostal: string;
  urlIconMeteo: string;

  mesuresMeteo: MesureMeteo;
  mesuresPollution: MesurePollution[];

  commune: LocalisationCommune;

  constructor(private geolocService: GeolocalisationService, private meteoService: MeteoService) { }

  recupererMesures(codeCommune: string) {
    this.meteoService.recupererMesuresMeteoEtPollution(codeCommune).subscribe(
      (result) => {
        this.urlIconMeteo = `${this.urlIconMeteoBase}${result[0].weatherIcon}${this.iconMeteoDefinition}`;
        this.mesuresMeteo = result[0];
        this.mesuresPollution = result[1];
      }
    );
  }


  ngOnInit() {
    this.geolocService.recupererGeoLocEtCommune().subscribe(
      (result) => {
        this.codePostal = result.features[0].properties.postcode;
        this.nomCommune = result.features[0].properties.city;
        // this.commune = result;
        // console.log(this.commune.features[0].properties);
        this.recupererMesures(result.features[0].properties.citycode);
      }
    );
  }

}
