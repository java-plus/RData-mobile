import {Component, OnInit} from '@angular/core';
import {FavorisService} from '../services/favoris.service';
import Favori from '../model/Favori';
import {MesureMeteo} from '../model/MesureMeteo';
import {MesurePollution} from '../model/MesurePollution';
import {zip} from 'rxjs';

interface FavorisCourant {
    mesureMeteo: MesureMeteo;
    mesurePollution: MesurePollution[];
}

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


    listeObjetFavori: ObjetFavoris[] = [];
    messageError: string;
    favoriCourant: FavorisCourant;


    constructor(private favorisService: FavorisService) {
    }

    ngOnInit() {
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

    recupererMesurePollutionAvecNom(nom: string): MesurePollution {
        return this.favoriCourant.mesurePollution.find(mesureP => mesureP.typeDeDonnee === nom);
    }

    recupererMesureFavori(codeCommune: string) {
        const mesure: FavorisCourant = {mesureMeteo: undefined, mesurePollution: []};
        zip(this.favorisService.recupererMesuresMeteo(codeCommune), this.favorisService.recupererMesuresPollution(codeCommune))
            .subscribe(([mesureM, mesureP]) => {
                mesure.mesureMeteo = mesureM;
                mesure.mesurePollution = mesureP;
                this.favoriCourant = mesure;
            });
    }

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


