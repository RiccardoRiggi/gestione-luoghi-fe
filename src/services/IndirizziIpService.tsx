import http from "../http-common";

let root = "/indirizziIp.php";

const getIndirizziIp = (token: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getIndirizziIp"], ["pagina", pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const sbloccaIndirizzoIp = (token: any, jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "sbloccaIndirizzoIp"]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}

const bloccaIndirizzoIp = (token: any, jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "bloccaIndirizzoIp"]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}

const azzeraContatoreAlert = (token: any, jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "azzeraContatoreAlert"]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}

const indirizziIpService = {
    getIndirizziIp,
    sbloccaIndirizzoIp,
    bloccaIndirizzoIp,
    azzeraContatoreAlert
};
export default indirizziIpService;