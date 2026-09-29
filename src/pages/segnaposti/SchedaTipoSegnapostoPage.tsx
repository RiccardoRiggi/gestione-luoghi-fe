import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
//@ts-ignore
import { fetchIsLoadingAction } from '../../modules/feedback/actions';
import ruoliService from '../../services/RuoliService';
import SchedaRuoloValidator from '../../validators/SchedaRuoloValidator';
import segnapostiService from '../../services/SegnapostiService';
import SchedaTipoSegnapostoValidator from '../../validators/SchedaTipoSegnapostoValidator';

export default function SchedaTipoSegnapostoPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const dispatch = useDispatch();
    const params = useParams();

    const [formErrors, setFormErrors] = React.useState<any>(Object);
    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    const [idTipoSegnaposto, setIdTipoSegnaposto] = React.useState<any>("");
    const [nome, setNome] = React.useState<any>("");
    const [descrizione, setDescrizione] = React.useState<any>("");
    const [icona, setIcona] = React.useState<any>("");


    const navigate = useNavigate();


    const getTipoSegnaposto = async () => {
        dispatch(fetchIsLoadingAction(true));
        await segnapostiService.getTipoSegnaposto(utenteLoggato.token, params.idTipoSegnaposto).then(response => {
            setIdTipoSegnaposto(response.data.idTipoSegnaposto);
            setNome(response.data.nome);
            setDescrizione(response.data.descrizione);
            setIcona(response.data.icona);
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
            idTipoSegnaposto: idTipoSegnaposto,
            nome: nome,
            descrizione: descrizione,
            icona: icona
        }

        let formsErrorTmp = SchedaTipoSegnapostoValidator(jsonBody);

        setFormErrors(formsErrorTmp);

        if (Object.keys(formsErrorTmp).length == 0) {

            if (params.idTipoSegnaposto === undefined) {
                dispatch(fetchIsLoadingAction(true));
                await segnapostiService.inserisciTipoSegnaposto(utenteLoggato.token, jsonBody).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    toast.success("Tipo segnaposto inserito con successo!", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                    navigate("/scheda-tipo-segnaposto/" + idTipoSegnaposto);
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
                await segnapostiService.modificaTipoSegnaposto(utenteLoggato.token, jsonBody, params.idTipoSegnaposto).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    toast.success("Tipo segnaposto aggiornato con successo!", {
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
            if (params.idTipoSegnaposto !== undefined) {
                getTipoSegnaposto();

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
                            <i className="fa-solid fa-icons text-primary fa-1x pe-2 "></i>
                            {params.idTipoSegnaposto === undefined ? "Aggiungi" : "Modifica"} tipo segnaposto
                        </h3>
                        <button onClick={submitForm} className="btn btn-primary"
                        ><span className='pe-1'>{params.idTipoSegnaposto === undefined ? "Inserisci tipo segnaposto" : "Salva modifiche"}</span>
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
                            <input disabled={params.idTipoSegnaposto !== undefined} name='idTipoSegnaposto' type={"text"} onChange={(e: any) => setIdTipoSegnaposto(e.currentTarget.value)} className={formErrors?.idTipoSegnaposto != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci l'identificativo..."} value={idTipoSegnaposto} />

                            <small className='text-danger'>{formErrors?.idTipoSegnaposto}</small>
                        </div>


                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Nome<strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='nome' type={"text"} onChange={(e: any) => setNome(e.currentTarget.value)} className={formErrors?.nome != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci il nome..."} value={nome} />

                            <small className='text-danger'>{formErrors?.nome}</small>
                        </div>

                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Descrizione<strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='descrizione' type={"text"} onChange={(e: any) => setDescrizione(e.currentTarget.value)} className={formErrors?.descrizione != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci una descrizione..."} value={descrizione} />

                            <small className='text-danger'>{formErrors?.descrizione}</small>
                        </div>

                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Icona<i className={icona}></i><strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='icona' type={"text"} onChange={(e: any) => setIcona(e.currentTarget.value)} className={formErrors?.icona != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci un'icona..."} value={icona} />

                            <small className='text-danger'>{formErrors?.icona}</small>
                        </div>

                    </div>
                </div>
            </div>


        </Layout >
    );

}