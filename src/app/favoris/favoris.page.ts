import {Component, OnInit} from '@angular/core';
import {FavorisService} from '../services/favoris.service';
import Favori from '../model/Favori';
import {MesureMeteo} from '../model/MesureMeteo';
import {MesurePollution} from '../model/MesurePollution';
import {Subscription, zip} from 'rxjs';
import {Router} from '@angular/router';

/**
 * interface representant les données du favori qui est actuellement visible par l’utilisateur
 */
interface FavorisCourant {
    /**
     * ensemble des mesures météo du favori
     */
    mesureMeteo: MesureMeteo;
    /**
     * ensemble des mesures pollution du favori
     */
    mesurePollution: MesurePollution[];
}

/**
 * represente un objet de la liste de favori
 */
interface ObjetFavoris {
    favori: Favori;
    expanded: boolean;
}

@Component({
    selector: 'app-favoris',
    templateUrl: './favoris.page.html',
    styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit {

    /**
     * liste de favoris
     */
    listeObjetFavori: ObjetFavoris[] = [];
    /**
     * message d’erreur
     */
    messageError: string;
    /**
     * les données du favori actuellement selectionné
     */
    favoriCourant: FavorisCourant;
    /**
     * css permettant de faire la rotation de l'icon indiquant la direction du vent en
     */
    cssRotationIcon: string;

    /**
     * subject transferant les favoris
     */
    favoriSub: Subscription;


    constructor(private favorisService: FavorisService, private router: Router) {
    }

    ngOnInit() {
        this.favoriSub = this.favorisService.favoriSub.subscribe(fav => {
            this.listeObjetFavori.push({
                    favori: fav,
                    expanded: false
                });
            console.log(fav);
        });

        /**
         * récuperation des favoris de l’utilisateur courant
         */
        this.favorisService.recupererFavorisUserConnecte().subscribe((listeFavori) => {
                this.listeObjetFavori = listeFavori.map((fav) => {
                    return {favori: fav, expanded: false};
                });
            }, error => {
                if (error.status === 500) {
                    this.listeObjetFavori = [];
                    this.messageError = 'Vous n’avez pas encore de favoris';
                } else {
                    this.messageError = 'Une erreur est survenue lors de la récuperation de vos favoris';
                }
            }
        );

    }


    /**
     * permet de récuperer les données d’un polluant à partir de son nom
     * @param nom du polluant
     */
    recupererMesurePollutionAvecNom(nom: string): MesurePollution {
        return this.favoriCourant.mesurePollution.find(mesureP => mesureP.typeDeDonnee === nom);
    }

    /**
     * recuperation de l’ensemble des mesures météo et pollution d’une commune
     * @param codeCommune code d’une commune
     */
    recupererMesureFavori(codeCommune: string) {
        const mesure: FavorisCourant = {mesureMeteo: undefined, mesurePollution: []};
        zip(this.favorisService.recupererMesuresMeteo(codeCommune), this.favorisService.recupererMesuresPollution(codeCommune))
            .subscribe(([mesureM, mesureP]) => {
                mesure.mesureMeteo = mesureM;
                mesure.mesurePollution = mesureP;
                this.favoriCourant = mesure;
                this.cssRotationIcon = 'rotate(' + (this.favoriCourant.mesureMeteo.windDegrees + 180).toString() + 'deg)';

            });
    }

    /**
     * redirige vers la page de creation de favori
     */
    creerFavori() {
        this.router.navigate(['/secure/favoris/creation-favoris']);
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

    /**
     * fait une demande de supression de favori
     * @param objetFavori favori selectionné
     */
    supprimerFavori(objetFavori: ObjetFavoris) {
        this.favorisService.supprimerFavori(objetFavori.favori.id).subscribe(
            () => this.listeObjetFavori = this.listeObjetFavori.filter((fav) => fav.favori.id !== objetFavori.favori.id));

    }


}


