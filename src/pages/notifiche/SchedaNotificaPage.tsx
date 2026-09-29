import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import { getData, getOra } from '../../DateUtil';
// @ts-ignore
import { fetchIsLoadingAction } from '../../modules/feedback/actions';
import comboService from '../../services/ComboService';
import notificheService from '../../services/NotificheService';
import SchedaNotificaValidator from '../../validators/SchedaNotificaValidator';

export default function SchedaNotificaPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const dispatch = useDispatch();
    const params = useParams();

    const [formErrors, setFormErrors] = React.useState<any>(Object);
    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    const [titolo, setTitolo] = React.useState<any>("");
    const [testo, setTesto] = React.useState<any>("");

    const navigate = useNavigate();

    const getNotifica = async () => {
        dispatch(fetchIsLoadingAction(true));
        await notificheService.getNotifica(utenteLoggato.token, params.idNotifica).then(response => {
            setTitolo(response.data.titolo);
            setTesto(response.data.testo);
            dispatch(fetchIsLoadingAction(false));
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

    const submitForm = async () => {

        let jsonBody = {
            titolo: titolo,
            testo: testo
        }


        let formsErrorTmp = SchedaNotificaValidator(jsonBody);
        setFormErrors(formsErrorTmp);


        if (Object.keys(formsErrorTmp).length == 0) {

            if (params.idNotifica === undefined) {
                dispatch(fetchIsLoadingAction(true));
                await notificheService.inserisciNotifica(utenteLoggato.token, jsonBody).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    toast.success("Notifica inserita con successo!", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                    navigate("/pannello-di-controllo/lista-notifiche/");
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
            } else {
                dispatch(fetchIsLoadingAction(true));
                await notificheService.modificaNotifica(utenteLoggato.token, jsonBody, params.idNotifica).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    toast.success("Notifica aggiornata con successo!", {
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

        }
    }



    useEffect(() => {

        if (!ricercaEseguita) {
            if (params.idNotifica !== undefined) {
                getNotifica();
                getDestinatariNotifica(paginaDestinatari);
                getComboRuoli();
            }
            setRicercaEseguita(true);
        }
    });

    const [listaDestinatari, setListaDestinatari] = React.useState([]);
    const [paginaDestinatari, setPaginaDestinatari] = React.useState(1);


    const getDestinatariNotifica = async (pagina: any) => {

        if (pagina !== 0) {

            await notificheService.getDestinatariNotifica(utenteLoggato.token, pagina, params.idNotifica).then(response => {

                if (response.data.length !== 0) {
                    setListaDestinatari(response.data);
                    setPaginaDestinatari(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    setListaDestinatari(response.data);
                    toast.warning("Nessun destinatario trovato", {
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


    const inviaNotificaUtente = async (idUtente: any, invioViaTelegram: boolean) => {
        await notificheService.inviaNotificaUtente(utenteLoggato.token, idUtente, params.idNotifica, invioViaTelegram).then(response => {
            getDestinatariNotifica(paginaDestinatari)
            toast.success("Notifica inviata con successo", {
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

    const inviaNotificaTutti = async (invioViaTelegram: boolean) => {
        await notificheService.inviaNotificaTutti(utenteLoggato.token, params.idNotifica, invioViaTelegram).then(response => {
            getDestinatariNotifica(paginaDestinatari)
            toast.success("Notifica inviata a tutti gli utenti con successo", {
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

    const [idRuolo, setIdRuolo] = React.useState<any>(null);

    const aggiornaRuolo = (event: any) => {
        setIdRuolo(event.target.value);
    }
    const [listaRuoli, setListaRuoli] = React.useState([]);


    const getComboRuoli = async () => {
        dispatch(fetchIsLoadingAction(true));
        await comboService.getComboRuoli(utenteLoggato.token).then(response => {
            setListaRuoli(response.data);
            dispatch(fetchIsLoadingAction(false));
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

    const inviaNotificaRuolo = async (invioViaTelegram: boolean) => {
        if (idRuolo === null || idRuolo === undefined || idRuolo === "") {
            toast.warning("Devi scegliere un ruolo per proseguire", {
                position: "top-center",
                autoClose: 5000,
            });
        } else {
            await notificheService.inviaNotificaRuolo(utenteLoggato.token, idRuolo, params.idNotifica, invioViaTelegram).then(response => {
                getDestinatariNotifica(paginaDestinatari)
                toast.success("Notifica inviata con successo a tutti gli utenti che hanno associato il ruolo selezionato", {
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



    return (
        <Layout>

            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-solid fa-bell text-primary fa-1x pe-2 "></i>
                            {params.idNotifica === undefined ? "Aggiungi" : "Modifica"} notifica
                        </h3>
                        <button onClick={submitForm} className="btn btn-primary"
                        ><span className='pe-1'>{params.idNotifica === undefined ? "Inserisci notifica" : "Salva modifiche"}</span>
                            <i className="fas fa-save fa-sm fa-fw "></i>
                        </button>

                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row gx-4">
                        <div className={"col-12"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Titolo<strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='titolo' type={"text"} onChange={(e: any) => setTitolo(e.currentTarget.value)} className={formErrors?.titolo != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci il titolo..."} value={titolo} />
                            <small className='text-danger'>{formErrors?.titolo}</small>
                        </div>




                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Testo<strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='testo' type={"text"} onChange={(e: any) => setTesto(e.currentTarget.value)} className={formErrors?.testo != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci il testo..."} value={testo} />

                            <small className='text-danger'>{formErrors?.testo}</small>
                        </div>

                    </div>
                </div>
            </div>

            {params.idNotifica !== undefined &&
                <div className="card shadow-lg mx-1 mt-3">
                    <div className="card-header pb-0">
                        <div className="d-flex align-items-center justify-content-between">
                            <h3 className="">
                                <i className="fa-solid fa-share text-primary fa-1x pe-2 "></i>
                                Invio rapido
                            </h3>

                        </div>
                    </div>
                    <div className="card-body p-3">
                        <div className="row gx-4">

                            <div className='col-6'>
                                <span onClick={() => inviaNotificaTutti(false)} className='btn btn-primary'>Invia notifica a tutti gli utenti<i className="ps-1 fa-solid fa-share"></i></span>
                            </div>
                            <div className='col-6'>
                                <span onClick={() => inviaNotificaTutti(true)} className='btn btn-primary'>Invia notifica a tutti gli utenti anche tramite Telegram<i className="ps-1 fa-solid fa-share"></i></span>
                            </div>

                            <div className='col-12'>
                                <hr />
                            </div>

                            <div className='col-4'>
                                <label htmlFor="idVoceMenuPadre" className="form-label">Seleziona ruolo</label>

                                <select name='idVoceMenuPadre' className={"form-control"} onChange={aggiornaRuolo} value={idRuolo}>
                                    <option value={""}>Scegli...</option>
                                    {Array.isArray(listaRuoli) && listaRuoli.map((val: any) =>
                                        <option value={val.idTipoRuolo} >{val.descrizione}</option>
                                    )}
                                </select>
                            </div>
                            <div className='col-4'>
                                <span onClick={() => inviaNotificaRuolo(false)} className='btn btn-primary'>Invia notifica agli utenti con il ruolo associato<i className="ps-1 fa-solid fa-share"></i></span>
                            </div>
                            <div className='col-4'>
                                <span onClick={() => inviaNotificaRuolo(true)} className='btn btn-primary'>Invia notifica agli utenti con il ruolo associato anche tramite Telegram<i className="ps-1 fa-solid fa-share"></i></span>
                            </div>
                        </div>
                    </div>

                </div>
            }

            {params.idNotifica !== undefined &&
                <div className="card shadow-lg mx-1 mt-3">
                    <div className="card-header pb-0">
                        <div className="d-flex align-items-center justify-content-between">
                            <h3 className="">
                                <i className="fa-solid fa-users text-primary fa-1x pe-2 "></i>
                                Lista destinatari
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
                                                <th scope="col">Nome</th>
                                                <th scope="col">Cognome</th>
                                                <th scope="col">Stato</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                Array.isArray(listaDestinatari) && listaDestinatari.map((notifica: any, index: number) =>
                                                    <tr key={index}>
                                                        <td>{notifica.nome}</td>
                                                        <td>{notifica.cognome}</td>
                                                        {notifica.dataInvio === null &&
                                                            <td className='text-center'><span onClick={() => inviaNotificaUtente(notifica.idUtente, false)} className='btn btn-primary'><i className="fa-solid fa-share"></i></span><span onClick={() => inviaNotificaUtente(notifica.idUtente, true)} className='btn btn-primary'><i className="fa-solid fa-share"></i><i className="fa-brands fa-telegram"></i></span></td>
                                                        }
                                                        {notifica.dataInvio !== null && notifica.dataLettura === null &&
                                                            <td className='text-center'>Inviata alle ore {getOra(notifica.dataInvio)} del {getData(notifica.dataInvio)}</td>
                                                        }
                                                        {notifica.dataInvio !== null && notifica.dataLettura !== null &&
                                                            <td className='text-center'>Letta alle ore {getOra(notifica.dataLettura)} del {getData(notifica.dataLettura)}</td>
                                                        }


                                                    </tr>
                                                )}


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='col-12 text-end'>
                                <small>Pagina {paginaDestinatari}</small>
                            </div>

                            <div className='col-6 text-end pt-2'>
                                <span onClick={() => getDestinatariNotifica(paginaDestinatari - 1)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Precedente</span>
                            </div>
                            <div className='col-6 text-start pt-2'>
                                <span onClick={() => getDestinatariNotifica(paginaDestinatari + 1)} className='btn btn-primary'>Successivo<i className='fa-solid fa-angles-right ps-2'></i></span>
                            </div>
                        </div>
                    </div>

                </div>
            }


        </Layout >
    );

}