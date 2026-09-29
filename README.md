# Gestione Luoghi

Gestione è una Web Application derivata da [Otter Guardian](https://github.com/RiccardoRiggi/otter-guardian-fe) che consente di registrare e suddividere per categoria tutti i luoghi visitati. 


![Home](https://raw.githubusercontent.com/RiccardoRiggi/gestione-luoghi-fe/main/screenshots/homepage.png)

Di seguito è presente la documentazione della sola componente di frontend per le funzionalità specifiche. Sul repository di [Otter Guardian](https://github.com/RiccardoRiggi/otter-guardian-fe) è disponibile la documentazione della parte derivata. [Qui](https://github.com/RiccardoRiggi/gestione-luoghi-be) è disponibile la componente di backend. 

Ho deciso di pubblicare questo codice solo ora, quindi la data del repository non riflette quando l'ho effettivamente scritto. Il progetto nasce all'interno di un gestionale più grande che uso tutti i giorni per provare a semplificarmi la vita!

---

## Installazione e avvio
```sh
$ npm install
$ npm start
```

---

## Lista luoghi

![Lista luoghi](https://raw.githubusercontent.com/RiccardoRiggi/gestione-luoghi-fe/main/screenshots/homepage.png)

In questa pagina è possibile visualizzare la lista di tutti i luoghi visitati filtrandoli per categoria, nome e se visitati oppure no. Volendo è possibile includere la propria posizione sulla mappa.

---

## Filtra luoghi

![Filtra luoghi](https://raw.githubusercontent.com/RiccardoRiggi/gestione-luoghi-fe/main/screenshots/filtra.png)

Questa funzionalità consente di trovare i luoghi dato un certo raggio da una determinata posizione oppure dalla propria posizione in tempo reale.

---

## Report luoghi

![Report luoghi](https://raw.githubusercontent.com/RiccardoRiggi/gestione-luoghi-fe/main/screenshots/reportLuoghi.png)

Dato un anno di riferimento è possibile visionare tutti i luoghi visitati in quell'anno

---

## Scheda luogo

![Scheda luogo](https://raw.githubusercontent.com/RiccardoRiggi/gestione-luoghi-fe/main/screenshots/schedaLuogo.png)

In questa pagina è possibile registrare i luoghi indicando una categoria, un nome, una descrizione, le coordinate in formato WGS84 gradi, ed eventualmente altitudine, data della visita e note.

---

## Lista tipi segnaposto

![Lista tipi segnaposto](https://raw.githubusercontent.com/RiccardoRiggi/gestione-luoghi-fe/main/screenshots/listaTipoLuogo.png)

In questa pagina è presente la lista di tutte le categorie registrate.

---

## Scheda tipo segnaposto

![Lista tipi segnaposto](https://raw.githubusercontent.com/RiccardoRiggi/gestione-luoghi-fe/main/screenshots/schedaTipoLuogo.png)

In questa pagina è possibile registrare una nuova categoria indicando un identificativo, un nome, una descrizione e un'icona di FontAwesome.

---



## Bom / Diba

* [React](https://react.dev/)
* [React Redux](https://react-redux.js.org/)
* [React Qr Code](https://github.com/rosskhanas/react-qr-code)
* [Argon Dashboard 2](https://www.creative-tim.com/product/argon-dashboard)
* [Bootstrap](https://getbootstrap.com/) 
* [FontAwesome](https://fontawesome.com/)
* [React Toastify](https://fkhadra.github.io/react-toastify/introduction)
* [Favicon](https://www.iconfinder.com/icons/8665786/otter_animal_icon)
* [React Leaflet](https://react-leaflet.js.org/)

---

## Licenza

Il codice da me scritto viene rilasciato con licenza [MIT](https://github.com/RiccardoRiggi/gestione-luoghi-fe/blob/main/LICENSE). Framework, temi e librerie di terze parti mantengono le loro relative licenze. 