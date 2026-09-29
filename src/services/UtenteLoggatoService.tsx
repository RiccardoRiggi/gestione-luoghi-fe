import http from "../http-common";

let root = "/utenteLoggato.php";

const getChiaveGlobale = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getChiaveGlobale"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getUtenteLoggato = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getUtenteLoggato"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const invalidaToken = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "invalidaToken"]]);
    const headers = {
        token: token,
    }

    let config = { params, headers };

    return http.put(root, null, config);
}

const verificaAutenticazione = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "verificaAutenticazione"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getStoricoAccessi = (token: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getStoricoAccessi"], ["pagina", pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const generaCodiciBackup = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "generaCodiciBackup"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getMetodiAutenticazionePerUtenteLoggato = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getMetodiAutenticazionePerUtenteLoggato"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const abilitaTipoMetodoLogin = (token: any, idTipoMetodoLogin: any) => {
    const params = new URLSearchParams([["nomeMetodo", "abilitaTipoMetodoLogin"], ["idTipoMetodoLogin", idTipoMetodoLogin]]);
    const headers = {
        token: token,
    }

    let config = { params, headers };

    return http.put(root, null, config);
}

const disabilitaTipoMetodoLogin = (token: any, idTipoMetodoLogin: any) => {
    const params = new URLSearchParams([["nomeMetodo", "disabilitaTipoMetodoLogin"], ["idTipoMetodoLogin", idTipoMetodoLogin]]);
    const headers = {
        token: token,
    }

    let config = { params, headers };

    return http.put(root, null, config);
}

const getMetodiRecuperoPasswordPerUtenteLoggato = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getMetodiRecuperoPasswordPerUtenteLoggato"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const abilitaTipoRecuperoPassword = (token: any, idTipoMetodoRecPsw: any) => {
    const params = new URLSearchParams([["nomeMetodo", "abilitaTipoRecuperoPassword"], ["idTipoMetodoRecPsw", idTipoMetodoRecPsw]]);
    const headers = {
        token: token,
    }

    let config = { params, headers };

    return http.put(root, null, config);
}

const disabilitaTipoRecuperoPassword = (token: any, idTipoMetodoRecPsw: any) => {
    const params = new URLSearchParams([["nomeMetodo", "disabilitaTipoRecuperoPassword"], ["idTipoMetodoRecPsw", idTipoMetodoRecPsw]]);
    const headers = {
        token: token,
    }

    let config = { params, headers };

    return http.put(root, null, config);
}

const aggiornaSottoscrizione = (token: any, jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "aggiornaSottoscrizione"]]);
    const headers = {
        token: token,
    }

    return http.post(root, jsonBody, { params, headers });
}

const utenteLoggatoService = {
    getUtenteLoggato,
    invalidaToken,
    verificaAutenticazione,
    getStoricoAccessi,
    generaCodiciBackup,
    getMetodiAutenticazionePerUtenteLoggato,
    abilitaTipoMetodoLogin,
    disabilitaTipoMetodoLogin,
    getMetodiRecuperoPasswordPerUtenteLoggato,
    abilitaTipoRecuperoPassword,
    disabilitaTipoRecuperoPassword,
    getChiaveGlobale,
    aggiornaSottoscrizione
};
export default utenteLoggatoService;