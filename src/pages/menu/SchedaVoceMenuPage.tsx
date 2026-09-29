import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
// @ts-ignore
import { fetchIsLoadingAction } from '../../modules/feedback/actions';
import comboService from '../../services/ComboService';
import vociMenuService from '../../services/VociMenuService';
import SchedaVoceMenuValidator from '../../validators/SchedaVoceMenuValidator';

export default function SchedaVoceMenuPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);

    const dispatch = useDispatch();
    const params = useParams();

    const [descrizione, setDescrizione] = React.useState<any>("");
    const [path, setPath] = React.useState<any>("");
    const [icona, setIcona] = React.useState<any>("");
    const [ordine, setOrdine] = React.useState<any>();
    const [idVoceMenuPadre, setIdVoceMenuPadre] = React.useState<any>(null);

    const aggiornaVoceMenuPadre = (event: any) => {
        setIdVoceMenuPadre(event.target.value);
    }

    const [formErrors, setFormErrors] = React.useState<any>(Object);
    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    let navigate = useNavigate();

    const [listaVociMenu, setListaVociMenu] = React.useState([]);

    const getVoceMenu = async () => {
        dispatch(fetchIsLoadingAction(true));
        await vociMenuService.getVoceMenu(utenteLoggato.token, params.idVoceMenu).then(response => {
            setIdVoceMenuPadre(response.data.idVoceMenuPadre);
            setDescrizione(response.data.descrizione);
            setPath(response.data.path);
            setIcona(response.data.icona);
            setOrdine(response.data.ordine);
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
            idVoceMenuPadre: idVoceMenuPadre,
            descrizione: descrizione,
            path: path,
            icona: icona,
            ordine: ordine
        }


        let formsErrorTmp = SchedaVoceMenuValidator(jsonBody);
        setFormErrors(formsErrorTmp);

        console.info("JSONBODY: ", jsonBody);

        if (Object.keys(formsErrorTmp).length == 0) {

            if (params.idVoceMenu === undefined) {
                dispatch(fetchIsLoadingAction(true));
                await vociMenuService.inserisciVoceMenu(utenteLoggato.token, jsonBody).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    toast.success("Voce di menu salvata con successo!", {
                        position: "top-center",
                        autoClose: 5000,
                    }); navigate("/pannello-di-controllo/scheda-voce-menu/" + response.data);
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
                await vociMenuService.modificaVoceMenu(utenteLoggato.token, jsonBody, params.idVoceMenu).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    toast.success("Voce di menu aggiornata con successo!", {
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

    const getComboVociMenu = async () => {
        dispatch(fetchIsLoadingAction(true));
        await comboService.getComboVociMenu(utenteLoggato.token).then(response => {
            setListaVociMenu(response.data);
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

    useEffect(() => {

        if (!ricercaEseguita) {
            if (params.idVoceMenu !== undefined) {
                getVoceMenu();
            }
            getComboVociMenu();
            setRicercaEseguita(true);
        }
    });


    return (
        <Layout>

            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-solid fa-bars text-primary fa-1x pe-2 "></i>
                            {params.idVoceMenu === undefined ? "Aggiungi" : "Modifica"} voce di menu
                        </h3>
                        <button onClick={submitForm} className="btn btn-primary"
                        ><span className='pe-1'>{params.idVoceMenu === undefined ? "Inserisci voce di menu" : "Salva modifiche"}</span>
                            <i className="fas fa-save fa-sm fa-fw "></i>
                        </button>

                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row gx-4">
                        <div className={"col-12"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Voce di menu padre</label>

                            </div>
                            <select name='idVoceMenuPadre' className={formErrors?.idVoceMenuPadre != undefined ? "form-control is-invalid" : "form-control"} onChange={aggiornaVoceMenuPadre} value={idVoceMenuPadre}>
                                <option value={""}>Scegli...</option>
                                {Array.isArray(listaVociMenu) && listaVociMenu.map((val: any) =>
                                    <option value={val.idVoceMenu} >{val.descrizione}</option>
                                )}
                            </select>
                            <small className='text-danger'>{formErrors?.idVoceMenuPadre}</small>
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
                                <label>Path<strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='path' type={"text"} onChange={(e: any) => setPath(e.currentTarget.value)} className={formErrors?.path != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci il path..."} value={path} />

                            <small className='text-danger'>{formErrors?.path}</small>
                        </div>

                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Icona<strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='icona' type={"text"} onChange={(e: any) => setIcona(e.currentTarget.value)} className={formErrors?.icona != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci un'icona (fa-solid fa-users)"} value={icona} />

                            <small className='text-danger'>{formErrors?.icona}</small>
                        </div>

                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Ordine<strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='ordine' type={"number"} onChange={(e: any) => setOrdine(e.currentTarget.value)} className={formErrors?.ordine != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci un numero per definire l'ordine..."} value={ordine} />

                            <small className='text-danger'>{formErrors?.ordine}</small>
                        </div>


                    </div>
                </div>
            </div>
        </Layout >
    );

}