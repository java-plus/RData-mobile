import StationDeMesurePollution from './StationDeMesurePollution'

export class MesurePollution {



  constructor(
    public id: string,
    public valeur: number,
    /**
     * nom de la mesure de pollution.
     *SO2,PM2.5,PM10,NO2,CO,O3
     */
    public typeDeDonnee: string,
    public date: string,
    public stationDeMesure: StationDeMesurePollution){

  }
}
