import http from "../http-common";

let root = "/risorse.php";

const getRisorse = (token: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getRisorse"], ["pagina", pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const eliminaRisorsa = (token: any, idRisorsa: any) => {
    const params = new URLSearchParams([["nomeMetodo", "eliminaRisorsa"], ["idRisorsa", idRisorsa]]);
    const headers = {
        token: token,
    }

    return http.delete(root, { params, headers });
}

const getRisorsa = (token: any, idRisorsa: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getRisorsa"], ["idRisorsa", idRisorsa]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const inserisciRisorsa = (token: any, jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "inserisciRisorsa"]]);
    const headers = {
        token: token,
    }

    return http.post(root, jsonBody, { params, headers });
}

const modificaRisorsa = (token: any, jsonBody: any, idRisorsa: any) => {
    const params = new URLSearchParams([["nomeMetodo", "modificaRisorsa"], ["idRisorsa", idRisorsa]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}

const risorseService = {
    getRisorse,
    eliminaRisorsa,
    getRisorsa,
    inserisciRisorsa,
    modificaRisorsa
};
export default risorseService;