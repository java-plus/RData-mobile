import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, zip } from 'rxjs';
import { environment } from '../../environments/environment';
import { MesureMeteo } from '../model/MesureMeteo';
import { MesurePollution } from '../model/MesurePollution';


// Constante de racine url, en local = http://localhost:8080, en prod: https://airdata.cleverapps.io
const URL_BACKEND = environment.backendUrl;


@Injectable({
  providedIn: 'root'
})

export class MeteoService {

  constructor(private http: HttpClient) { }


  /**
   * Récupère auprès du back les mesures météo ainsi qu'une liste des mesures de polution, correspondant à la commune passée en paramètre
   * @param  codeCommune String du code de la commune
   * @returns Observable<[MesureMeteo, MesurePollution[]]> 
   */

  recupererMesuresMeteoEtPollution(codeCommune: string): Observable<[MesureMeteo, MesurePollution[]]> {
    return zip(
      this.http.get<MesureMeteo>(`${URL_BACKEND}/mesures/meteo?codeCommune=${codeCommune}`, { withCredentials: true }),
      this.http.get<MesurePollution[]>(`${URL_BACKEND}/mesures/pollution?codeCommune=${codeCommune}`, { withCredentials: true })
    );
  }

}