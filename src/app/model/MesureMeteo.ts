import StationDeMesureMeteo from './StationDeMesureMeteo';

/**
 * represente les mesures meteo d’une commune
 */
export class MesureMeteo {

  constructor(
      /**
       * id de la mesure
       */
    public id: string,
      /**
       * date de la mesure
       */
    public date: Date,
      /**
       * station ayant effectué la mesure
       */
    public stationDeMesureMeteo: StationDeMesureMeteo,
      /**
       * description du temps
       */
    public weatherDescription: string,
      /**
       * icon representant le temps
       * ex: http://openweathermap.org/img/wn/10d@2x.png
       */
    public weatherIcon: string,
      /**
       * temperature
       */
    public temperature: number,
      /**
       * pression atmosphérique
       */
    public pressure: number,
      /**
       * taux d’humidité
       */
    public humidity: number,
      /**
       * temperature minimal du jour
       */
    public tempMin: number,
      /**
       * temperateur maximal du jour
       */
    public tempMax: number,
      /**
       * vitesse du vent
       */
    public windSpeed: number,
      /**
       *  orientation du vent
       */
    public windDegrees: number) { }
}
