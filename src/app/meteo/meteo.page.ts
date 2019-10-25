import { Component, OnInit } from '@angular/core';
import { MeteoService } from '../services/meteo.service';
import { GeolocalisationService } from '../services/geolocalisation.service';
import { LocalisationCommune } from '../model/localisation-commune';
import { MesureMeteo } from '../model/MesureMeteo';
import { MesurePollution } from '../model/MesurePollution';
import { MesurePollutionDto } from '../model/mesure-pollution-dto';
import { InfosPollution } from '../model/infos-pollution';



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
   * Mesures Méteo de localisation récupérée via gps
   */
  mesuresMeteo: MesureMeteo;
  /**
   * Liste des Mesures pollution de localisation récupérée via gps
   */
  mesuresPollution: MesurePollution[];
  /**
   * css permettant de faire la rotation de l'icon indiquant la direction du vent en 
   */
  cssRotationIcon: string;
  /**
   * commune telle que récupérée via l'api
   */
  commune: LocalisationCommune;
  /**
   * date du relevée de la mesure meteo au format string
   */
  dateFormatee: string;
  /**
   * le message d'erreur pour afficher
   */
  messageErreur: string;
  /**
   * liste de boolean indiquant pour chaque polluant si les infos sont affiché
   */
  listIsVisible: boolean[] = [];
  /**
   * les infos des polluants
   */
  infosPollution: InfosPollution = new InfosPollution();

  constructor(private geolocService: GeolocalisationService, private meteoService: MeteoService) { }


  listeMesurePollutionDto: MesurePollutionDto[] = [];


  mesuresPollutionAffinage(mesures: MesurePollution[]) {
    const couleurInvalid = '#A9A9A9';
    const couleur0 = '#005500';
    const couleur1 = '#00AA00';
    const couleur2 = '#FFAA00';
    const couleur3 = '#FF5500';
    const couleur4 = '#AA0000';


    mesures.forEach(element => {

      this.listIsVisible.push(false);

      let typeDonneeTexte = '';
      let indiceDanger = 0;
      let indiceCouleur = '';
      let uniteMesure = '';
      let echelle = [];

      if (element.typeDeDonnee === 'SO2') {



        console.log(this.infosPollution);
        typeDonneeTexte = this.infosPollution.SO2.nom;
        uniteMesure = this.infosPollution.SO2.unite;
        echelle = this.infosPollution.SO2.echelle;

        if (element.valeur <= 0) {
          indiceDanger = 0;
          indiceCouleur = 'couleurInvalid';
        } else if (element.valeur > 0 && element.valeur <= 100) {
          indiceDanger = 0;
          indiceCouleur = 'couleur0';
        } else if (element.valeur > 100 && element.valeur <= 200) {
          indiceDanger = 1;
          indiceCouleur = 'couleur1';
        } else if (element.valeur > 200 && element.valeur <= 350) {
          indiceDanger = 2;
          indiceCouleur = 'couleur2';
        } else if (element.valeur > 350 && element.valeur <= 500) {
          indiceDanger = 3;
          indiceCouleur = 'couleur3';
        } else if (element.valeur > 500) {
          indiceDanger = 4;
          indiceCouleur = 'couleur4';
        }




      } else if (element.typeDeDonnee === 'CO') {

        typeDonneeTexte = this.infosPollution.CO.nom;
        uniteMesure = this.infosPollution.CO.unite;
        echelle = this.infosPollution.CO.echelle;



        if (element.valeur <= 0) {
          indiceDanger = 0;
          indiceCouleur = 'couleurInvalid';
        } else if (element.valeur > 0 && element.valeur <= 5) {
          indiceDanger = 0;
          indiceCouleur = 'couleur0';
        } else if (element.valeur > 5 && element.valeur <= 10) {
          indiceDanger = 1;
          indiceCouleur = 'couleur1';
        } else if (element.valeur > 10 && element.valeur <= 25) {
          indiceDanger = 2;
          indiceCouleur = 'couleur2';
        } else if (element.valeur > 25 && element.valeur <= 50) {
          indiceDanger = 3;
          indiceCouleur = 'couleur3';
        } else if (element.valeur > 50) {
          indiceDanger = 4;
          indiceCouleur = 'couleur4';
        }




      } else if (element.typeDeDonnee === 'PM2.5') {

        typeDonneeTexte = this.infosPollution.PM25.nom;
        uniteMesure = this.infosPollution.PM25.unite;
        echelle = this.infosPollution.PM25.echelle;


        if (element.valeur <= 0) {
          indiceDanger = 0;
          indiceCouleur = 'couleurInvalid';
        } else if (element.valeur > 0 && element.valeur <= 100) {
          indiceDanger = 0;
          indiceCouleur = 'couleur0';
        } else if (element.valeur > 100 && element.valeur <= 200) {
          indiceDanger = 1;
          indiceCouleur = 'couleur1';
        } else if (element.valeur > 200 && element.valeur <= 350) {
          indiceDanger = 2;
          indiceCouleur = 'couleur2';
        } else if (element.valeur > 350 && element.valeur <= 500) {
          indiceDanger = 3;
          indiceCouleur = 'couleur3';
        } else if (element.valeur > 500) {
          indiceDanger = 4;
          indiceCouleur = 'couleur4';
        }

      } else if (element.typeDeDonnee === 'PM10') {

        typeDonneeTexte = this.infosPollution.PM10.nom;
        uniteMesure = this.infosPollution.PM10.unite;
        echelle = this.infosPollution.PM10.echelle;


        if (element.valeur <= 0) {
          indiceDanger = 0;
          indiceCouleur = 'couleurInvalid';
        } else if (element.valeur > 0 && element.valeur <= 35) {
          indiceDanger = 0;
          indiceCouleur = 'couleur0';
        } else if (element.valeur > 35 && element.valeur <= 60) {
          indiceDanger = 1;
          indiceCouleur = 'couleur1';
        } else if (element.valeur > 60 && element.valeur <= 90) {
          indiceDanger = 2;
          indiceCouleur = 'couleur2';
        } else if (element.valeur > 90 && element.valeur <= 180) {
          indiceDanger = 3;
          indiceCouleur = 'couleur3';
        } else if (element.valeur > 180) {
          indiceDanger = 4;
          indiceCouleur = 'couleur4';
        }


      } else if (element.typeDeDonnee === 'O3') {

        typeDonneeTexte = this.infosPollution.O3.nom;
        uniteMesure = this.infosPollution.O3.unite;
        echelle = this.infosPollution.O3.echelle;


        if (element.valeur <= 0) {
          indiceDanger = 0;
          indiceCouleur = 'couleurInvalid';
        } else if (element.valeur > 0 && element.valeur <= 80) {
          indiceDanger = 0;
          indiceCouleur = 'couleur0';
        } else if (element.valeur > 80 && element.valeur <= 120) {
          indiceDanger = 1;
          indiceCouleur = 'couleur1';
        } else if (element.valeur > 120 && element.valeur <= 180) {
          indiceDanger = 2;
          indiceCouleur = 'couleur2';
        } else if (element.valeur > 180 && element.valeur <= 240) {
          indiceDanger = 3;
          indiceCouleur = 'couleur3';
        } else if (element.valeur > 240) {
          indiceDanger = 4;
          indiceCouleur = 'couleur4';
        }

      } else if (element.typeDeDonnee === 'NO2') {


        typeDonneeTexte = this.infosPollution.NO2.nom;
        uniteMesure = this.infosPollution.NO2.unite;
        echelle = this.infosPollution.NO2.echelle;


        if (element.valeur <= 0) {
          indiceDanger = 0;
          indiceCouleur = 'couleurInvalid';
        } else if (element.valeur > 0 && element.valeur <= 40) {
          indiceDanger = 0;
          indiceCouleur = 'couleur0';
        } else if (element.valeur > 40 && element.valeur <= 100) {
          indiceDanger = 1;
          indiceCouleur = 'couleur1';
        } else if (element.valeur > 100 && element.valeur <= 200) {
          indiceDanger = 2;
          indiceCouleur = 'couleur2';
        } else if (element.valeur > 200 && element.valeur <= 400) {
          indiceDanger = 3;
          indiceCouleur = 'couleur3';
        } else if (element.valeur > 400) {
          indiceDanger = 4;
          indiceCouleur = 'couleur4';
        }

      }



      const mesurePollutionDto = new MesurePollutionDto(element.id, element.valeur, element.typeDeDonnee, element.date, element.stationDeMesure, typeDonneeTexte, indiceDanger, indiceCouleur, uniteMesure, echelle);
      this.listeMesurePollutionDto.push(mesurePollutionDto);
    });


  }



  /**
   * Récupère toutes mesures pollution et les mesures meteo d'une commune en fonction du code commune passé en paramètre.
   * @param codeCommune String Le code commune de la commune souhaitée
   */
  recupererMesures(commune: LocalisationCommune) {
    this.meteoService.recupererMesuresMeteoEtPollution(commune.features[0].properties.citycode).subscribe(
      (result) => {
        this.urlIconMeteo = `${this.urlIconMeteoBase}${result[0].weatherIcon}${this.iconMeteoDefinition}`;
        this.mesuresMeteo = result[0];
        this.dateFormatee = new Date(this.mesuresMeteo.date).toLocaleString();
        this.cssRotationIcon = 'rotate(' + (this.mesuresMeteo.windDegrees + 180).toString() + 'deg)';
        this.mesuresPollution = result[1];
        this.mesuresPollutionAffinage(result[1]);
        this.mesuresMeteo.temperature = Math.trunc(this.mesuresMeteo.temperature);
        this.mesuresMeteo.tempMax = Math.trunc(this.mesuresMeteo.tempMax);
        this.mesuresMeteo.tempMin = Math.trunc(this.mesuresMeteo.tempMin);
        console.log(this.mesuresMeteo.temperature);
      }
    );
  }

  /**
   * Récupére la position actuelle, et lance la méthode pour récupérer les mesures de la localisation
   */
  actualiserPosition() {
    this.geolocService.recupererGeoLocEtCommune().subscribe(
      (result) => {
        this.commune = result;
        this.recupererMesures(result);
      },
      (error) => this.messageErreur = 'Impossible de vous geolocaliser'
    );
  }


  toggleInfos(num: number) {
    for (let index = 0; index < this.listIsVisible.length; index++) {
      if (this.listIsVisible[index] === true) {
        this.listIsVisible[index] = false;
      }

    }
    this.listIsVisible[num] = !this.listIsVisible[num];
  }


  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  /**
   * Lance l'actualisation de la position  à l'initialisation
   */
  ngOnInit() {
    this.actualiserPosition();
  }

}
