export default function SchedaVoceMenuValidator(voceMenu: any) {
    let errors: any = {};

    if (voceMenu == undefined || voceMenu.descrizione == null || voceMenu.descrizione == "") {
        errors.descrizione = "La descrizione è richiesta";
    }

    if (voceMenu == undefined || voceMenu.path == null || voceMenu.path == "") {
        errors.path = "Il path è richiesta";
    }

    if (voceMenu == undefined || voceMenu.icona == null || voceMenu.icona == "") {
        errors.icona = "L'icona è richiesta";
    }

    if (voceMenu == undefined || voceMenu.ordine == null || voceMenu.ordine == "") {
        errors.ordine = "L'ordine è richiesto";
    }

    return errors;
} 