import {Component, OnInit} from '@angular/core';
import {FavorisService} from '../services/favoris.service';
import Favori from '../model/Favori';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: [],
})
export class FavorisPage implements OnInit {

    public listeObjetFavori: { favori: Favori, expanded: boolean }[] = [];

    constructor(private favorisService: FavorisService) {
    }

    ngOnInit() {
        this.favorisService.recupererFavorisUserConnecte().subscribe((listeFavori) => {
            this.listeObjetFavori = listeFavori.map((fav) => {
                return {favori: fav, expanded: false};
            });
        });
    }

    expandItem(objetFavori): void {
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


