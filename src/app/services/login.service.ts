import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import Utilisateur from '../model/Utilisateur';
import { Router } from '@angular/router';
import { flatMap, tap } from 'rxjs/operators';

// Constante de racine url, en local = http://localhost:8080, en prod: https://airdata.cleverapps.io
const URL_BACKEND = environment.backendUrl;

// Constante d'options pour les requetes http
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }),
    withCredentials: true
};

/**
 * représente les services liés au login de l'application
 *
 *
 */
@Injectable({
    providedIn: 'root'
})
export class LoginService {

    /**
     * Ce constructeur initialise les singletons
     * _http (pour permettre les requetes sur le Back)
     * router (pour permettre la redirection vers d'autres urls)
     */
    constructor(private http: HttpClient, private router: Router) {
    }

    /**
     *Ce subject transmet aux autres composants l'utilisateur connecté
     *
     */
    private _subConnecte: BehaviorSubject<Utilisateur> = new BehaviorSubject(undefined);


    /**
     *methode get permettant d'avoir accès au subject _subConnecte
     */
    get subConnecte(): Observable<Utilisateur> {
        return this._subConnecte.asObservable();
    }

    /**
     * Cette methode permet de s'authentifier auprès du back via une requete POST contenant l'identifiant et le mot de passe
     * renseignés dans le formulaire de la page /login.
     * Si la requete d'authentification ne renvoi pas d'erreur alors une nouvelle requete Get est générée pour obtenir l'object Utilisateur Connecté
     * Cette utilisateur est transmis aux autres composants via _subConnecte qui est un BehaviorSubject
     *
     */
    authentification(nomUtilisateur, motDePasse): Observable<Utilisateur> {

        return this.http
            .post(URL_BACKEND + '/auth',
                {
                    identifiant: nomUtilisateur,
                    mdp: motDePasse
                },
                httpOptions
            )
            .pipe(flatMap(() => {
                return this.http.get<Utilisateur>(`${URL_BACKEND}/auth/user`, { withCredentials: true });
            }), tap((utilisateur) => {
                this._subConnecte.next(utilisateur);
            })
            );

    }

    /**
     * permet de deconnecter l’utilisateur
     */
    deconnexion(): Observable<void> {
        return this.http.post<void>(environment.backendUrl + '/logout', {}, httpOptions).pipe(tap(() => this._subConnecte.next(undefined)));
    }
}
