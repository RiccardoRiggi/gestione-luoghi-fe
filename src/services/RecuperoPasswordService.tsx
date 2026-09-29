import http from "../http-common";

let root = "/recuperoPassword.php";



const getMetodiRecuperoPasswordSupportati = (jsonBody: any, preToken: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getMetodiRecuperoPasswordSupportati"]]);
    return http.post(root, jsonBody, { params, headers: { "PRETOKEN": preToken } });
}

const effettuaRichiestaRecuperoPassword = (jsonBody: any, preToken: any) => {
    const params = new URLSearchParams([["nomeMetodo", "effettuaRichiestaRecuperoPassword"]]);
    return http.post(root, jsonBody, { params, headers: { "PRETOKEN": preToken } });
}

const confermaRecuperoPassword = (jsonBody: any, preToken: any) => {
    const params = new URLSearchParams([["nomeMetodo", "confermaRecuperoPassword"]]);
    return http.post(root, jsonBody, { params, headers: { "PRETOKEN": preToken } });
}


const recuperoPasswordService = {
    getMetodiRecuperoPasswordSupportati,
    effettuaRichiestaRecuperoPassword,
    confermaRecuperoPassword
};
export default recuperoPasswordService;