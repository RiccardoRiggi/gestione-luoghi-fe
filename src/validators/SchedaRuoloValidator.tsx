
export default function SchedaRuoloValidator(ruolo: any) {
    let errors: any = {};

    if (ruolo == undefined || ruolo.idTipoRuolo == null || ruolo.idTipoRuolo == "") {
        errors.idTipoRuolo = "L'identificativo è richiesto";
    }

    
    if (ruolo == undefined || ruolo.descrizione == null || ruolo.descrizione == "") {
        errors.descrizione = "La descrizione è richiesta";
    }    

    return errors;
} 