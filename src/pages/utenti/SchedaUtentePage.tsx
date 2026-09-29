import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
// @ts-ignore
import { fetchIsLoadingAction } from '../../modules/feedback/actions';
import utentiService from '../../services/UtentiService';
import SchedaUtenteValidator from '../../validators/SchedaUtenteValidator';

export default function SchedaUtentePage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const dispatch = useDispatch();
    const params = useParams();

    const [formErrors, setFormErrors] = React.useState<any>(Object);
    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);

    const [nome, setNome] = React.useState<any>("");
    const [cognome, setCognome] = React.useState<any>("");
    const [email, setEmail] = React.useState<any>("");
    const [password, setPassword] = React.useState<any>("");
    const [confermaPassword, setConfermaPassword] = React.useState<any>("");




    let navigate = useNavigate();


    const getUtente = async () => {
        dispatch(fetchIsLoadingAction(true));
        await utentiService.getUtente(utenteLoggato.token, params.idUtente).then(response => {
            setNome(response.data.nome);
            setCognome(response.data.cognome);
            setEmail(response.data.email)
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
        let formsErrorTmp = undefined;
        let jsonBody = undefined;

        if (params.idUtente === undefined) {
            jsonBody = {
                nome: nome,
                cognome: cognome,
                email: email,
                password: password,
                confermaPassword: confermaPassword
            }


            formsErrorTmp = SchedaUtenteValidator(jsonBody, true);
            setFormErrors(formsErrorTmp);

        } else {
            jsonBody = {
                nome: nome,
                cognome: cognome,
            }


            formsErrorTmp = SchedaUtenteValidator(jsonBody, false);
            setFormErrors(formsErrorTmp);

        }



        if (Object.keys(formsErrorTmp).length == 0) {

            if (params.idUtente === undefined) {
                dispatch(fetchIsLoadingAction(true));
                await utentiService.inserisciUtente(utenteLoggato.token, jsonBody).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    toast.success("Utente inserito con successo!", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                    navigate("/pannello-di-controllo/lista-utenti");
                }).catch(e => {
                    console.error(e);
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
                await utentiService.modificaUtente(utenteLoggato.token, jsonBody, params.idUtente).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    toast.success("Utente aggiornato con successo!", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }).catch(e => {
                    console.error(e);
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
            if (params.idUtente !== undefined) {
                getUtente();
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
                            {params.idUtente === undefined ? <i className="fa-solid fa-user-plus text-primary fa-1x pe-2 "></i> : <i className="fa-solid fa-user-pen text-primary fa-1x pe-2 "></i>}
                            {params.idUtente === undefined ? "Aggiungi" : "Modifica"} utente
                        </h3>
                        <button onClick={submitForm} className="btn btn-primary"
                        ><span className='pe-1'>{params.idUtente === undefined ? "Inserisci utente" : "Salva modifiche"}</span>
                            <i className="fas fa-save fa-sm fa-fw "></i>
                        </button>

                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row gx-4">



                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Nome<strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='nome' type={"text"} onChange={(e: any) => setNome(e.currentTarget.value)} className={formErrors?.nome != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci il nome"} value={nome} />

                            <small className='text-danger'>{formErrors?.nome}</small>
                        </div>

                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Cognome<strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='cognome' type={"text"} onChange={(e: any) => setCognome(e.currentTarget.value)} className={formErrors?.cognome != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci il cognome"} value={cognome} />

                            <small className='text-danger'>{formErrors?.cognome}</small>
                        </div>


                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Email<strong className='text-danger'>*</strong></label>

                            </div>
                            <input disabled={params.idUtente !== undefined} name='email' type={"text"} onChange={(e: any) => setEmail(e.currentTarget.value)} className={formErrors?.email != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci l'email..."} value={email} />

                            <small className='text-danger'>{formErrors?.email}</small>
                        </div>

                        <div className={params.idUtente !== undefined ? "d-none" : "col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Password<strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='password' type={"password"} onChange={(e: any) => setPassword(e.currentTarget.value)} className={formErrors?.password != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci una password..."} value={password} />

                            <small className='text-danger'>{formErrors?.password}</small>
                        </div>

                        <div className={params.idUtente !== undefined ? "d-none" : "col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Conferma password<strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='confermaPassword' type={"password"} onChange={(e: any) => setConfermaPassword(e.currentTarget.value)} className={formErrors?.confermaPassword != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Riscrivi la password..."} value={confermaPassword} />

                            <small className='text-danger'>{formErrors?.confermaPassword}</small>
                        </div>

                    </div>
                </div>
            </div>
        </Layout >
    );

}