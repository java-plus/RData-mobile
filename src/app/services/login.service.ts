import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import Utilisateur from '../model/Utilisateur';
import { Router } from '@angular/router';
import {catchError, flatMap, tap} from 'rxjs/operators';

const URL_BACKEND = environment.backendUrl;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient, private router: Router) { }

  private _subConnecte: BehaviorSubject<Utilisateur> = new BehaviorSubject(undefined);

  get subConnecte(): Observable<Utilisateur> {
    return this._subConnecte.asObservable();
  }

  authentification(nomUtilisateur, motDePasse): Observable<Utilisateur>{

    return this.http
      .post(URL_BACKEND + '/auth',
        {
          identifiant: nomUtilisateur,
          mdp: motDePasse
        },
        httpOptions
      )
      .pipe(flatMap(() => {
        return this.http.get<Utilisateur>(`${URL_BACKEND}/auth/user`, {withCredentials: true});
      }), tap((utilisateur) => {
          this._subConnecte.next(utilisateur);
          this.router.navigate(['accueil']);
        })
      );

  }
}
