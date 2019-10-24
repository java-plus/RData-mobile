import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import Favori from '../model/Favori';
import {environment} from '../../environments/environment';
import {MesureMeteo} from '../model/MesureMeteo';
import {MesurePollution} from '../model/MesurePollution';
import CreationFavori from '../model/CreationFavori';


@Injectable({
    providedIn: 'root'
})
export class FavorisService {
    // Constante de racine url, en local = http://localhost:8080, en prod: https://airdata.cleverapps.io
    const;
    URL_BACKEND = environment.backendUrl;
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
        withCredentials: true
    };

    constructor(private http: HttpClient) {
    }

    /**
     *  Méthode qui récupère du back la liste des favoris de l'utilisateur qui connecté
     * @returns  retourne un {Observable<Favori[]>}
     */
    recupererFavorisUserConnecte(): Observable<Favori[]> {
        return this.http.get<Favori[]>(`${this.URL_BACKEND}/favoris`, this.httpOptions);
    }

    /**
     * Cet fonction fait une requete dans le back pour obtenir les mesures météo relative à une commune
     * Elle les insère ensuite dans un subject (ici _subMesuresPollutionCommuneConcerne) afin de passer l'information de composants en comosants
     */
    recupererMesuresMeteo(codeCommune: string): Observable<MesureMeteo> {

        return this.http
            .get<MesureMeteo>(`${this.URL_BACKEND}/mesures/meteo?codeCommune=${codeCommune}`, {withCredentials: true});


    }

    /**
     * Cet fonction fait une requete dans le back pour obtenir les mesures pollution relative à une commune
     * Elle les insère ensuite dans un subject (ici _subMesuresPollutionCommuneConcerne) afin de passer l'information de composants en comosants
     */
    recupererMesuresPollution(codeCommune: string): Observable<MesurePollution[]> {

        return this.http
            .get<MesurePollution[]>(`${this.URL_BACKEND}/mesures/pollution?codeCommune=${codeCommune}`, {withCredentials: true});

    }

    /**
     * Fait une demande d’enregistrement de favori au back.
     * @param creationFavori favori qui doit être enregistrer
     */
    enregistrerFavori(creationFavori: CreationFavori): Observable<Favori> {
        return this.http.post<Favori>(`${this.URL_BACKEND}/favoris`, creationFavori, this.httpOptions);
    }

    /**
     * fait une demande de suppression de favori en back en fonction de son identifiant
     * @param id id du favori à supprimer
     */
    supprimerFavori(id: number) {
        return this.http.delete<void>(`${this.URL_BACKEND}/favoris/${id}`, this.httpOptions);
    }
}
