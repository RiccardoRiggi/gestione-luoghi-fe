import http from "../http-common";

let root = "/notifiche.php";

const getListaNotifiche = (token: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getListaNotifiche"], ["pagina", pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const inserisciNotifica = (token: any, jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "inserisciNotifica"]]);
    const headers = {
        token: token,
    }

    return http.post(root, jsonBody, { params, headers });
}

const modificaNotifica = (token: any, jsonBody: any, idNotifica: any) => {
    const params = new URLSearchParams([["nomeMetodo", "modificaNotifica"], ["idNotifica", idNotifica]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}

const eliminaNotifica = (token: any, idNotifica: any) => {
    const params = new URLSearchParams([["nomeMetodo", "eliminaNotifica"], ["idNotifica", idNotifica]]);
    const headers = {
        token: token,
    }

    return http.delete(root, { params, headers });
}

const getNotifica = (token: any, idNotifica: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getNotifica"], ["idNotifica", idNotifica]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getDestinatariNotifica = (token: any, pagina: any, idNotifica: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getDestinatariNotifica"], ["pagina", pagina], ["idNotifica", idNotifica]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const inviaNotificaTutti = (token: any, idNotifica: any, invioViaTelegram: boolean) => {
    let params = new URLSearchParams([["nomeMetodo", "inviaNotificaTutti"], ["idNotifica", idNotifica]]);

    if (invioViaTelegram) {
        params = new URLSearchParams([["nomeMetodo", "inviaNotificaTutti"], ["idNotifica", idNotifica], ["invioViaTelegram", true]]);

    }
    const headers = {
        token: token,
    }

    return http.post(root, null, { params, headers });
}

const inviaNotificaRuolo = (token: any, idTipoRuolo: any, idNotifica: any, invioViaTelegram: boolean) => {
    let params = new URLSearchParams([["nomeMetodo", "inviaNotificaRuolo"], ["idTipoRuolo", idTipoRuolo], ["idNotifica", idNotifica]]);

    if (invioViaTelegram) {
        params = new URLSearchParams([["nomeMetodo", "inviaNotificaRuolo"], ["idTipoRuolo", idTipoRuolo], ["idNotifica", idNotifica], ["invioViaTelegram", true]]);
    }

    const headers = {
        token: token,
    }

    return http.post(root, null, { params, headers });
}

const inviaNotificaUtente = (token: any, idUtente: any, idNotifica: any, invioViaTelegram: boolean) => {
    let params = new URLSearchParams([["nomeMetodo", "inviaNotificaUtente"], ["idUtente", idUtente], ["idNotifica", idNotifica]]);
    if (invioViaTelegram) {
        params = new URLSearchParams([["nomeMetodo", "inviaNotificaUtente"], ["idUtente", idUtente], ["idNotifica", idNotifica], ["invioViaTelegram", true]]);
    }
    const headers = {
        token: token,
    }

    return http.post(root, null, { params, headers });
}

const getNotificaLatoUtente = (token: any, idNotifica: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getNotificaLatoUtente"], ["idNotifica", idNotifica]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getNotificheLatoUtente = (token: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getNotificheLatoUtente"], ["pagina", pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const eliminaNotificaLatoUtente = (token: any, idNotifica: any) => {
    const params = new URLSearchParams([["nomeMetodo", "eliminaNotificaLatoUtente"], ["idNotifica", idNotifica]]);
    const headers = {
        token: token,
    }

    return http.delete(root, { params, headers });
}

const leggiNotificheLatoUtente = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "leggiNotificheLatoUtente"]]);
    const headers = {
        token: token,
    }

    return http.put(root, null, { params, headers });
}


const notificheService = {
    getListaNotifiche,
    inserisciNotifica,
    modificaNotifica,
    eliminaNotifica,
    getNotifica,
    getDestinatariNotifica,
    inviaNotificaTutti,
    inviaNotificaRuolo,
    inviaNotificaUtente,
    getNotificaLatoUtente,
    getNotificheLatoUtente,
    eliminaNotificaLatoUtente,
    leggiNotificheLatoUtente

};
export default notificheService;