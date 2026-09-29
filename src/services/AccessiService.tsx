import http from "../http-common";

let root = "/gestioneAccessi.php";

const getListaAccessi = (token: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getListaAccessi"], ["pagina", pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const terminaAccesso = (token: any, jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "terminaAccesso"]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}

const gestioneAccessiService = {
    getListaAccessi,
    terminaAccesso
};
export default gestioneAccessiService;