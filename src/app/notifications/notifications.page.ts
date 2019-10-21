import {Component, OnInit} from '@angular/core';
import {GeolocalisationService} from '../services/geolocalisation.service';
import {zip} from 'rxjs';
import {NotificationsService} from '../services/notifications.service';
import NotificationUtilisateur from '../model/NotificationUtilisateur';
import {Type} from '../model/Type';

/**
 * represente un objet de la liste de notification
 */
interface ObjetNotification {
    notification: NotificationUtilisateur;
    expanded: boolean;
}


@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.page.html',
    styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

    /**
     * liste de NotificationUtilisateur
     */
    listeNotifications: ObjetNotification[] = [];

    /**
     * message d’erreur
     */
    messageError: string;

    constructor(private geolocService: GeolocalisationService, private notifService: NotificationsService) {
    }

    ngOnInit() {
        /**
         * recupere la position gps de l’utilisateur, puis recupere ça commune, son departement puis sa region pour ensuite récuperer les
         * notifications de ces zones
         */
        this.geolocService.recupererGeoLocEtCommune().subscribe((infosCommune) => {
            if (infosCommune.features.length > 0) {
                const stringLocalisation = infosCommune.features[0].properties.context.split(',').map(chaine => chaine.trim());
                const commune = infosCommune.features[0].properties.citycode;
                const departement = stringLocalisation[1];
                const region = stringLocalisation[2];
                this.recupererNotifications(commune, departement, region).subscribe(
                    ([notifCommuneM, notifDepartementM, notifRegionM, notifCommuneP, notifDepartementP, notifRegionP]) => {
                        notifCommuneM.forEach((notif) => this.listeNotifications.push({notification: notif, expanded: false}));
                        notifDepartementM.forEach((notif) => this.listeNotifications.push({notification: notif, expanded: false}));
                        notifRegionM.forEach((notif) => this.listeNotifications.push({notification: notif, expanded: false}));
                        notifCommuneP.forEach((notif) => this.listeNotifications.push({notification: notif, expanded: false}));
                        notifDepartementP.forEach((notif) => this.listeNotifications.push({notification: notif, expanded: false}));
                        notifRegionP.forEach((notif) => this.listeNotifications.push({notification: notif, expanded: false}));
                        if (this.listeNotifications.length === 0) {
                          this.messageError = 'Vous n’avez pas de notification';
                        }
                    });
            } else {
                this.messageError = 'Impossible de definir votre position';
            }
        }, (err => this.messageError = 'Impossible de definir votre position'));
    }

    /**
     * recupere les notifications de meteo et pollution sur la commune, le departement et la region
     * @param com code commune de l’utilisateur
     * @param dep nom du departement de l’utilisateur
     * @param reg nom de la region de l’utilisateur
     */
    recupererNotifications(com: string, dep: string, reg: string) {

        return zip(this.notifService.recupererNotifications({codeCommune: com, type: Type.METEO}),
            this.notifService.recupererNotifications({departement: dep, type: Type.METEO}),
            this.notifService.recupererNotifications({region: reg, type: Type.METEO}),
            this.notifService.recupererNotifications({codeCommune: com, type: Type.POLLUTION}),
            this.notifService.recupererNotifications({departement: dep, type: Type.POLLUTION}),
            this.notifService.recupererNotifications({region: reg, type: Type.POLLUTION}));
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
