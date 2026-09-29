
export default function SchedaTipoSegnapostoValidator(ruolo: any) {
    let errors: any = {};

    if (ruolo === undefined || ruolo.idTipoSegnaposto === null || ruolo.idTipoSegnaposto === "") {
        errors.idTipoSegnaposto = "L'identificativo è richiesto";
    }

    if (ruolo === undefined || ruolo.nome === null || ruolo.nome === "") {
        errors.nome = "Il nome è richiesto";
    }   
    
    if (ruolo === undefined || ruolo.descrizione === null || ruolo.descrizione === "") {
        errors.descrizione = "La descrizione è richiesta";
    }  
    
    if (ruolo === undefined || ruolo.icona === null || ruolo.icona === "") {
        errors.icona = "L'icona è richiesta";
    }  

    return errors;
} 