import { Component, OnInit } from '@angular/core';
import { MeteoService } from '../services/meteo.service';
import { GeolocalisationService } from '../services/geolocalisation.service';
import { LocalisationCommune } from '../model/localisation-commune';
import { MesureMeteo } from '../model/MesureMeteo';
import { MesurePollution } from '../model/MesurePollution';
import { MesurePollutionDto } from '../model/mesure-pollution-dto';
import { InfosPollution, Mesure } from '../model/infos-pollution';



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
   * les infos des polluants permettant de récupéré les echelles...
   */
  infosPollution: InfosPollution = new InfosPollution();
  /**
   * initialisation de liste des mesures pollution dto, pour l'affichage
   */
  listeMesurePollutionDto: MesurePollutionDto[] = [];


  constructor(private geolocService: GeolocalisationService, private meteoService: MeteoService) { }



  /**
   * Creer la liste de mesurePollutionDto depuis la liste de mesures de pollution passée en paramètre.
   * Tranfert certains attribut sans modifications, mais effectue certaines modifications 
   * (comme par exemple : supprime les décimales des valeurs des températures), et renseigne des attributs destinés à l'affiche html 
   * en fonction des valeurs de pollution (comme par exemple : couleur en fonction de la valeur de chaque polluant, texte de description...)
   * @param  mesures une liste de mesures de pollutions ( MesurePollution[] )
   */
  transformerMesuresPollutionPourAffichage(mesures: MesurePollution[]) {

    this.listeMesurePollutionDto = [];

    mesures.forEach(element => {

      this.listIsVisible.push(false);

      let typeDonneeTexte = '';
      let indiceDanger = 0;
      let indiceCouleur = '';
      let uniteMesure = '';
      let echelle = [];
      let positionCss = 0;

      let infosPollution: Mesure;

      if (element.typeDeDonnee === 'CO') {
        infosPollution = this.infosPollution.CO;
      } else if (element.typeDeDonnee === 'NO2') {
        infosPollution = this.infosPollution.NO2;
      } else if (element.typeDeDonnee === 'O3') {
        infosPollution = this.infosPollution.O3;
      } else if (element.typeDeDonnee === 'PM10') {
        infosPollution = this.infosPollution.PM10;
      } else if (element.typeDeDonnee === 'PM2.5') {
        infosPollution = this.infosPollution.PM25;
      } else if (element.typeDeDonnee === 'SO2') {
        infosPollution = this.infosPollution.SO2;
      }

      typeDonneeTexte = infosPollution.nom;
      uniteMesure = infosPollution.unite;
      echelle = infosPollution.echelle;

      if (element.valeur <= 0) {
        indiceDanger = 0;
        indiceCouleur = 'couleurInvalid';
        positionCss = 0;
      } else if (element.valeur > echelle[echelle.length - 1]) {
        positionCss = 90;
        indiceDanger = 4;
        indiceCouleur = 'couleur4';
      } else {
        for (let index = 0; index < echelle.length; index++) {
          if (element.valeur <= echelle[index]) {
            indiceDanger = index;
            indiceCouleur = 'couleur' + indiceDanger.toString();
            const positionDeDepart = indiceDanger * 20;
            const max = echelle[indiceDanger];
            const calc = (element.valeur * 20) / max;
            positionCss = positionDeDepart + calc;
            break;
          }
        }
      }

      const mesurePollutionDto = new MesurePollutionDto(
        element.id,
        element.valeur,
        element.typeDeDonnee,
        element.date,
        element.stationDeMesure,
        typeDonneeTexte,
        indiceDanger,
        indiceCouleur,
        uniteMesure,
        echelle,
        positionCss
      );

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
        this.transformerMesuresPollutionPourAffichage(result[1]);
        this.mesuresMeteo.temperature = Math.trunc(this.mesuresMeteo.temperature);
        this.mesuresMeteo.tempMax = Math.trunc(this.mesuresMeteo.tempMax);
        this.mesuresMeteo.tempMin = Math.trunc(this.mesuresMeteo.tempMin);

      }
    );
  }

  /**
   * Récupére la position actuelle, et lance la méthode pour récupérer les mesures de la localisation
   */
  actualiserPosition(event: any) {

    this.geolocService.recupererGeoLocEtCommune().subscribe(
      (result) => {
        this.commune = result;
        this.recupererMesures(result);
        if (event !== null) {
          setTimeout(() => {
            event.target.complete();
          }, 1000);
        }

      },
      (error) => this.messageErreur = 'Impossible de vous geolocaliser'
    );
  }


  /**
   * modifie la class css de l'element qui déclenche la méthode
   * @param  num number correspondant à l'index du tableau listIsVisible
   */
  toggleInfos(num: number) {
    for (let index = 0; index < this.listIsVisible.length; index++) {
      if (this.listIsVisible[index] === true && index !== num) {
        this.listIsVisible[index] = false;
      }
    }
    this.listIsVisible[num] = !this.listIsVisible[num];
  }



  /**
   * Lance l'actualisation de la position  à l'initialisation
   */
  ngOnInit() {
    this.actualiserPosition(null);
  }

}
