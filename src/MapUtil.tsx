import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

export const getIcon = (nameIcona: string, color: string) => {
    return divIcon({
        html: renderToStaticMarkup(<i className={(nameIcona) + " fa-3x " + (color)} />),
        bgPos: [0, 0],
        shadowAnchor: [0, 0],
        shadowSize: [0, 0],

    });
}

export const TILE_SERVER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"