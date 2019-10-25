export class InfosPollution {


    SO2: object = {
        unite: 'µg/m3',
        description: '',
        nom: 'Dioxyde de Souffre',
        symbole: 'SO2',
        echelle: [100, 200, 350, 500]
    };

    PM10: object = {
        unite: 'µg/m3',
        description: '',
        nom: 'Particules en suspension (⌀ < 10μm)',
        symbole: 'PM10',
        echelle: [20, 40, 50, 75]
    };

    PM25: object = {
        unite: 'µg/m3',
        description: '',
        nom: 'Particules en suspension (⌀ < 2.5μm)',
        symbole: 'PM2.5',
        echelle: [10, 20, 25, 50]
    };

    CO: object = {
        unite: 'µg/m3',
        description: '',
        nom: 'Monoxyde de Carbone',
        symbole: 'CO',
        echelle: [5, 10, 25, 50],
    };

    O3: object = {
        unite: 'µg/m3',
        description: '',
        nom: 'Ozone',
        symbole: 'O3',
        echelle: [80, 120, 180, 240]
    };

    NO2: object = {
        unite: 'µg/m3',
        description: '',
        nom: `Dioxyde d'azote`,
        symbole: 'NO2',
        echelle: [20, 30, 40, 50]
    };


    constructor() { }

}
