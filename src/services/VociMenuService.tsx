import http from "../http-common";

let root = "/vociMenu.php";

const getVociMenuPerUtente = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getVociMenuPerUtente"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getVociMenu = (token: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getVociMenu"], ["pagina", pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const eliminaVoceMenu = (token: any, idVoceMenu: any) => {
    const params = new URLSearchParams([["nomeMetodo", "eliminaVoceMenu"], ["idVoceMenu", idVoceMenu]]);
    const headers = {
        token: token,
    }

    return http.delete(root, { params, headers });
}

const getVoceMenu = (token: any, idVoceMenu: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getVoceMenu"], ["idVoceMenu", idVoceMenu]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const inserisciVoceMenu = (token: any, jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "inserisciVoceMenu"]]);
    const headers = {
        token: token,
    }

    return http.post(root, jsonBody, { params, headers });
}

const modificaVoceMenu = (token: any, jsonBody: any, idVoceMenu: any) => {
    const params = new URLSearchParams([["nomeMetodo", "modificaVoceMenu"], ["idVoceMenu", idVoceMenu]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}

const vociMenuService = {
    getVociMenuPerUtente,
    getVociMenu,
    eliminaVoceMenu,
    getVoceMenu,
    inserisciVoceMenu,
    modificaVoceMenu
};
export default vociMenuService;