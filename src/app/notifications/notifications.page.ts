import { Component, OnInit } from '@angular/core';
import Favori from '../model/Favori';
import {GeolocalisationService} from '../services/geocalisation.service';

/**
 * represente un objet de la liste de notification
 */
interface ObjetNotification {
  notification: Notification;
  expanded: boolean;
}


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  /**
   * liste de Notification
   */
  listeNotifications: ObjetNotification[] = [];
  /**
   * message d’erreur
   */
  messageError: string;

  constructor(private geolocService: GeolocalisationService) { }

  ngOnInit() {
    this.geolocService.recupererGeoLocEtCommune().subscribe((infosCommune) => {
      const stringLocalisation = infosCommune.features[0].properties.context.split(',').map(chaine => chaine.trim());
      const codeCommune = infosCommune.features[0].properties.citycode;
      const codeDepartement = stringLocalisation[1];
      const codeRegion = stringLocalisation[2];

    });

  }


  /**
   * fonction déclenché lorsque l’on clique sur une notification pour l’ouvrir ou le fermer
   * @param objetNotification notification selectionné par l’utilisateur
   */
  expandItem(objetNotification): void {
    if (objetNotification.expanded) {
      objetNotification.expanded = false;
    } else {
      this.listeNotifications.map(objNot => {
        if (objetNotification === objNot) {
          objNot.expanded = !objNot.expanded;
        } else {
          objNot.expanded = false;
        }
        return objNot;
      });
    }
  }
}
