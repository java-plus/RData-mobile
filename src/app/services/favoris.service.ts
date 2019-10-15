import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import Favori from '../model/Favori';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavorisService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true
  };

  constructor(private http: HttpClient) { }

  /**
   *  Méthode qui récupère du back la liste des favoris de l'utilisateur qui connecté
   * @returns  retourne un {Observable<Favori[]>}
   */
  recupererFavorisUserConnecte(): Observable<Favori[]> {
    return this.http.get<Favori[]>(`${environment.backendUrl}/favoris`, this.httpOptions);
  }
}
