export type BreadcrumbType = {
  nome: string
  path: string
};

let homePage: BreadcrumbType =
{
  nome: "Homepage",
  path: "/"
}

let pannelloDiControllo: BreadcrumbType =
{
  nome: "Pannello di controllo",
  path: "/pannello-di-controllo"
}

let impostazioni: BreadcrumbType =
{
  nome: "Impostazioni Utente",
  path: "/pannello-di-controllo/impostazioni"
}

let visualizzaLog: BreadcrumbType =
{
  nome: "Visualizza log",
  path: "/pannello-di-controllo/logs"
}

let visualizzaLogError: BreadcrumbType =
{
  nome: "Livello Error",
  path: "/pannello-di-controllo/logs/error"
}

let visualizzaLogWarn: BreadcrumbType =
{
  nome: "Livello Warn",
  path: "/pannello-di-controllo/logs/warn"
}

let visualizzaLogInfo: BreadcrumbType =
{
  nome: "Livello Info",
  path: "/pannello-di-controllo/logs/info"
}

let visualizzaLogDebug: BreadcrumbType =
{
  nome: "Livello Debug",
  path: "/pannello-di-controllo/logs/debug"
}

let listaVociDiMenu: BreadcrumbType =
{
  nome: "Lista voci di menu",
  path: "/pannello-di-controllo/lista-menu"
}

let listaNotificheUtente: BreadcrumbType =
{
  nome: "Lista notifiche",
  path: "/pannello-di-controllo/lista-notifiche-utente"
}

let schedaUtente: BreadcrumbType =
{
  nome: "Scheda utente",
  path: "/pannello-di-controllo/scheda-utente"
}

let listaUtenti: BreadcrumbType =
{
  nome: "Lista utenti",
  path: "/pannello-di-controllo/lista-utenti"
}

let listaRuoli: BreadcrumbType =
{
  nome: "Lista ruoli",
  path: "/pannello-di-controllo/lista-ruoli"
}

let schedaRuolo: BreadcrumbType =
{
  nome: "Scheda ruolo",
  path: "/pannello-di-controllo/scheda-ruolo"
}

let listaRisorse: BreadcrumbType =
{
  nome: "Lista risorse",
  path: "/pannello-di-controllo/lista-risorse"
}

let schedaRisorsa: BreadcrumbType =
{
  nome: "Scheda risorsa",
  path: "/pannello-di-controllo/scheda-risorsa"
}

let listaIndirizziIp: BreadcrumbType =
{
  nome: "Lista indirizzi IP",
  path: "/pannello-di-controllo/lista-indirizzi-ip"
}

let listaDispositiviFisici: BreadcrumbType =
{
  nome: "Lista dispositivi fisici",
  path: "/pannello-di-controllo/lista-dispositivi-fisici"
}

let schedaVoceMenu: BreadcrumbType =
{
  nome: "Scheda voce menu",
  path: "/pannello-di-controllo/scheda-voce-menu"
}

let schedaNotifica: BreadcrumbType =
{
  nome: "Scheda notifica",
  path: "/pannello-di-controllo/scheda-notifica"
}

let listaNotifiche: BreadcrumbType =
{
  nome: "Lista notifiche",
  path: "/pannello-di-controllo/lista-notifiche"
}

let listaAccessi: BreadcrumbType =
{
  nome: "Lista accessi",
  path: "/pannello-di-controllo/lista-accessi"
}

let schedaTipoSegnaposto: BreadcrumbType =
{
  nome: "Scheda tipo segnaposto",
  path: "/scheda-tipo-segnaposto"
}

let listaTipoSegnaposto: BreadcrumbType =
{
  nome: "Lista tipi segnaposto",
  path: "/lista-tipi-segnaposto"
}

let schedaSegnaposto: BreadcrumbType =
{
  nome: "Scheda luogo",
  path: "/scheda-tipo-segnaposto"
}

let listaSegnaposto: BreadcrumbType =
{
  nome: "Lista luoghi",
  path: "/lista-segnaposti"
}

