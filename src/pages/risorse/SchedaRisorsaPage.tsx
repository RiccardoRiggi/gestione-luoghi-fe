import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
// @ts-ignore
import { fetchIsLoadingAction } from '../../modules/feedback/actions';
import risorseService from '../../services/RisorseService';
import SchedaRisorsaValidator from '../../validators/SchedaRisorsaValidator';

export default function SchedaRisorsaPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);

    const dispatch = useDispatch();
    const params = useParams();

    const [formErrors, setFormErrors] = React.useState<any>(Object);
    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);

    const [idRisorsa, setIdRisorsa] = React.useState<any>("");
    const [nomeMetodo, setNomeMetodo] = React.useState<any>("");
    const [descrizione, setDescrizione] = React.useState<any>("");

    const navigate = useNavigate();

    const getRisorsa = async () => {
        dispatch(fetchIsLoadingAction(true));
        await risorseService.getRisorsa(utenteLoggato.token, params.idRisorsa).then(response => {
            setIdRisorsa(response.data.idRisorsa);
            setNomeMetodo(response.data.nomeMetodo);
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
            idRisorsa: idRisorsa,
            nomeMetodo: nomeMetodo,
            descrizione: descrizione
        }

        let formsErrorTmp = SchedaRisorsaValidator(jsonBody);
        setFormErrors(formsErrorTmp);

        if (Object.keys(formsErrorTmp).length == 0) {

            if (params.idRisorsa === undefined) {
                dispatch(fetchIsLoadingAction(true));
                await risorseService.inserisciRisorsa(utenteLoggato.token, jsonBody).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    toast.success("Risorsa inserita con successo!", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                    navigate("/pannello-di-controllo/scheda-risorsa/" + idRisorsa);
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
                await risorseService.modificaRisorsa(utenteLoggato.token, jsonBody, params.idRisorsa).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    toast.success("Risorsa aggiornata con successo!", {
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
            if (params.idRisorsa !== undefined) {
                getRisorsa();
            }
            setRicercaEseguita(true);
        }
    });

    return (
        <Layout>
            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-solid fa-sitemap text-primary fa-1x pe-2 "></i>
                            {params.idRisorsa === undefined ? "Aggiungi" : "Modifica"} risorsa
                        </h3>
                        <button onClick={submitForm} className="btn btn-primary"
                        ><span className='pe-1'>{params.idRisorsa === undefined ? "Inserisci risorsa" : "Salva modifiche"}</span>
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
                            <input disabled={params.idRisorsa !== undefined} name='idRisorsa' type={"text"} onChange={(e: any) => setIdRisorsa(e.currentTarget.value)} className={formErrors?.idRisorsa != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci l'identificativo..."} value={idRisorsa} />

                            <small className='text-danger'>{formErrors?.idRisorsa}</small>
                        </div>


                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Nome del metodo<strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='nomeMetodo' type={"text"} onChange={(e: any) => setNomeMetodo(e.currentTarget.value)} className={formErrors?.nomeMetodo != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci il nome del metodo"} value={nomeMetodo} />

                            <small className='text-danger'>{formErrors?.nomeMetodo}</small>
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
        </Layout >
    );

}