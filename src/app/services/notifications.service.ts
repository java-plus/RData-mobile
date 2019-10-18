import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import NotificationUtilisateur from '../model/NotificationUtilisateur';
import {Type} from '../model/Type';
import {map} from 'rxjs/operators';


interface Zone {
    /**
     * region représente la région sélectionné lors de la création de
     * l'alerte
     */
    region?: string;
    /**
     * departement  représente le département sélectionné lors de la
     * création de l'alerte
     */
    departement?: string;

    /**
     * codeCommune  représente la commune sélectionné lors de la
     * création de l'alerte
     */
    codeCommune?: string;

  /**
   * type de la notification demandée. choix: METEO ou POLLUTION
   */
  type: Type;

}

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    // Constante de racine url, en local = http://localhost:8080, en prod: https://airdata.cleverapps.io
    URL_BACKEND = environment.backendUrl;

// Constante d'options pour les requetes http
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
        withCredentials: true
    };

    constructor(private http: HttpClient) {
    }


    /**
     * demande au back les notifications pour une zone
     * @param notification zone pour laquelle nous voulons récuperer la notification ainsi que son type
     */
    recupererNotifications(notification: Zone): Observable<NotificationUtilisateur[]> {
        return this.http.post<NotificationUtilisateur[]>(this.URL_BACKEND + '/recupereralertes', notification, this.httpOptions)
            .pipe(map(notifList => notifList.map((notif) => {
                notif.dateDebut = new Date(notif.dateDebut);
                notif.dateFin = new Date(notif.dateFin);
                return notif;
            })) );
    }
}