let listaSegnapostoFiltro: BreadcrumbType =
{
  nome: "Filtro luoghi",
  path: "/lista-segnaposti/filtro"
}

let listaSegnapostoReport: BreadcrumbType =
{
  nome: "Report luoghi",
  path: "/lista-segnaposti/report"
}


export default function BreadcrumbsMap(pathName: any) {
  let array: BreadcrumbType[] = [];
  array.push(homePage);

  if ("/pannello-di-controllo" === pathName) {
    array.push(pannelloDiControllo);
  }

  if ("/impostazioni" === pathName) {
    array.push(impostazioni);
  }

  if ("/pannello-di-controllo/logs/error" === pathName) {
    array.push(visualizzaLog);
    array.push(visualizzaLogError)
  }

  if ("/pannello-di-controllo/logs/warn" === pathName) {
    array.push(visualizzaLog);
    array.push(visualizzaLogWarn)
  }

  if ("/pannello-di-controllo/logs/info" === pathName) {
    array.push(visualizzaLog);
    array.push(visualizzaLogInfo)
  }

  if ("/pannello-di-controllo/logs/debug" === pathName) {
    array.push(visualizzaLog);
    array.push(visualizzaLogDebug)
  }

  if ("/pannello-di-controllo/logs" === pathName) {
    array.push(visualizzaLog);
  }

  if ("/pannello-di-controllo/lista-menu" === pathName) {
    array.push(listaVociDiMenu);
  }

  if ("/pannello-di-controllo/lista-notifiche-utente" === pathName) {
    array.push(listaNotificheUtente);
  }

  if (pathName.includes("scheda-utente")) {
    array.push(listaUtenti);
    array.push(schedaUtente);
  }

  if ("/pannello-di-controllo/lista-utenti" === pathName) {
    array.push(listaUtenti);
  }

  if ("/pannello-di-controllo/lista-ruoli" === pathName) {
    array.push(listaRuoli);
  }

  if (pathName.includes("scheda-ruolo")) {
    array.push(listaRuoli);
    array.push(schedaRuolo);
  }

  if ("/pannello-di-controllo/lista-risorse" === pathName) {
    array.push(listaRisorse);
  }

  if (pathName.includes("scheda-risorsa")) {
    array.push(listaRisorse);
    array.push(schedaRisorsa);
  }

  if ("/pannello-di-controllo/lista-indirizzi-ip" === pathName) {
    array.push(listaIndirizziIp);
  }

  if ("/pannello-di-controllo/lista-dispositivi-fisici" === pathName) {
    array.push(listaDispositiviFisici);
  }

  if (pathName.includes("scheda-voce-menu")) {
    array.push(listaVociDiMenu);
    array.push(schedaVoceMenu);
  }

  if (pathName.includes("scheda-notifica")) {
    array.push(listaNotifiche);
    array.push(schedaNotifica);
  }

  if ("/pannello-di-controllo/lista-notifiche" === pathName) {
    array.push(listaNotifiche);
  }

  if ("/pannello-di-controllo/lista-accessi" === pathName) {
    array.push(listaAccessi);
  }

  if (pathName.includes("scheda-tipo-segnaposto")) {
    array.push(listaTipoSegnaposto);
    array.push(schedaTipoSegnaposto);
  }

  if ("/lista-tipi-segnaposto" === pathName) {
    array.push(listaTipoSegnaposto);
  }

  if (pathName.includes("scheda-segnaposto")) {
    array.push(listaSegnaposto);
    array.push(schedaSegnaposto);
  }

  if ("/lista-segnaposti" === pathName) {
    array.push(listaSegnaposto);
  }

  if ("/lista-segnaposti/filtro" === pathName) {
    array.push(listaSegnaposto);
    array.push(listaSegnapostoFiltro);

  }

  if ("/lista-segnaposti/report" === pathName) {
    array.push(listaSegnaposto);
    array.push(listaSegnapostoReport);

  }



  return array;
}