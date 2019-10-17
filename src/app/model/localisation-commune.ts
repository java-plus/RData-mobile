export interface LocalisationCommune {
    type: string;
    version: string;
    features: Feature[];
    attribution: string;
    licence: string;
    limit: number;
}

interface Feature {
    type: string;
    geometry: Geometry;
    properties: Properties;
}

interface Properties {
    label: string;
    score: number;
    housenumber: string;
    id: string;
    type: string;
    name: string;
    postcode: string;
    citycode: string;
    x: number;
    y: number;
    city: string;
    context: string;
    importance: number;
    street: string;
    distance: number;
}

interface Geometry {
    type: string;
    coordinates: number[];
}