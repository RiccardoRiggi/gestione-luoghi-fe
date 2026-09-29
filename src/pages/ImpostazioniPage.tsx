import React, { useEffect } from 'react';
import QRCode from 'react-qr-code';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { getData, getOra } from '../DateUtil';
// @ts-ignore
import { fetchIsLoadingAction } from '../modules/feedback/actions';
import dispositiviFisiciService from '../services/DispositiviFisiciService';
import utenteLoggatoService from '../services/UtenteLoggatoService';
import { toast } from 'react-toastify';


export default function ImpostazioniPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);

    const [paginaDispositivi, setPaginaDispositivi] = React.useState(1);
    const [dispositiviFisici, setDispositiviFisici] = React.useState([]);

    const [paginaDispositiviTelegram, setPaginaDispositiviTelegram] = React.useState(1);
    const [dispositiviFisiciTelegram, setDispositiviFisiciTelegram] = React.useState([]);


    const [idNuovoDispositivoFisico, setIdNuovoDispositivoFisico] = React.useState("");
    const [idNuovoDispositivoFisicoTelegram, setIdNuovoDispositivoFisicoTelegram] = React.useState("");

    const [mostraChiaveGlobale, setMostraChiaveGlobale] = React.useState(false);
    const [chiaveGloabale, setChiaveGlobale] = React.useState("");



    const [idInterval, setIdInterval] = React.useState<any>("");
    const [idIntervalTelegram, setIdIntervalTelegram] = React.useState<any>("");


    const [accessi, setAccessi] = React.useState([]);
    const [paginaAccessi, setPaginaAccessi] = React.useState(1);


    const [codiciBackup, setCodiciBackup] = React.useState([]);


    const [listaMetodiSecondoFattore, setListaMetodiSecondoFattore] = React.useState([]);
    const [listaMetodiSecondoFattoreRecuperoPassword, setListaMetodiSecondoFattoreRecuperoPassword] = React.useState([]);

    const [nomeBotTelegram, setNomeBotTelegram] = React.useState("");
    const [codiceAssociazione, setCodiceAssociazione] = React.useState("");



    let interval: any;

    const getDispositiviFisiciTelegram = async (pagina: any) => {

        if (pagina !== 0) {

            await dispositiviFisiciService.getDispositiviFisiciTelegram(utenteLoggato.token, pagina).then(response => {

                if (response.data.length !== 0) {
                    setDispositiviFisiciTelegram(response.data);
                    setPaginaDispositiviTelegram(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    toast.warning("Non sono stati trovati account telegram", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }


            }).catch(e => {
                //---------------------------------------------
                try {
                    console.error(e);
                    toast.error(e.response.data.descrizione, {
                        position: "top-center",
                        autoClose: 5000,
                    });
                } catch (e: any) {
                    toast.error("Errore imprevisto", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }
                if (e.response.status === 401) {
                    navigate("/logout");
                }
                //---------------------------------------------

            });
        }
    }


    const getDispositiviFisici = async (pagina: any) => {

        if (pagina !== 0) {

            await dispositiviFisiciService.getDispositiviFisici(utenteLoggato.token, pagina).then(response => {

                if (response.data.length !== 0) {
                    setDispositiviFisici(response.data);
                    setPaginaDispositivi(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    toast.warning("Non sono stati trovati dispositivi fisici", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }


            }).catch(e => {
                //---------------------------------------------
                try {
                    console.error(e);
                    toast.error(e.response.data.descrizione, {
                        position: "top-center",
                        autoClose: 5000,
                    });
                } catch (e: any) {
                    toast.error("Errore imprevisto", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }
                if (e.response.status === 401) {
                    navigate("/logout");
                }
                //---------------------------------------------

            });
        }
    }

    const [idChiavePersonaleTotp, setIdChiavePersonaleTotp] = React.useState("");

    const generaChiavePersonaleTOTP = async () => {
        dispatch(fetchIsLoadingAction(true));


        await dispositiviFisiciService.generaChiavePersonaleTOTP(utenteLoggato.token).then(response => {
            setIdChiavePersonaleTotp(response.data);
            toast.success("Chiave generata correttamente. Scansiona il QR Code con un'applicazione che supporta lo standard TOTP", {
                position: "top-center",
                autoClose: 5000,
            });
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            toast.error("Errore durante la generazione della chiave personale TOTP", {
                position: "top-center",
                autoClose: 5000,
            });
            dispatch(fetchIsLoadingAction(false));
        });
    }

    const generaIdentificativoDispositivoFisico = async () => {

        dispatch(fetchIsLoadingAction(true));


        await dispositiviFisiciService.generaIdentificativoDispositivoFisico(utenteLoggato.token).then(response => {
            console.info(response.data);
            setIdNuovoDispositivoFisico(response.data.idDispositivoFisico);
            verificaAttivazioneNuovoDispositivo(response.data.idDispositivoFisico);
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchIsLoadingAction(false));
        });
    }

    const getChiaveGlobale = async () => {

        dispatch(fetchIsLoadingAction(true));


        await utenteLoggatoService.getChiaveGlobale(utenteLoggato.token).then(response => {
            console.info(response.data);
            setChiaveGlobale(response.data);
            setMostraChiaveGlobale(true);
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchIsLoadingAction(false));
        });
    }

    const generaIdentificativoDispositivoFisicoTelegram = async () => {

        dispatch(fetchIsLoadingAction(true));


        await dispositiviFisiciService.generaIdentificativoTelegram(utenteLoggato.token).then(response => {
            console.info(response.data);
            setIdNuovoDispositivoFisicoTelegram(response.data.idDispositivoFisico);
            setNomeBotTelegram(response.data.nomeBotTelegram);
            setCodiceAssociazione(response.data.codiceAssociazione);
            verificaAttivazioneNuovoDispositivoTelegram(response.data.idDispositivoFisico);
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchIsLoadingAction(false));
        });
    }

    const verificaAttivazioneNuovoDispositivo = (idNuovoDispositivoFisico: any) => {
        interval = setInterval(async () => {

            await dispositiviFisiciService.isDispositivoAbilitato(utenteLoggato.token, idNuovoDispositivoFisico).then(response => {
                console.info(response.data);

                if (response.data) {
                    clearInterval(interval);
                    getDispositiviFisici(1);
                    annullaAggiuntaNuovoDispositivo();
                    toast.success("Dispositivo abilitato con successo", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }



            }).catch(e => {
                //---------------------------------------------
                try {
                    console.error(e);
                    toast.error(e.response.data.descrizione, {
                        position: "top-center",
                        autoClose: 5000,
                    });
                } catch (e: any) {
                    toast.error("Errore imprevisto", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }
                if (e.response.status === 401) {
                    navigate("/logout");
                }
                //---------------------------------------------

            });
        }, 1000);
        setIdInterval(interval);
    }

    const verificaAttivazioneNuovoDispositivoTelegram = (idNuovoDispositivoFisicoTelegram: any) => {
        interval = setInterval(async () => {

            await dispositiviFisiciService.isDispositivoTelegramAbilitato(utenteLoggato.token, idNuovoDispositivoFisicoTelegram).then(response => {
                console.info(response.data);

                if (response.data) {
                    clearInterval(interval);
                    getDispositiviFisiciTelegram(1);
                    annullaAggiuntaNuovoDispositivoTelegram();
                    toast.success("Account telegram collegato con successo", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }



            }).catch(e => {
                //---------------------------------------------
                try {
                    console.error(e);
                    toast.error(e.response.data.descrizione, {
                        position: "top-center",
                        autoClose: 5000,
                    });
                } catch (e: any) {
                    toast.error("Errore imprevisto", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }
                if (e.response.status === 401) {
                    navigate("/logout");
                }
                //---------------------------------------------

            });
        }, 1000);
        setIdIntervalTelegram(interval);
    }

    const annullaAggiuntaNuovoDispositivo = () => {
        clearInterval(idInterval);
        setIdNuovoDispositivoFisico("");
        getDispositiviFisici(1);
    }

    const annullaAggiuntaNuovoDispositivoTelegram = () => {
        clearInterval(idIntervalTelegram);
        setIdNuovoDispositivoFisicoTelegram("");
        getDispositiviFisiciTelegram(1);
    }


    const getStoricoAccessi = async (pagina: any) => {


        if (pagina !== 0) {
            await utenteLoggatoService.getStoricoAccessi(utenteLoggato.token, pagina).then(response => {

                if (response.data.length !== 0) {
                    setAccessi(response.data);
                    setPaginaAccessi(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    toast.warning("Non sono stati trovati accessi", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }


            }).catch(e => {
                //---------------------------------------------
                try {
                    console.error(e);
                    toast.error(e.response.data.descrizione, {
                        position: "top-center",
                        autoClose: 5000,
                    });
                } catch (e: any) {
                    toast.error("Errore imprevisto", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }
                if (e.response.status === 401) {
                    navigate("/logout");
                }
                //---------------------------------------------

            });
        }

    }


    const generaCodiciBackup = async () => {
        await utenteLoggatoService.generaCodiciBackup(utenteLoggato.token).then(response => {
            setCodiciBackup(response.data);
        }).catch(e => {
            //---------------------------------------------
            try {
                console.error(e);
                toast.error(e.response.data.descrizione, {
                    position: "top-center",
                    autoClose: 5000,
                });
            } catch (e: any) {
                toast.error("Errore imprevisto", {
                    position: "top-center",
                    autoClose: 5000,
                });
            }
            if (e.response.status === 401) {
                navigate("/logout");
            }
            //---------------------------------------------

        });
    }

    const nascondiCodiciBackup = () => {
        setCodiciBackup([]);
    }

    const getMetodiAutenticazionePerUtenteLoggato = async () => {
        await utenteLoggatoService.getMetodiAutenticazionePerUtenteLoggato(utenteLoggato.token).then(response => {
            setListaMetodiSecondoFattore(response.data);
        }).catch(e => {
            //---------------------------------------------
            try {
                console.error(e);
                toast.error(e.response.data.descrizione, {
                    position: "top-center",
                    autoClose: 5000,
                });
            } catch (e: any) {
                toast.error("Errore imprevisto", {
                    position: "top-center",
                    autoClose: 5000,
                });
            }
            if (e.response.status === 401) {
                navigate("/logout");
            }
            //---------------------------------------------

        });
    }


    const cambiaAbilitazioneSecondoFattore = async (idUtente: any, idTipoMetodoLogin: any) => {
        if (idUtente === null) {
            await utenteLoggatoService.abilitaTipoMetodoLogin(utenteLoggato.token, idTipoMetodoLogin).then(response => {
                toast.success("Salvataggio avvenuto con successo", {
                    position: "top-center",
                    autoClose: 5000,
                });
                getMetodiAutenticazionePerUtenteLoggato();
            }).catch(e => {
                //---------------------------------------------
                try {
                    console.error(e);
                    toast.error(e.response.data.descrizione, {
                        position: "top-center",
                        autoClose: 5000,
                    });
                } catch (e: any) {
                    toast.error("Errore imprevisto", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }
                if (e.response.status === 401) {
                    navigate("/logout");
                }
                //---------------------------------------------

            });
        } else {
            await utenteLoggatoService.disabilitaTipoMetodoLogin(utenteLoggato.token, idTipoMetodoLogin).then(response => {
                getMetodiAutenticazionePerUtenteLoggato();
                toast.success("Salvataggio avvenuto con successo", {
                    position: "top-center",
                    autoClose: 5000,
                });
            }).catch(e => {
                console.error(e);
                if (e.response.status === 401) {
                    toast.error(e.response.data.descrizione, {
                        position: "top-center",
                        autoClose: 5000,
                    });
                    navigate("/login");
                }
            });
        }
    }

    const getMetodiRecuperoPasswordPerUtenteLoggato = async () => {
        await utenteLoggatoService.getMetodiRecuperoPasswordPerUtenteLoggato(utenteLoggato.token).then(response => {
            setListaMetodiSecondoFattoreRecuperoPassword(response.data);
        }).catch(e => {
            //---------------------------------------------
            try {
                console.error(e);
                toast.error(e.response.data.descrizione, {
                    position: "top-center",
                    autoClose: 5000,
                });
            } catch (e: any) {
                toast.error("Errore imprevisto", {
                    position: "top-center",
                    autoClose: 5000,
                });
            }
            if (e.response.status === 401) {
                navigate("/logout");
            }
            //---------------------------------------------
        });
    }


    const cambiaAbilitazioneSecondoFattoreRecuperoPassword = async (idUtente: any, idTipoMetodoRecPsw: any) => {
        if (idUtente === null) {
            await utenteLoggatoService.abilitaTipoRecuperoPassword(utenteLoggato.token, idTipoMetodoRecPsw).then(response => {
                toast.success("Salvataggio avvenuto con successo", {
                    position: "top-center",
                    autoClose: 5000,
                });
                getMetodiRecuperoPasswordPerUtenteLoggato();
            }).catch(e => {
                //---------------------------------------------
                try {
                    console.error(e);
                    toast.error(e.response.data.descrizione, {
                        position: "top-center",
                        autoClose: 5000,
                    });
                } catch (e: any) {
                    toast.error("Errore imprevisto", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }
                if (e.response.status === 401) {
                    navigate("/logout");
                }
                //---------------------------------------------

            });
        } else {
            await utenteLoggatoService.disabilitaTipoRecuperoPassword(utenteLoggato.token, idTipoMetodoRecPsw).then(response => {
                getMetodiRecuperoPasswordPerUtenteLoggato();
                toast.success("Salvataggio avvenuto con successo", {
                    position: "top-center",
                    autoClose: 5000,
                });
            }).catch(e => {
                //---------------------------------------------
                try {
                    console.error(e);
                    toast.error(e.response.data.descrizione, {
                        position: "top-center",
                        autoClose: 5000,
                    });
                } catch (e: any) {
                    toast.error("Errore imprevisto", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }
                if (e.response.status === 401) {
                    navigate("/logout");
                }
                //---------------------------------------------

            });
        }
    }


    useEffect(() => {
        if (!ricercaEseguita) {
            setRicercaEseguita(true);
            getDispositiviFisici(paginaDispositivi);
            getDispositiviFisiciTelegram(paginaDispositiviTelegram);
            getStoricoAccessi(paginaAccessi);
            getMetodiAutenticazionePerUtenteLoggato();
            getMetodiRecuperoPasswordPerUtenteLoggato();


        }
    }, []);

    const aggiornaSottoscrizione = async (idSottoscrizione: any) => {
        let jsonBody = {
            idSottoscrizione: idSottoscrizione
        }
        await utenteLoggatoService.aggiornaSottoscrizione(utenteLoggato.token, jsonBody).then(response => {
            dispatch(fetchIsLoadingAction(false));
            toast.success("Sottoscrizione aggiornata con successo!", {
                position: "top-center",
                autoClose: 5000,
            });
        }).catch(e => {
            dispatch(fetchIsLoadingAction(false));
            //---------------------------------------------
            try {
                console.error(e);
                toast.error(e.response.data.descrizione, {
                    position: "top-center",
                    autoClose: 5000,
                });
            } catch (e: any) {
                toast.error("Errore imprevisto", {
                    position: "top-center",
                    autoClose: 5000,
                });
            }
            if (e.response.status === 401) {
                navigate("/logout");
            }
            //---------------------------------------------
        });
    }

 


    return (
        <Layout>
            <div className="card shadow-lg mx-1 ">
                <div className="card-body p-3">
                    <div className="row gx-4">
                        <div className="col-3">
                            <div className="avatar avatar-xl position-relative">
                                <i className="fa-solid fa-user-astronaut text-primary fa-3x"></i>
                            </div>
                        </div>
                        <div className="col-6 my-auto text-center">
                            <div className="h-100">
                                <h5 className="mb-1">
                                    {utenteLoggato.nome} {utenteLoggato.cognome}
                                </h5>
                                <p className="mb-0 font-weight-bold text-sm">
                                    {utenteLoggato.email}
                                </p>
                            </div>
                        </div>
                        <div className="col-3 my-auto text-end">
                            <div className="avatar avatar-xl position-relative">
                                <i className="fa-solid fa-bell text-primary fa-3x fa-shake"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center">
                        <h3 className="mb-1">
                            <i className="fa-solid fa-key text-primary fa-1x pe-2 "></i>
                            Secondo fattore di autenticazione
                        </h3>

                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row gx-4">

                        <div className='col-12 '>
                            <div className='table-responsive'>
                                <table className="table table-striped table-hover table-bordered">
                                    <thead >
                                        <tr>
                                            <th scope="col" >Descrizione</th>
                                            <th scope="col">Stato</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            Array.isArray(listaMetodiSecondoFattore) && listaMetodiSecondoFattore.map((secondoFattore: any, index: number) =>
                                                <tr key={index}>
                                                    <td>{secondoFattore.descrizione.substring(0, secondoFattore.descrizione.indexOf("#"))}</td>
                                                    <td className='text-center'><div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" checked={secondoFattore.idUtente !== null} onClick={(e) => { cambiaAbilitazioneSecondoFattore(secondoFattore.idUtente, secondoFattore.idTipoMetodoLogin) }} />
                                                    </div></td>
                                                </tr>
                                            )}


                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center">
                        <h3 className="mb-1">
                            <i className="fa-solid fa-key text-primary fa-1x pe-2 "></i>
                            Secondo fattore di recupero password
                        </h3>

                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row gx-4">

                        <div className='col-12 '>
                            <div className='table-responsive'>
                                <table className="table table-striped table-hover table-bordered">
                                    <thead >
                                        <tr>
                                            <th scope="col" >Descrizione</th>
                                            <th scope="col">Stato</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            Array.isArray(listaMetodiSecondoFattoreRecuperoPassword) && listaMetodiSecondoFattoreRecuperoPassword.map((secondoFattore: any, index: number) =>
                                                <tr key={index}>
                                                    <td>{secondoFattore.descrizione.substring(0, secondoFattore.descrizione.indexOf("#"))}</td>
                                                    <td className='text-center'><div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" checked={secondoFattore.idUtente !== null} onClick={(e) => { cambiaAbilitazioneSecondoFattoreRecuperoPassword(secondoFattore.idUtente, secondoFattore.idTipoMetodoRecPsw) }} />
                                                    </div></td>
                                                </tr>
                                            )}


                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center">
                        <h3 className="mb-3">
                            <i className="fa-solid fa-key text-primary fa-1x pe-2 "></i>
                            Codici di backup
                        </h3>
                        {codiciBackup.length === 0 &&
                            <button onClick={generaCodiciBackup} className="btn btn-primary ms-auto b-3">Genera nuovi codici di backup<i className='fa-solid fa-rotate-right ps-2'></i></button>
                        }
                        {codiciBackup.length > 0 &&
                            <button onClick={nascondiCodiciBackup} className="btn btn-primary ms-auto b-3">Nascondi codici backup<i className='fa-solid fa-eye-slash ps-2'></i></button>
                        }

                    </div>
                </div>
                {codiciBackup.length > 0 && <div className="card-body p-3">
                    <div className="row gx-4">

                        <div className='col-12 text-center'>
                            <div className='table-responsive'>
                                <table className="table table-striped table-hover table-bordered">
                                    <thead >
                                        <tr>
                                            <th scope="col">Codice di backup</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            Array.isArray(codiciBackup) && codiciBackup.map((codice: any, index: number) =>
                                                <tr key={index}>
                                                    <td>{codice}</td>
                                                </tr>
                                            )}


                                    </tbody>
                                </table>
                            </div>
                            <small>Trascrivi i codici in un posto sicuro, cambiando pagina non sarà più possibile recuperarli. Ad ogni nuova generazione verranno eliminati i codici precedenti</small>
                        </div>

                    </div>
                </div>}
            </div>

            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center">
                        <h3 className="mb-1">
                            <i className="fa-solid fa-passport text-primary fa-1x pe-2 "></i>
                            Chiave Globale
                        </h3>
                        {!mostraChiaveGlobale &&
                            <button onClick={getChiaveGlobale} className="btn btn-primary ms-auto">Mostra chiave globale<i className='fa-solid fa-eye ps-2'></i></button>
                        }
                        {mostraChiaveGlobale &&
                            <button onClick={() => { setMostraChiaveGlobale(false); setChiaveGlobale("") }} className="btn btn-primary ms-auto"><i className='fa-solid fa-eye-slash pe-2'></i>Nascondi chiave globale</button>
                        }
                    </div>
                </div>

                <div className="card-body p-3">
                    <div className="row gx-4">

                        <>
                            {chiaveGloabale !== "" && <div className='col-12 text-center'>
                                <QRCode className='w-100 ' fgColor='#344767' value={chiaveGloabale} />
                                <small>Scansiona il QR-Code con Google Authenticator o Microsoft Authenticator</small>

                            </div>}
                        </>


                    </div>
                </div>

            </div>

            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center">
                        <h3 className="mb-1">
                            <i className="fa-solid fa-key text-primary fa-1x pe-2 "></i>
                            Chiave personale TOTP
                        </h3>
                        {idChiavePersonaleTotp === "" &&
                            <button onClick={generaChiavePersonaleTOTP} className="btn btn-primary ms-auto">Genera nuova chiave<i className='fa-solid fa-plus ps-2'></i></button>
                        }
                        {idChiavePersonaleTotp !== "" &&
                            <button onClick={() => { setIdChiavePersonaleTotp("") }} className="btn btn-primary ms-auto"><i className='fa-solid fa-eye-slash pe-2'></i>Nascondi chiave</button>
                        }
                    </div>
                </div>

                <div className="card-body p-3">
                    <div className="row gx-4">


                        {idChiavePersonaleTotp !== "" && <div className='col-12 text-center'>
                            <QRCode className='w-100 ' fgColor='#344767' value={idChiavePersonaleTotp} />
                            <small>Le chiavi precedenti sono state invalidate</small>

                        </div>

                        }
                    </div>
                </div>

            </div>

            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center">
                        <h3 className="mb-1">
                            <i className="fa-solid fa-mobile-screen text-primary fa-1x pe-2 "></i>
                            Dispositivi fisici
                        </h3>
                        {idNuovoDispositivoFisico === "" &&
                            <button onClick={generaIdentificativoDispositivoFisico} className="btn btn-primary ms-auto">Aggiungi dispositivo<i className='fa-solid fa-plus ps-2'></i></button>
                        }
                        {idNuovoDispositivoFisico !== "" &&
                            <button onClick={annullaAggiuntaNuovoDispositivo} className="btn btn-primary ms-auto"><i className='fa-solid fa-list pe-2'></i>Lista dispositivi</button>
                        }
                    </div>
                </div>

                <div className="card-body p-3">
                    <div className="row gx-4">

                        {idNuovoDispositivoFisico === "" &&
                            <><div className='col-12 text-center'>
                                <div className='table-responsive'>
                                    <table className="table table-striped table-hover table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Stato</th>
                                                <th scope="col">Nome</th>
                                                <th scope="col">Data abilitazione</th>
                                                <th scope="col">Data disabilitazione</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                Array.isArray(dispositiviFisici) && dispositiviFisici.map((dispositivo: any, index: number) =>
                                                    <tr key={index}>
                                                        <th scope="row">{dispositivo.dataDisabilitazione === null ? <i className="fa-solid fa-circle-check text-success"></i> : <i className="fa-solid fa-circle-xmark text-danger"></i>}</th>
                                                        <td>{dispositivo.nomeDispositivo}</td>
                                                        <td>{getData(dispositivo.dataAbilitazione)} ore {getOra(dispositivo.dataAbilitazione)}</td>
                                                        <td>{getData(dispositivo.dataDisabilitazione)} {dispositivo.dataDisabilitazione !== null && "ore"} {getOra(dispositivo.dataDisabilitazione)}</td>
                                                    </tr>
                                                )}


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                                <div className='col-12 text-end'>
                                    <small>Pagina {paginaDispositivi}</small>
                                </div>

                                <div className='col-6 text-end pt-2'>
                                    <span onClick={() => getDispositiviFisici(paginaDispositivi - 1)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Precedente</span>
                                </div>
                                <div className='col-6 text-start pt-2'>
                                    <span onClick={() => getDispositiviFisici(paginaDispositivi + 1)} className='btn btn-primary'>Successivo<i className='fa-solid fa-angles-right ps-2'></i></span>
                                </div></>}
                        {idNuovoDispositivoFisico !== "" && <div className='col-12 text-center'>
                            <QRCode className='w-100 ' fgColor='#344767' value={idNuovoDispositivoFisico} />
                            <small>L'aggiunta di un nuovo dispositivo fisico disabiliterà i dispositivi precedentemente configurati</small>

                        </div>

                        }
                    </div>
                </div>

            </div>

            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center">
                        <h3 className="mb-1">
                            <i className="fa-brands fa-telegram text-primary fa-1x pe-2 "></i>
                            Account telegram
                        </h3>
                        {idNuovoDispositivoFisicoTelegram === "" &&
                            <button onClick={generaIdentificativoDispositivoFisicoTelegram} className="btn btn-primary ms-auto">Aggiungi account telegram<i className='fa-solid fa-plus ps-2'></i></button>
                        }
                        {idNuovoDispositivoFisicoTelegram !== "" &&
                            <button onClick={annullaAggiuntaNuovoDispositivoTelegram} className="btn btn-primary ms-auto"><i className='fa-solid fa-list pe-2'></i>Lista account telegram</button>
                        }
                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row gx-4">

                        {idNuovoDispositivoFisicoTelegram === "" &&
                            <><div className='col-12 text-center'>
                                <div className='table-responsive'>
                                    <table className="table table-striped table-hover table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Stato</th>
                                                <th scope="col">Nome</th>
                                                <th scope="col">Data abilitazione</th>
                                                <th scope="col">Data disabilitazione</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                Array.isArray(dispositiviFisiciTelegram) && dispositiviFisiciTelegram.map((dispositivo: any, index: number) =>
                                                    <tr key={index}>
                                                        <th scope="row">{dispositivo.dataDisabilitazione === null ? <i className="fa-solid fa-circle-check text-success"></i> : <i className="fa-solid fa-circle-xmark text-danger"></i>}</th>
                                                        <td>{dispositivo.usernameTelegram}</td>
                                                        <td>{getData(dispositivo.dataAbilitazione)} ore {getOra(dispositivo.dataAbilitazione)}</td>
                                                        <td>{getData(dispositivo.dataDisabilitazione)} {dispositivo.dataDisabilitazione !== null && "ore"} {getOra(dispositivo.dataDisabilitazione)}</td>
                                                    </tr>
                                                )}


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                                <div className='col-12 text-end'>
                                    <small>Pagina {paginaDispositivi}</small>
                                </div>

                                <div className='col-6 text-end pt-2'>
                                    <span onClick={() => getDispositiviFisiciTelegram(paginaDispositiviTelegram - 1)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Precedente</span>
                                </div>
                                <div className='col-6 text-start pt-2'>
                                    <span onClick={() => getDispositiviFisiciTelegram(paginaDispositiviTelegram + 1)} className='btn btn-primary'>Successivo<i className='fa-solid fa-angles-right ps-2'></i></span>
                                </div></>}
                        {idNuovoDispositivoFisicoTelegram !== "" && <div className='col-12 text-center'>
                            <p>Apri Telegram, cerca <b>{nomeBotTelegram}</b>, digita il codice di verifica <b>{codiceAssociazione}</b></p>
                            <small>L'aggiunta di un nuovo account Telegram disabiliterà gli account precedentemente configurati</small>

                        </div>

                        }
                    </div>
                </div>

            </div>


            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center">
                        <h3 className="mb-1">
                            <i className="fa-solid fa-clock-rotate-left text-primary fa-1x pe-2 "></i>
                            Storico accessi
                        </h3>

                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row gx-4">

                        <div className='col-12 '>
                            <div className='table-responsive'>
                                <table className="table table-striped table-hover table-bordered">
                                    <thead >
                                        <tr>
                                            <th scope="col">Stato</th>
                                            <th scope="col" >Data login</th>
                                            <th scope="col">Data logout</th>
                                            <th scope="col">Indirizzo Ip</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            Array.isArray(accessi) && accessi.map((accesso: any, index: number) =>
                                                <tr key={index}>
                                                    <th className='text-center' scope="row">{accesso.dataFineValidita === null ? <i className="fa-solid fa-circle-check text-success"></i> : <i className="fa-solid fa-circle-xmark text-danger"></i>}</th>
                                                    <td>{getData(accesso.dataInizioValidita)} ore {getOra(accesso.dataInizioValidita)}</td>
                                                    <td>{getData(accesso.dataFineValidita)} {accesso.dataFineValidita !== null && "ore"} {getOra(accesso.dataFineValidita)}</td>
                                                    <td>{accesso.indirizzoIp}</td>
                                                </tr>
                                            )}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='col-12 text-end'>
                            <small>Pagina {paginaAccessi}</small>
                        </div>

                        <div className='col-6 text-end pt-2'>
                            <span onClick={() => getStoricoAccessi(paginaAccessi - 1)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Precedente</span>
                        </div>
                        <div className='col-6 text-start pt-2'>
                            <span onClick={() => getStoricoAccessi(paginaAccessi + 1)} className='btn btn-primary'>Successivo<i className='fa-solid fa-angles-right ps-2'></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );

}