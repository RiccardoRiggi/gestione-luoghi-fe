import http from "../http-common";

let root = "/statistiche.php";

const getStatisticheMetodi = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getStatisticheMetodi"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getNumeroVociMenu = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getNumeroVociMenu"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getNumeroRuoli = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getNumeroRuoli"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getNumeroUtenti = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getNumeroUtenti"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getNumeroAccessiAttivi = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getNumeroAccessiAttivi"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getNumeroRisorse = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getNumeroRisorse"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getNumeroLogin = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getNumeroLogin"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getNumeroIndirizziIp = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getNumeroIndirizziIp"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getNumeroDispositiviFisiciAttivi = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getNumeroDispositiviFisiciAttivi"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}


const statisticheService = {
    getStatisticheMetodi,
    getNumeroVociMenu,
    getNumeroRuoli,
    getNumeroUtenti,
    getNumeroAccessiAttivi,
    getNumeroRisorse,
    getNumeroLogin,
    getNumeroIndirizziIp,
    getNumeroDispositiviFisiciAttivi   
};
export default statisticheService;