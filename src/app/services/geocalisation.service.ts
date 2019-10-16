import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { LocalisationCommune } from '../model/localisation-commune';
import { flatMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GeolocalisationService {
  urlApiGeoloc = 'https://api-adresse.data.gouv.fr/reverse/';
  constructor(private http: HttpClient) { }
  recupererInfosCommune(lat: number, long: number): Observable<LocalisationCommune> {
    return this.http.get<LocalisationCommune>(`${this.urlApiGeoloc}?long=${long}&lat=${lat}`);
  }
  recupererGeoLocEtCommune(): Observable<LocalisationCommune> {
    return from(Plugins.Geolocation.getCurrentPosition().then(position => {
      const latitutde = position.coords.latitude;
      const longitude = position.coords.longitude;
      return [latitutde, longitude];
    })).pipe(flatMap(([lat, long]) => this.recupererInfosCommune(lat, long)));
  }
}
