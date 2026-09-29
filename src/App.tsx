import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import PrivateRoute from './components/PrivateRoute'
import ListaAccessiPage from './pages/accessiAttivi/ListaAccessiPage'
import ListaAccountTelegramPage from './pages/accountTelegram/ListaAccountTelegramPage'
import ListaDispositiviFisiciPage from './pages/dispositiviFisici/ListaDispositiviFisiciPage'
import HomePage from './pages/HomePage'
import ImpostazioniPage from './pages/ImpostazioniPage'
import ListaIndirizziIp from './pages/indirizziIp/ListaIndirizziIp'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import LogsPage from './pages/LogsPage'
import ListaVociMenuPage from './pages/menu/ListaVociMenuPage'
import SchedaVoceMenuPage from './pages/menu/SchedaVoceMenuPage'
import ListaNotifichePage from './pages/notifiche/ListaNotifichePage'
import ListaNotificheUtentePage from './pages/notifiche/ListaNotificheUtentePage'
import SchedaNotificaPage from './pages/notifiche/SchedaNotificaPage'
import PannelloDiControlloPage from './pages/PannelloDiControlloPage'
import RecuperoPasswordPage from './pages/RecuperoPasswordPage'
import ListaRisorsePage from './pages/risorse/ListaRisorsePage'
import SchedaRisorsaPage from './pages/risorse/SchedaRisorsaPage'
import ListaRuoliPage from './pages/ruoli/ListaRuoliPage'
import SchedaRuoloPage from './pages/ruoli/SchedaRuoloPage'
import FiltroSegnapostiPage from './pages/segnaposti/FiltroSegnapostiPage'
import ListaSegnapostiPage from './pages/segnaposti/ListaSegnapostiPage'
import ListaTipiSegnapostoPage from './pages/segnaposti/ListaTipiSegnapostoPage'
import ReportSegnapostiPage from './pages/segnaposti/ReportSegnapostiPage'
import SchedaSegnapostoPage from './pages/segnaposti/SchedaSegnapostoPage'
import SchedaTipoSegnapostoPage from './pages/segnaposti/SchedaTipoSegnapostoPage'
import ListaUtentiPage from './pages/utenti/ListaUtentiPage'
import SchedaUtentePage from './pages/utenti/SchedaUtentePage'


function App() {




  return (
    <BrowserRouter basename='/gestione-luoghi'>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="recupero-password" element={<RecuperoPasswordPage />} />

        <Route path="logout" element={<LogoutPage />} />


        <Route
          path=""
          element={
            <PrivateRoute>
              <ListaSegnapostiPage />

            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo"
          element={
            <PrivateRoute>
              <PannelloDiControlloPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/dashboard"
          element={
            <PrivateRoute>
              <PannelloDiControlloPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/impostazioni"
          element={
            <PrivateRoute>
              <ImpostazioniPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/logs/:livelloLog"
          element={
            <PrivateRoute>
              <LogsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/logs"
          element={
            <PrivateRoute>
              <LogsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/lista-menu"
          element={
            <PrivateRoute>
              <ListaVociMenuPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/scheda-voce-menu"
          element={
            <PrivateRoute>
              <SchedaVoceMenuPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/scheda-voce-menu/:idVoceMenu"
          element={
            <PrivateRoute>
              <SchedaVoceMenuPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/lista-risorse"
          element={
            <PrivateRoute>
              <ListaRisorsePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/scheda-risorsa"
          element={
            <PrivateRoute>
              <SchedaRisorsaPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/scheda-risorsa/:idRisorsa"
          element={
            <PrivateRoute>
              <SchedaRisorsaPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/lista-ruoli"
          element={
            <PrivateRoute>
              <ListaRuoliPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/scheda-ruolo"
          element={
            <PrivateRoute>
              <SchedaRuoloPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/scheda-ruolo/:idTipoRuolo"
          element={
            <PrivateRoute>
              <SchedaRuoloPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/lista-utenti"
          element={
            <PrivateRoute>
              <ListaUtentiPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/scheda-utente"
          element={
            <PrivateRoute>
              <SchedaUtentePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/scheda-utente/:idUtente"
          element={
            <PrivateRoute>
              <SchedaUtentePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/lista-indirizzi-ip"
          element={
            <PrivateRoute>
              <ListaIndirizziIp />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/lista-dispositivi-fisici"
          element={
            <PrivateRoute>
              <ListaDispositiviFisiciPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/lista-account-telegram"
          element={
            <PrivateRoute>
              <ListaAccountTelegramPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/lista-accessi"
          element={
            <PrivateRoute>
              <ListaAccessiPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/lista-notifiche-utente"
          element={
            <PrivateRoute>
              <ListaNotificheUtentePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/lista-notifiche"
          element={
            <PrivateRoute>
              <ListaNotifichePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/scheda-notifica"
          element={
            <PrivateRoute>
              <SchedaNotificaPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pannello-di-controllo/scheda-notifica/:idNotifica"
          element={
            <PrivateRoute>
              <SchedaNotificaPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/lista-tipi-segnaposto"
          element={
            <PrivateRoute>
              <ListaTipiSegnapostoPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/scheda-tipo-segnaposto"
          element={
            <PrivateRoute>
              <SchedaTipoSegnapostoPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/scheda-tipo-segnaposto/:idTipoSegnaposto"
          element={
            <PrivateRoute>
              <SchedaTipoSegnapostoPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/lista-tipi-segnaposto"
          element={
            <PrivateRoute>
              <ListaTipiSegnapostoPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/scheda-segnaposto"
          element={
            <PrivateRoute>
              <SchedaSegnapostoPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/scheda-segnaposto/:idSegnaposto"
          element={
            <PrivateRoute>
              <SchedaSegnapostoPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/lista-segnaposti"
          element={
            <PrivateRoute>
              <ListaSegnapostiPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/lista-segnaposti/filtro"
          element={
            <PrivateRoute>
              <FiltroSegnapostiPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/lista-segnaposti/report"
          element={
            <PrivateRoute>
              <ReportSegnapostiPage />
            </PrivateRoute>
          }
        />



        <Route
          path="*"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />

      </Routes>


    </BrowserRouter>
  )
}

export default App
