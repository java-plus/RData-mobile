enum Type {
    METEO = 'METEO', POLLUTION = 'POLLUTION'
}


export default interface Notification {



    /**
     * id : Integer représente l'id de l'alerte. Cette valeur est créée par
     * Spring au moment de l'insertion en base de donnée
     */

    id: number;
    /**
     * region : String représente la région sélectionné lors de la création de
     * l'alerte
     */
    region: string;
    /**
     * departement : String représente le département sélectionné lors de la
     * création de l'alerte
     */
    departement: string;

    /**
     * codeCommune : String représente la commune sélectionné lors de la
     * création de l'alerte
     */
codeCommune: string;
    /**
     * type représente le type sélectionné lors de la création de
     * l'alerte, ce type est une énumération équivalente à METEO ou POLUUTION
     */


    type: Type;
    /**
     * message représente le message qui sera affiché à l'utilisateur
     * recevant cette alerte
     */
    message: string;
    /**
     * dateDebut  représente la date de début sélectionné lors de
     * la création de l'alerte, à partir de cette date l'alerte peut être
     * envoyée à l'utilisateur
     */

    dateDebut: Date;
    /**
     * dateFin  représente la date de fin sélectionné lors de la
     * création de l'alerte, à partir de cette date l'alerte ne sera plus
     * envoyée à l'utilisateur
     */
    dateFin: Date;

}

