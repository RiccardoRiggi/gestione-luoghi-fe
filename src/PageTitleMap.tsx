export default function PageTitleMap(pathName: any) {
  console.info(pathName);

  if ("/" === pathName) {
    return "Homepage"
  } else if ("/pannello-di-controllo" === pathName) {
    return "Pannello di controllo"
  } else if ("/pannello-di-controllo/impostazioni" === pathName) {
    return "Impostazioni utente"
  } else if ("/pannello-di-controllo/logs/error" === pathName) {
    return "Log livello error"
  } else if ("/pannello-di-controllo/logs/warn" === pathName) {
    return "Log livello warn"
  } else if ("/pannello-di-controllo/logs/info" === pathName) {
    return "Log livello info"
  } else if ("/pannello-di-controllo/logs/debug" === pathName) {
    return "Log livello debug"
  } else if ("/pannello-di-controllo/logs" === pathName) {
    return "Log"
  } else if ("/pannello-di-controllo/lista-menu" === pathName) {
    return "Lista voci di menu"
  } else if ("/pannello-di-controllo/lista-notifiche-utente" === pathName) {
    return "Lista notifiche"
  } else if ("/pannello-di-controllo/scheda-utente" === pathName || pathName.includes("scheda-utente")) {
    return "Scheda utente"
  } else if ("/pannello-di-controllo/lista-utenti" === pathName) {
    return "Lista utenti"
  } else if ("/pannello-di-controllo/lista-ruoli" === pathName) {
    return "Lista ruoli"
  } else if ("/pannello-di-controllo/scheda-ruolo" === pathName || pathName.includes("scheda-ruolo")) {
    return "Scheda ruolo"
  } else if ("/pannello-di-controllo/lista-risorse" === pathName) {
    return "Lista risorse"
  } else if (pathName.includes("scheda-risorsa")) {
    return "Scheda risorsa"
  } else if ("/pannello-di-controllo/lista-indirizzi-ip" === pathName) {
    return "Lista indirizzi IP"
  } else if ("/pannello-di-controllo/lista-dispositivi-fisici" === pathName) {
    return "Lista dispositivi fisici"
  } else if (pathName.includes("scheda-voce-menu")) {
    return "Scheda voce menu"
  } else if (pathName.includes("scheda-notifica")) {
    return "Scheda notifica"
  } else if ("/pannello-di-controllo/lista-notifiche" === pathName) {
    return "Lista notifiche"
  } else if ("/pannello-di-controllo/lista-accessi" === pathName) {
    return "Lista accessi"
  } else if (pathName.includes("scheda-tipo-segnaposto")) {
    return "Scheda tipo segnaposto"
  } else if ("/lista-tipi-segnaposto" === pathName) {
    return "Lista tipi segnaposto"
  } else if (pathName.includes("scheda-segnaposto")) {
    return "Scheda luogo"
  } else if ("/lista-segnaposti" === pathName) {
    return "Lista luoghi"
  } else if ("/lista-segnaposti/filtro" === pathName) {
    return "Filtro luoghi"
  } else if ("/lista-segnaposti/report" === pathName) {
    return "Report luoghi"
  } {
    return "";
  }
}