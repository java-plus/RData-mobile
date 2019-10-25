import { MesurePollution } from './MesurePollution';
import StationDeMesurePollution from './StationDeMesurePollution';

export class MesurePollutionDto extends MesurePollution {

    /**
     * Texte décrivant la l'appelation du symbole du polluant (par exemple 'Monoxyde de Carbone' pour CO)
     */
    texteSymbole: string;
    /**
     * Nombre allant de 0 à 4 représentant la dangerosité de la valeur
     */
    indiceDanger: number;
    /**
     * couleur correspondant au niveau de danger
     */
    indiceCouleur: string;
    /**
     * unite de mesure de la valeur (ex : μg/m3 )
     */
    uniteMesure: string;
    /**
     * echelle des valeurs du polluant
     */
    echelle: number[];
    /**
     * texte descriptif du polluant
     */
    description: string;
    /**
     * number qui sert à positionner en via css la fleche sur l'echelle
     */
    cssPositionFleche: number;

    constructor(
        id: string,
        valeur: number,
        typeDeDonnee: string,
        date: string,
        stationDeMesure: StationDeMesurePollution,
        texteSymbole: string,
        indiceDanger: number,
        indiceCouleur: string,
        uniteMesure: string,
        echelle: number[],
        cssPositionFleche: number
    ) {
        super(id, valeur, typeDeDonnee, date, stationDeMesure);
        this.texteSymbole = texteSymbole;
        this.indiceDanger = indiceDanger;
        this.indiceCouleur = indiceCouleur;
        this.uniteMesure = uniteMesure;
        this.echelle = echelle;
        this.cssPositionFleche = cssPositionFleche;
    }
}
