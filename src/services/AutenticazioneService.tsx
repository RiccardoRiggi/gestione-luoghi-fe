import http from "../http-common";

let root = "/autenticazione.php";



const getMetodiAutenticazioneSupportati = (jsonBody: any, preToken: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getMetodiAutenticazioneSupportati"]]);
    return http.post(root, jsonBody, { params, headers: { "PRETOKEN": preToken } });
}

const effettuaAutenticazione = (jsonBody: any, preToken: any) => {
    const params = new URLSearchParams([["nomeMetodo", "effettuaAutenticazione"]]);
    return http.post(root, jsonBody, { params, headers: { "PRETOKEN": preToken } });
}

const confermaAutenticazione = (jsonBody: any, preToken: any) => {
    const params = new URLSearchParams([["nomeMetodo", "confermaAutenticazione"]]);
    return http.post(root, jsonBody, { params, headers: { "PRETOKEN": preToken } });
}

const generaQrCode = (preToken: any) => {
    const params = new URLSearchParams([["nomeMetodo", "generaQrCode"]]);
    return http.get(root, { params, headers: { "PRETOKEN": preToken } });
}

const recuperaTokenDaQrCode = (idQrCode: any, preToken: any) => {
    const params = new URLSearchParams([["nomeMetodo", "recuperaTokenDaQrCode"], ["idQrCode", idQrCode]]);
    return http.get(root, { params, headers: { "PRETOKEN": preToken } });
}

const recuperaTokenDaLogin = (idLogin: any, preToken: any) => {
    const params = new URLSearchParams([["nomeMetodo", "recuperaTokenDaLogin"], ["idLogin", idLogin]]);
    return http.get(root, { params, headers: { "PRETOKEN": preToken } });
}

const generaPreToken = (totp: any) => {
    const params = new URLSearchParams([["nomeMetodo", "generaPreToken"]]);
    return http.get(root, { params, headers: { "TOTP": totp } });
}


const autenticazioneService = {
    getMetodiAutenticazioneSupportati,
    generaQrCode,
    recuperaTokenDaQrCode,
    effettuaAutenticazione,
    recuperaTokenDaLogin,
    confermaAutenticazione,
    generaPreToken

};
export default autenticazioneService;