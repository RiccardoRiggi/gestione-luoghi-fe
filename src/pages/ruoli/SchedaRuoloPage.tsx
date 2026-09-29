import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
// @ts-ignore
import { fetchIsLoadingAction } from '../../modules/feedback/actions';
import ruoliService from '../../services/RuoliService';
import SchedaRuoloValidator from '../../validators/SchedaRuoloValidator';

export default function SchedaRuoloPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const dispatch = useDispatch();
    const params = useParams();

    const [formErrors, setFormErrors] = React.useState<any>(Object);
    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    const [idTipoRuolo, setIdTipoRuolo] = React.useState<any>("");
    const [descrizione, setDescrizione] = React.useState<any>("");

    const navigate = useNavigate();


    const getRuolo = async () => {
        dispatch(fetchIsLoadingAction(true));
        await ruoliService.getRuolo(utenteLoggato.token, params.idTipoRuolo).then(response => {
            setIdTipoRuolo(response.data.idTipoRuolo);
            setDescrizione(response.data.descrizione);
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
            idTipoRuolo: idTipoRuolo,
            descrizione: descrizione
        }

        let formsErrorTmp = SchedaRuoloValidator(jsonBody);

        setFormErrors(formsErrorTmp);

        if (Object.keys(formsErrorTmp).length == 0) {

            if (params.idTipoRuolo === undefined) {
                dispatch(fetchIsLoadingAction(true));
                await ruoliService.inserisciRuolo(utenteLoggato.token, jsonBody).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    toast.success("Ruolo inserito con successo!", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                    navigate("/pannello-di-controllo/scheda-ruolo/" + idTipoRuolo);
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
                await ruoliService.modificaRuolo(utenteLoggato.token, jsonBody, params.idTipoRuolo).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    toast.success("Ruolo aggiornato con successo!", {
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
            if (params.idTipoRuolo !== undefined) {
                getRuolo();
                getUtentiPerRuolo(paginaUtenti);
                getRisorsePerRuolo(paginaRisorse);
                getVociMenuPerRuolo(paginaVociMenu);
            }
            setRicercaEseguita(true);
        }
    });

    const [listaUtentiPerRuolo, setListaUtentiPerRuolo] = React.useState([]);
    const [paginaUtenti, setPaginaUtenti] = React.useState(1);


    const getUtentiPerRuolo = async (pagina: any) => {

        if (pagina !== 0) {

            await ruoliService.getUtentiPerRuolo(utenteLoggato.token, params.idTipoRuolo, pagina).then(response => {

                if (response.data.length !== 0) {
                    setListaUtentiPerRuolo(response.data);
                    setPaginaUtenti(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    setListaUtentiPerRuolo(response.data);
                    toast.warning("Non sono stati trovati utenti", {
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

    const cambiaAbilitazioneUtente = async (dataCreazione: any, idUtente: any) => {
        if (dataCreazione === null) {
            await ruoliService.associaRuoloUtente(utenteLoggato.token, null, params.idTipoRuolo, idUtente).then(response => {
                getUtentiPerRuolo(paginaUtenti);
                toast.success("Utente aggiunto con successo", {
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
        } else {
            await ruoliService.dissociaRuoloUtente(utenteLoggato.token, null, params.idTipoRuolo, idUtente).then(response => {
                getUtentiPerRuolo(paginaUtenti);
                toast.success("Utente rimosso con successo", {
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

    const [listaRisorsePerRuolo, setListaRisorsePerRuolo] = React.useState([]);
    const [paginaRisorse, setPaginaRisorse] = React.useState(1);

    const getRisorsePerRuolo = async (pagina: any) => {

        if (pagina !== 0) {

            await ruoliService.getRisorsePerRuolo(utenteLoggato.token, params.idTipoRuolo, pagina).then(response => {

                if (response.data.length !== 0) {
                    setListaRisorsePerRuolo(response.data);
                    setPaginaRisorse(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    setListaRisorsePerRuolo(response.data);
                    toast.warning("Non sono state trovate risorse", {
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

    const cambiaAbilitazioneRisorse = async (dataCreazione: any, idRisorsa: any) => {
        if (dataCreazione === null) {
            await ruoliService.associaRuoloRisorsa(utenteLoggato.token, null, params.idTipoRuolo, idRisorsa).then(response => {
                getRisorsePerRuolo(paginaRisorse);
                toast.success("Risorsa aggiunta con successo", {
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
        } else {
            await ruoliService.dissociaRuoloRisorsa(utenteLoggato.token, null, params.idTipoRuolo, idRisorsa).then(response => {
                getRisorsePerRuolo(paginaRisorse);
                toast.success("Risorsa rimossa con successo", {
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

    const [listaVociMenuPerRuolo, setListaVociMenuPerRuolo] = React.useState([]);
    const [paginaVociMenu, setPaginaVociMenu] = React.useState(1);


    const getVociMenuPerRuolo = async (pagina: any) => {

        if (pagina !== 0) {

            await ruoliService.getVociMenuPerRuolo(utenteLoggato.token, params.idTipoRuolo, pagina).then(response => {

                if (response.data.length !== 0) {
                    setListaVociMenuPerRuolo(response.data);
                    setPaginaVociMenu(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    setListaVociMenuPerRuolo(response.data);
                    toast.warning("Non sono state trovate voci di menu", {
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

    const cambiaAbilitazioneVociMenu = async (dataCreazione: any, idVoceMenu: any) => {
        if (dataCreazione === null) {
            await ruoliService.associaRuoloVoceMenu(utenteLoggato.token, null, params.idTipoRuolo, idVoceMenu).then(response => {
                getVociMenuPerRuolo(paginaVociMenu);
                toast.success("Voce menu aggiunta con successo", {
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
        } else {
            await ruoliService.dissociaRuoloVoceMenu(utenteLoggato.token, null, params.idTipoRuolo, idVoceMenu).then(response => {
                getVociMenuPerRuolo(paginaVociMenu);
                toast.success("Voce menu rimossa con successo", {
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
                            <i className="fa-solid fa-tag text-primary fa-1x pe-2 "></i>
                            {params.idTipoRuolo === undefined ? "Aggiungi" : "Modifica"} ruolo
                        </h3>
                        <button onClick={submitForm} className="btn btn-primary"
                        ><span className='pe-1'>{params.idTipoRuolo === undefined ? "Inserisci ruolo" : "Salva modifiche"}</span>
                            <i className="fas fa-save fa-sm fa-fw "></i>
                        </button>

                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row gx-4">
                        <div className={"col-12"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Identificativo<strong className='text-danger'>*</strong></label>

                            </div>
                            <input disabled={params.idTipoRuolo !== undefined} name='idRisorsa' type={"text"} onChange={(e: any) => setIdTipoRuolo(e.currentTarget.value)} className={formErrors?.idTipoRuolo != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci l'identificativo..."} value={idTipoRuolo} />

                            <small className='text-danger'>{formErrors?.idTipoRuolo}</small>
                        </div>




                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Descrizione<strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='descrizione' type={"text"} onChange={(e: any) => setDescrizione(e.currentTarget.value)} className={formErrors?.descrizione != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci una descrizione..."} value={descrizione} />

                            <small className='text-danger'>{formErrors?.descrizione}</small>
                        </div>

                    </div>
                </div>
            </div>

            {params.idTipoRuolo !== undefined &&
                <div className="card shadow-lg mx-1 mt-3">
                    <div className="card-header pb-0">
                        <div className="d-flex align-items-center justify-content-between">
                            <h3 className="">
                                <i className="fa-solid fa-users text-primary fa-1x pe-2 "></i>
                                Lista utenti
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
                                                <th scope="col">Id</th>
                                                <th scope="col">Nome</th>
                                                <th scope="col">Cognome</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Abilitato</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                Array.isArray(listaUtentiPerRuolo) && listaUtentiPerRuolo.map((ruolo: any, index: number) =>
                                                    <tr key={index}>
                                                        <th className='text-center' scope="row">{ruolo.idUtente}</th>
                                                        <td>{ruolo.nome}</td>
                                                        <td>{ruolo.cognome}</td>
                                                        <td>{ruolo.email}</td>

                                                        <td className='text-center'><div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" checked={ruolo.dataCreazione !== null} onClick={(e) => { cambiaAbilitazioneUtente(ruolo.dataCreazione, ruolo.idUtente) }} />
                                                        </div></td>
                                                    </tr>
                                                )}


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='col-12 text-end'>
                                <small>Pagina {paginaUtenti}</small>
                            </div>

                            <div className='col-6 text-end pt-2'>
                                <span onClick={() => getUtentiPerRuolo(paginaUtenti - 1)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Precedente</span>
                            </div>
                            <div className='col-6 text-start pt-2'>
                                <span onClick={() => getUtentiPerRuolo(paginaUtenti + 1)} className='btn btn-primary'>Successivo<i className='fa-solid fa-angles-right ps-2'></i></span>
                            </div>
                        </div>
                    </div>

                </div>
            }

            {params.idTipoRuolo !== undefined &&
                <div className="card shadow-lg mx-1 mt-3">
                    <div className="card-header pb-0">
                        <div className="d-flex align-items-center justify-content-between">
                            <h3 className="">
                                <i className="fa-solid fa-sitemap text-primary fa-1x pe-2 "></i>
                                Lista risorse
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
                                                <th scope="col">Id</th>
                                                <th scope="col">Nome metodo</th>
                                                <th scope="col">Descrizione</th>
                                                <th scope="col">Abilitato</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                Array.isArray(listaRisorsePerRuolo) && listaRisorsePerRuolo.map((ruolo: any, index: number) =>
                                                    <tr key={index}>
                                                        <th className='text-center' scope="row">{ruolo.idRisorsa}</th>
                                                        <td>{ruolo.nomeMetodo}</td>
                                                        <td>{ruolo.descrizione}</td>

                                                        <td className='text-center'><div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" checked={ruolo.dataCreazione !== null} onClick={(e) => { cambiaAbilitazioneRisorse(ruolo.dataCreazione, ruolo.idRisorsa) }} />
                                                        </div></td>
                                                    </tr>
                                                )}


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='col-12 text-end'>
                                <small>Pagina {paginaRisorse}</small>
                            </div>

                            <div className='col-6 text-end pt-2'>
                                <span onClick={() => getRisorsePerRuolo(paginaRisorse - 1)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Precedente</span>
                            </div>
                            <div className='col-6 text-start pt-2'>
                                <span onClick={() => getRisorsePerRuolo(paginaRisorse + 1)} className='btn btn-primary'>Successivo<i className='fa-solid fa-angles-right ps-2'></i></span>
                            </div>
                        </div>
                    </div>

                </div>
            }

            {params.idTipoRuolo !== undefined &&
                <div className="card shadow-lg mx-1 mt-3">
                    <div className="card-header pb-0">
                        <div className="d-flex align-items-center justify-content-between">
                            <h3 className="">
                                <i className="fa-solid fa-list-ul text-primary fa-1x pe-2 "></i>
                                Lista voci menu
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
                                                <th scope="col">Id</th>
                                                <th scope="col">Icona</th>
                                                <th scope="col">Descrizione</th>
                                                <th scope="col">Path</th>
                                                <th scope="col">Abilitato</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                Array.isArray(listaVociMenuPerRuolo) && listaVociMenuPerRuolo.map((ruolo: any, index: number) =>
                                                    <tr key={index}>
                                                        <th className='text-center' scope="row">{ruolo.idVoceMenu}</th>
                                                        <td className='text-center'><i className={ruolo.icona}></i></td>
                                                        <td>{ruolo.descrizione}</td>
                                                        <td>{ruolo.path}</td>
                                                        <td className='text-center'><div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" checked={ruolo.dataCreazione !== null} onClick={(e) => { cambiaAbilitazioneVociMenu(ruolo.dataCreazione, ruolo.idVoceMenu) }} />
                                                        </div></td>
                                                    </tr>
                                                )}


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='col-12 text-end'>
                                <small>Pagina {paginaVociMenu}</small>
                            </div>

                            <div className='col-6 text-end pt-2'>
                                <span onClick={() => getVociMenuPerRuolo(paginaVociMenu - 1)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Precedente</span>
                            </div>
                            <div className='col-6 text-start pt-2'>
                                <span onClick={() => getVociMenuPerRuolo(paginaVociMenu + 1)} className='btn btn-primary'>Successivo<i className='fa-solid fa-angles-right ps-2'></i></span>
                            </div>
                        </div>
                    </div>

                </div>
            }
        </Layout >
    );

}