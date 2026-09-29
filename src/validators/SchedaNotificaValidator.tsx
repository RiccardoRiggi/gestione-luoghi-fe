
export default function SchedaNotificaValidator(notifica: any) {
    let errors: any = {};

    if (notifica == undefined || notifica.titolo == null || notifica.titolo == "") {
        errors.titolo = "Il titolo è richiesto";
    }

    
    if (notifica == undefined || notifica.testo == null || notifica.testo == "") {
        errors.testo = "Il testo è richiesta";
    }    

    return errors;
} 