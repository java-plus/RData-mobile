import {Component, OnInit} from '@angular/core';
import {CommunesService} from '../../services/commune.service';
import CreationFavori from '../../model/CreationFavori';
import {FavorisService} from '../../services/favoris.service';
import {Router} from '@angular/router';

/**
 * interface representant une commune pour la création d’un favori
 */
interface CommuneGeoApi {
    nom: string;
    code: string;
}

/**
 * classe gérant les traitements pour la création d’un favori
 */
@Component({
    selector: 'app-creation-favoris',
    templateUrl: './creation-favoris.page.html',
    styleUrls: ['./creation-favoris.page.scss'],
})
export class CreationFavorisPage implements OnInit {
    /**
     * indique si la liste d’autocompletion est affiché ou non
     */
    isItemAvailable: boolean;
    /**
     * represente la liste des communes présentes dans l’autocompletion
     */
   items: CommuneGeoApi[];
    /**
     * correspond à la value de la searchBar
     */
    valueSearchBar: string;
    /**
     * message d’erreur qui s’affichera en cas d’erreur
     */
    messageErreur: string;
    /**
     * represente le favori que l’utilisateur veut créer
     */
    creationFavori: CreationFavori;


    constructor(private communeService: CommunesService, private favoriService: FavorisService, private router: Router) {
    }

    /**
     * initialise la creation du favoni
     */
    ngOnInit() {
        this.initialisationCreationFavori();
    }

    initialisationCreationFavori(): void {
        this.creationFavori = {
            codeCommune: null,
            weatherIcon: false,
            weatherDescription: false,
            temperature: false,
            tempMin: false,
            tempMax: false,
            humidity: false,
            pressure: false,
            windDegrees: false,
            windSpeed: false,
            mesureO3: false,
            mesureNO2: false,
            mesurePM25: false,
            mesurePM10: false,
            mesureSO2: false,
            mesureCO: false,
            population: false
        };
    }

    /**
     * méthode appelé lorsque l’utilisateur écrit dans la barre de recherche, permet d’alimenter la liste d’autocomplétion
     * @param ev evenement source
     */
    getItems(ev: any) {

        const val = ev.target.value;

        if (val && val.trim() !== '') {
            this.isItemAvailable = true;
            this.communeService.chercherCommunes(val).subscribe((listeCommune) => this.items = listeCommune);
        }
    }

  /**
   * méthode appelé lorsque l’utilisateur clique sur une commune de la liste d’autocompletion. Ferme la liste d’autocompletion, met à jour
   * la value de la search bar et renseigne le code commune choisi dans creationFavori
   * @param commune commune sélectionné par l’utilisateur
   */
  choixCommune(commune: CommuneGeoApi) {
        this.isItemAvailable = false;
        this.valueSearchBar = commune.nom;
        this.creationFavori.codeCommune = commune.code;
    }

  /**
   * vérifie qu’au moins une mesure à été sélectionné par l’utilisateur
   */
    auMoinsUneMesureSeletionnee() {
        return this.creationFavori.population || this.creationFavori.mesureCO || this.creationFavori.mesureNO2
            || this.creationFavori.mesurePM10 || this.creationFavori.mesurePM25 || this.creationFavori.mesureSO2
            || this.creationFavori.mesureO3 || this.creationFavori.pressure || this.creationFavori.windSpeed
            || this.creationFavori.windDegrees || this.creationFavori.windSpeed || this.creationFavori.tempMax
            || this.creationFavori.tempMin || this.creationFavori.temperature || this.creationFavori.weatherDescription
            || this.creationFavori.weatherIcon || this.creationFavori.humidity;
    }

  /**
   * appelle le service pour enregistrer le favori et redirige vers la page de favori ou affiche le message d’erreur si un problème est
   * survenu
   */
  engistrerFavori() {
        this.favoriService.enregistrerFavori(this.creationFavori).subscribe((favori) => {
                this.initialisationCreationFavori();
                this.router.navigate(['/secure/favoris']);
            },
            (err) => this.messageErreur = 'Une erreur est survenue lors de la création du favori.');
    }
}
