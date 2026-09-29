import http from "../http-common";

let root = "/ruoli.php";

const getRuoli = (token: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getRuoli"], ["pagina", pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getRuolo = (token: any, idTipoRuolo: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getRuolo"], ["idTipoRuolo", idTipoRuolo]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const inserisciRuolo = (token: any, jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "inserisciRuolo"]]);
    const headers = {
        token: token,
    }

    return http.post(root, jsonBody, { params, headers });
}

const modificaRuolo = (token: any, jsonBody: any, idTipoRuolo: any) => {
    const params = new URLSearchParams([["nomeMetodo", "modificaRuolo"], ["idTipoRuolo", idTipoRuolo]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}

const eliminaRuolo = (token: any, idTipoRuolo: any) => {
    const params = new URLSearchParams([["nomeMetodo", "eliminaRuolo"], ["idTipoRuolo", idTipoRuolo]]);
    const headers = {
        token: token,
    }

    return http.delete(root, { params, headers });
}

const associaRuoloUtente = (token: any, jsonBody: any, idTipoRuolo: any, idUtente: any) => {
    const params = new URLSearchParams([["nomeMetodo", "associaRuoloUtente"], ["idTipoRuolo", idTipoRuolo],["idUtente", idUtente]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}

const dissociaRuoloUtente = (token: any, jsonBody: any, idTipoRuolo: any, idUtente: any) => {
    const params = new URLSearchParams([["nomeMetodo", "dissociaRuoloUtente"], ["idTipoRuolo", idTipoRuolo],["idUtente", idUtente]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}

const getUtentiPerRuolo = (token: any, idTipoRuolo: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getUtentiPerRuolo"], ["idTipoRuolo", idTipoRuolo],["pagina", pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const associaRuoloRisorsa = (token: any, jsonBody: any, idTipoRuolo: any, idRisorsa: any) => {
    const params = new URLSearchParams([["nomeMetodo", "associaRuoloRisorsa"], ["idTipoRuolo", idTipoRuolo],["idRisorsa", idRisorsa]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}

const dissociaRuoloRisorsa = (token: any, jsonBody: any, idTipoRuolo: any, idRisorsa: any) => {
    const params = new URLSearchParams([["nomeMetodo", "dissociaRuoloRisorsa"], ["idTipoRuolo", idTipoRuolo],["idRisorsa", idRisorsa]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}

const getRisorsePerRuolo = (token: any, idTipoRuolo: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getRisorsePerRuolo"], ["idTipoRuolo", idTipoRuolo],["pagina", pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const associaRuoloVoceMenu = (token: any, jsonBody: any, idTipoRuolo: any, idVoceMenu: any) => {
    const params = new URLSearchParams([["nomeMetodo", "associaRuoloVoceMenu"], ["idTipoRuolo", idTipoRuolo],["idVoceMenu", idVoceMenu]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}

const dissociaRuoloVoceMenu = (token: any, jsonBody: any, idTipoRuolo: any, idVoceMenu: any) => {
    const params = new URLSearchParams([["nomeMetodo", "dissociaRuoloVoceMenu"], ["idTipoRuolo", idTipoRuolo],["idVoceMenu", idVoceMenu]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}

const getVociMenuPerRuolo = (token: any, idTipoRuolo: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getVociMenuPerRuolo"], ["idTipoRuolo", idTipoRuolo],["pagina", pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}


const ruoliService = {
    getRuoli,
    getRuolo,
    inserisciRuolo,
    modificaRuolo,
    eliminaRuolo,
    associaRuoloUtente,
    dissociaRuoloUtente,
    getUtentiPerRuolo,
    associaRuoloRisorsa,
    dissociaRuoloRisorsa,
    getRisorsePerRuolo,
    associaRuoloVoceMenu,
    dissociaRuoloVoceMenu,
    getVociMenuPerRuolo

};
export default ruoliService;