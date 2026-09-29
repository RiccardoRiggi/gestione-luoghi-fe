
export default function SchedaUtenteValidator(utente: any, isInserimento: any) {
    let errors: any = {};

    if (utente == undefined || utente.nome == null || utente.nome == "") {
        errors.nome = "Il nome è richiesto";
    }

    if (utente == undefined || utente.cognome == null || utente.cognome == "") {
        errors.cognome = "Il cognome è richiesto";
    }

    if (isInserimento && (utente == undefined || utente.email == null || utente.email == "")) {
        errors.email = "L'indirizzo email è richiesto";
    }

    if (isInserimento && (utente == undefined || utente.password == null || utente.password == "")) {
        errors.password = "La password è richiesta";
    }

    if (isInserimento && (utente == undefined || utente.confermaPassword == null || utente.confermaPassword == "")) {
        errors.confermaPassword = "Il conferma password è richiesto";
    }

    if (utente !== undefined && utente.password !== utente.confermaPassword) {
        errors.password = "Le password non corrispondono";
    }



    return errors;
} 