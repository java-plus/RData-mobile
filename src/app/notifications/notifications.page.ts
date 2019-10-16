import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  /**
   * liste de favoris
   */
  listeNotifications: Notifi[] = [];
  /**
   * message d’erreur
   */
  messageError: string;

  constructor() { }

  ngOnInit() {
  }


  /**
   * fonction déclenché lorsque l’on clique sur un favori pour l’ouvrir ou le fermer
   * et déclenche la récuperation des mesures météo et pollution
   * @param objetFavori favori selectionné par l’utilisateur
   */
  expandItem(objetFavori): void {
    this.recupererMesureFavori(objetFavori.favori.commune.codeCommune);
    if (objetFavori.expanded) {
      objetFavori.expanded = false;
    } else {
      this.listeObjetFavori.map(objFav => {
        if (objetFavori === objFav) {
          objFav.expanded = !objFav.expanded;
        } else {
          objFav.expanded = false;
        }
        return objFav;
      });
    }
  }
}
