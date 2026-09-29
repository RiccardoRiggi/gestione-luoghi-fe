export default function SchedaRisorsaValidator(risorsa: any) {
    let errors: any = {};

    if (risorsa == undefined || risorsa.idRisorsa == null || risorsa.idRisorsa == "") {
        errors.idRisorsa = "L'identificativo è richiesto";
    }

    if (risorsa == undefined || risorsa.nomeMetodo == null || risorsa.nomeMetodo == "") {
        errors.nomeMetodo = "Il nome del metodo è richiesta";
    }
    
    if (risorsa == undefined || risorsa.descrizione == null || risorsa.descrizione == "") {
        errors.descrizione = "La descrizione è richiesta";
    }

    return errors;
} 