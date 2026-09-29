export default function SchedaSegnapostoValidator(voceMenu: any) {
    let errors: any = {};

    if (voceMenu === undefined || voceMenu.idTipoSegnaposto === null || voceMenu.idTipoSegnaposto === "") {
        errors.idTipoSegnaposto = "La categoria è richiesta";
    }

    if (voceMenu === undefined || voceMenu.nome === null || voceMenu.nome === "") {
        errors.nome = "Il nome è richiesto";
    }

    if (voceMenu === undefined || voceMenu.descrizione === null || voceMenu.descrizione === "") {
        errors.descrizione = "La descrizione è richiesta";
    }

    if (voceMenu === undefined || voceMenu.latitudine === null || voceMenu.latitudine === "") {
        errors.latitudine = "La latitudine è richiesta";
    }

    if (voceMenu === undefined || voceMenu.longitudine === null || voceMenu.longitudine === "") {
        errors.longitudine = "La longitudine è richiesta";
    }

    
    return errors;
} 