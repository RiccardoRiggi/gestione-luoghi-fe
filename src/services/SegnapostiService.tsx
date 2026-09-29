import http from "../http-common";

let root = "/segnaposti.php";

const inserisciTipoSegnaposto = (token: any, jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "inserisciTipoSegnaposto"]]);
    const headers = {
        token: token,
    }

    return http.post(root, jsonBody, { params, headers });
}

const getTipiSegnaposto = (token: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getTipiSegnaposto"], ["pagina", pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getTipoSegnaposto = (token: any, idTipoSegnaposto: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getTipoSegnaposto"], ["idTipoSegnaposto", idTipoSegnaposto]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const eliminaTipoSegnaposto = (token: any, idTipoSegnaposto: any) => {
    const params = new URLSearchParams([["nomeMetodo", "eliminaTipoSegnaposto"], ["idTipoSegnaposto", idTipoSegnaposto]]);
    const headers = {
        token: token,
    }

    return http.delete(root, { params, headers });
}

const modificaTipoSegnaposto = (token: any, jsonBody: any, idTipoSegnaposto: any) => {
    const params = new URLSearchParams([["nomeMetodo", "modificaTipoSegnaposto"], ["idTipoSegnaposto", idTipoSegnaposto]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}

const inserisciSegnaposto = (token: any, jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "inserisciSegnaposto"]]);
    const headers = {
        token: token,
    }

    return http.post(root, jsonBody, { params, headers });
}

const modificaSegnaposto = (token: any, jsonBody: any, idSegnaposto: any) => {
    const params = new URLSearchParams([["nomeMetodo", "modificaSegnaposto"], ["idSegnaposto", idSegnaposto]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}

const eliminaSegnaposto = (token: any, idSegnaposto: any) => {
    const params = new URLSearchParams([["nomeMetodo", "eliminaSegnaposto"], ["idSegnaposto", idSegnaposto]]);
    const headers = {
        token: token,
    }

    return http.delete(root, { params, headers });
}

const getSegnaposti = (token: any, idTipoSegnaposto: any, isVisitato: any, nome: any) => {
    let paramsArray = [["nomeMetodo", "getSegnaposti"]];
    if (idTipoSegnaposto !== null) {
        paramsArray.push(["idTipoSegnaposto", idTipoSegnaposto])
    }

    if (isVisitato !== null) {
        paramsArray.push(["isVisitato", isVisitato])
    }

    if (nome !== null) {
        paramsArray.push(["nome", nome])
    }
    const params = new URLSearchParams(paramsArray);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getSegnapostiByAnno = (token: any, anno: any) => {
    let paramsArray = [["nomeMetodo", "getSegnapostiByAnno"], ["anno", anno]];

    const params = new URLSearchParams(paramsArray);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getSegnapostiByCoordinate = (token: any, lat: any, lon: any, raggio: any) => {
    let paramsArray = [["nomeMetodo", "getSegnapostiByCoordinate"], ["lat", lat], ["lon", lon], ["raggio", raggio]];

    const params = new URLSearchParams(paramsArray);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getSegnaposto = (token: any, idSegnaposto: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getSegnaposto"], ["idSegnaposto", idSegnaposto]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const segnapostiService = {
    inserisciTipoSegnaposto,
    getTipiSegnaposto,
    getSegnapostiByCoordinate,
    getSegnapostiByAnno,
    getTipoSegnaposto,
    eliminaTipoSegnaposto,
    modificaTipoSegnaposto,
    inserisciSegnaposto,
    modificaSegnaposto,
    eliminaSegnaposto,
    getSegnaposti,
    getSegnaposto
};
export default segnapostiService;