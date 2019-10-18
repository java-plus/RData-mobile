import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, from} from 'rxjs';
import {Plugins} from '@capacitor/core';
import {LocalisationCommune} from '../model/localisation-commune';
import {flatMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GeolocalisationService {
    /**
     * adresse de l’api pour recuperer le code commune, le departement et la region de l’utilisateur à partir de ses coordonnées gps
     */
    urlApiGeoloc = 'https://api-adresse.data.gouv.fr/reverse/';

    constructor(private http: HttpClient) {
    }

    /**
     * recupere le code commune, le departement et la region de l’utilisateur à partir de ses coordonnées gps
     * @param lat latitude de l’utilisateur
     * @param long longitude de l’utilisateur
     */
    recupererInfosCommune(lat: number, long: number): Observable<LocalisationCommune> {
        return this.http.get<LocalisationCommune>(`${this.urlApiGeoloc}?long=${long}&lat=${lat}`);
    }

    /**
     * recupere le code commune, le departement et la region de l’utilisateur à partir de ses coordonnées gps
     */
    recupererGeoLocEtCommune(): Observable<LocalisationCommune> {
        return from(Plugins.Geolocation.getCurrentPosition().then(position => {
            const latitutde = position.coords.latitude;
            const longitude = position.coords.longitude;
            return [latitutde, longitude];
        })).pipe(flatMap(([lat, long]) => this.recupererInfosCommune(lat, long)));
    }


}
