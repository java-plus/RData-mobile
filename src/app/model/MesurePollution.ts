import StationDeMesurePollution from './StationDeMesurePollution';

/**
 * represente une mesure de pollution
 */
export class MesurePollution {
  constructor(
    /**
     * id de la mesure
     */
    public id: string,
    /**
     * valeur de la mesure
     */
    public valeur: number,
    /**
     * nom de la mesure de pollution.
     * SO2,PM2.5,PM10,NO2,CO,O3
     */
    public typeDeDonnee: string,
    /**
     * date de la mesure
     */
    public date: string,
    public stationDeMesure: StationDeMesurePollution
  ) {

  }
}
