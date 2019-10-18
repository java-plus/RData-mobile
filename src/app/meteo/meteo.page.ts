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

  /**
   * Url des icons de OpenWeatherMap
   */
  urlIconMeteoBase = 'https://openweathermap.org/img/wn/';
  /**
   * definition + format de l'icon openWeatherMap
   */
  iconMeteoDefinition = '@2x.png';
  /**
   * Url complète de l'icon représentant l'état méteo de localisation 
   * (= urlIconMeteoBase + icon + iconMeteoDefinition)
   */
  urlIconMeteo: string;
  /**
   * Nom de la commune récupérée via gps
   */
  nomCommune: string;
  /**
   * Code Postal de la commune récupérée via gps
   */
  codePostal: string;
  /**
   * Mesures Méteo de localisation récupérée via gps
   */
  mesuresMeteo: MesureMeteo;
  /**
   * Liste des Mesures pollution de localisation récupérée via gps
   */
  mesuresPollution: MesurePollution[];
  /**
   * la commune trouvée par l'api de correspondance coordonnée gps -> commune
   */
  commune: LocalisationCommune;
  /**
   * css permettant de faire la rotation de l'icon indiquant la direction du vent en 
   */
  cssrRotationIcon: string;

  constructor(private geolocService: GeolocalisationService, private meteoService: MeteoService) { }

  /**
   * Récupère toutes mesures pollution et les mesures meteo d'une commune en fonction du code commune passé en paramètre.
   * @param codeCommune String Le code commune de la commune souhaitée
   */
  recupererMesures(codeCommune: string) {
    this.meteoService.recupererMesuresMeteoEtPollution(codeCommune).subscribe(
      (result) => {
        this.urlIconMeteo = `${this.urlIconMeteoBase}${result[0].weatherIcon}${this.iconMeteoDefinition}`;
        this.mesuresMeteo = result[0];
        this.cssrRotationIcon = 'rotate(' + (this.mesuresMeteo.windDegrees + 180).toString() + 'deg)';
        this.mesuresPollution = result[1];
      }
    );
  }

  /**
   * Récupére la position actuelle, et lance la méthode pour récupérer les mesures de la localisation 
   */
  actualiserPosition() {
    this.geolocService.recupererGeoLocEtCommune().subscribe(
      (result) => {
        this.codePostal = result.features[0].properties.postcode;
        this.nomCommune = result.features[0].properties.city;
        this.recupererMesures(result.features[0].properties.citycode);
      }
    );
  }

  /**
   * Lance l'actualisation de la position  à l'initialisation 
   */
  ngOnInit() {
    this.actualiserPosition();
  }

}
