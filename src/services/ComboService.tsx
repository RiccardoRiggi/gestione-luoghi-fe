import http from "../http-common";

let root = "/combo.php";

const getComboVociMenu = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getComboVociMenu"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getComboRuoli = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getComboRuoli"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getComboTipoSegnaposto = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getComboTipoSegnaposto"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const comboService = {
    getComboVociMenu,
    getComboRuoli,
    getComboTipoSegnaposto
};
export default comboService;