import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
//@ts-ignore
import { fetchIsLoadingAction } from '../../modules/feedback/actions';
import comboService from '../../services/ComboService';
import vociMenuService from '../../services/VociMenuService';
import SchedaVoceMenuValidator from '../../validators/SchedaVoceMenuValidator';
import segnapostiService from '../../services/SegnapostiService';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { TILE_SERVER_URL, getIcon } from '../../MapUtil';
import SchedaSegnapostoValidator from '../../validators/SchedaSegnapostoValidator';

export default function SchedaSegnapostoPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);

    const dispatch = useDispatch();
    const params = useParams();

    const [idTipoSegnaposto, setIdTipoSegnaposto] = React.useState<any>(null);
    const [nome, setNome] = React.useState<any>("");
    const [descrizione, setDescrizione] = React.useState<any>("");
    const [latitudine, setLatitudine] = React.useState<any>("");
    const [longitudine, setLongitudine] = React.useState<any>("");
    const [coordinate, setCoordinate] = React.useState<any>();
    const [altitudine, setAltitudine] = React.useState<any>();
    const [dataVisita, setDataVisita] = React.useState<any>("");
    const [note, setNote] = React.useState<any>("");

    const aggiornaIdTipoSegnaposto = (event: any) => {
        setIdTipoSegnaposto(event.target.value);
    }

    const [formErrors, setFormErrors] = React.useState<any>(Object);
    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    let navigate = useNavigate();

    const [listaTipiSegnaposto, setListaTipiSegnaposto] = React.useState([]);

    const getSegnaposto = async () => {
        dispatch(fetchIsLoadingAction(true));
        await segnapostiService.getSegnaposto(utenteLoggato.token, params.idSegnaposto).then(response => {
            setIdTipoSegnaposto(response.data.idTipoSegnaposto);
            setNome(response.data.nome);
            setDescrizione(response.data.descrizione);
            setLatitudine(response.data.latitudine);
            setLongitudine(response.data.longitudine);
            setAltitudine(response.data.altitudine);
            setDataVisita(response.data.dataVisita);
            setNote(response.data.note);

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
            latitudine: latitudine,
            longitudine: longitudine,
            altitudine: altitudine,
            dataVisita: dataVisita !== "" ? dataVisita : null,
            note: note
        }


        let formsErrorTmp = SchedaSegnapostoValidator(jsonBody);
        setFormErrors(formsErrorTmp);


        if (Object.keys(formsErrorTmp).length == 0) {

            if (params.idSegnaposto === undefined) {
                dispatch(fetchIsLoadingAction(true));
                await segnapostiService.inserisciSegnaposto(utenteLoggato.token, jsonBody).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    toast.success("Luogo salvato con successo!", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                    navigate("/lista-segnaposti");
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
                await segnapostiService.modificaSegnaposto(utenteLoggato.token, jsonBody, params.idSegnaposto).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    toast.success("Luogo aggiornato con successo!", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                    navigate("/lista-segnaposti");
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

    const getComboTipoSegnaposto = async () => {
        dispatch(fetchIsLoadingAction(true));
        await comboService.getComboTipoSegnaposto(utenteLoggato.token).then(response => {
            setListaTipiSegnaposto(response.data);
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

    const convertiCoordinate = (coordinateInput: any) => {
        if ((coordinateInput.includes("N") || coordinateInput.includes("S")) && (coordinateInput.includes("E") || coordinateInput.includes("W"))) {
            let latitudineTmp = coordinateInput.substring(0, coordinateInput.indexOf("N"));
            setLatitudine(latitudineTmp);

            let longitudineTmp = coordinateInput.substring(coordinateInput.indexOf("N") + 3, coordinateInput.length - 1);
            setLongitudine(longitudineTmp);
        } else {
            setLatitudine("");
            setLongitudine("");
        }

    }

    useEffect(() => {

        if (!ricercaEseguita) {
            if (params.idSegnaposto !== undefined) {
                getSegnaposto();
            }
            getComboTipoSegnaposto();
            setRicercaEseguita(true);
        }
    });

    const recuperaCoordinateGpsPosizioneAttuale = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const accuracy = position.coords.accuracy;

                setLatitudine(latitude);
                setLongitudine(longitude);
                
                toast.warning("La posizione attuale ha una tolleranza di " + accuracy + " metri", {
                    position: "top-center",
                    autoClose: 5000,
                });


            });
        } else {
            toast.warning("Non è stato possibile accedere alla geolocalizzazione del dispositivo. Verifica di aver dato correttamente i permessi all'applicazione.", {
                position: "top-center",
                autoClose: 5000,
            });

        }
    }


    return (
        <Layout>

            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-solid fa-location-dot text-primary fa-1x pe-2 "></i>
                            {params.idSegnaposto === undefined ? "Aggiungi" : "Modifica"} luogo
                        </h3>
                        <button onClick={submitForm} className="btn btn-primary"
                        ><span className='pe-1'>{params.idSegnaposto === undefined ? "Inserisci luogo" : "Salva modifiche"}</span>
                            <i className="fas fa-save fa-sm fa-fw "></i>
                        </button>

                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row gx-4">
                        <div className={"col-12"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Categoria<strong className='text-danger'>*</strong></label>

                            </div>
                            <select name='idTipoSegnaposto' className={formErrors?.idTipoSegnaposto != undefined ? "form-control is-invalid" : "form-control"} onChange={aggiornaIdTipoSegnaposto} value={idTipoSegnaposto}>
                                <option value={""}>Scegli...</option>
                                {Array.isArray(listaTipiSegnaposto) && listaTipiSegnaposto.map((val: any) =>
                                    <option value={val.idTipoSegnaposto} >{val.nome}</option>
                                )}
                            </select>
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
                            <input name='descrizione' type={"text"} onChange={(e: any) => setDescrizione(e.currentTarget.value)} className={formErrors?.descrizione != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci la descrizione..."} value={descrizione} />

                            <small className='text-danger'>{formErrors?.descrizione}</small>
                        </div>

                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Coordinate WGS84 (gradi) <strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='coordinate' type={"text"} onChange={(e: any) => convertiCoordinate(e.currentTarget.value)} className={formErrors?.coordinate != undefined ? "form-control is-invalid" : "form-control"} placeholder={"44.1741286N, 7.7852761E"} value={coordinate} />

                            <small className='text-danger'>{formErrors?.coordinate}</small>
                        </div>

                        <div className='col-12 text-center'>
                            <small onClick={recuperaCoordinateGpsPosizioneAttuale} >Clicca qui per utilizzare la posizione attuale</small>
                        </div>

                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Latitudine<strong className='text-danger'>*</strong></label>

                            </div>
                            <input disabled name='latitudine' type={"text"} onChange={(e: any) => setLatitudine(e.currentTarget.value)} className={formErrors?.latitudine != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci la latitudine..."} value={latitudine} />

                            <small className='text-danger'>{formErrors?.latitudine}</small>
                        </div>

                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Longitudine<strong className='text-danger'>*</strong></label>

                            </div>
                            <input disabled name='longitudine' type={"text"} onChange={(e: any) => setLongitudine(e.currentTarget.value)} className={formErrors?.longitudine != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci la longitudine..."} value={longitudine} />

                            <small className='text-danger'>{formErrors?.longitudine}</small>
                        </div>

                        {latitudine !== "" && longitudine !== "" && <div className={"col-12 pt-3"}>

                            <MapContainer maxBounds={L.latLngBounds(L.latLng(37.38571283492929, 6.699148353985776), L.latLng(47.119041028305254, 14.092040617437474))} center={[latitudine, longitudine]} zoom={13} scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url={TILE_SERVER_URL}
                                />
                                <Marker icon={getIcon("fa-solid fa-location-dot", "text-success")} position={[latitudine, longitudine]}>
                                    <Popup>
                                        {nome}
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>}
                        {latitudine !== "" && longitudine !== "" && <div className={"col-12  text-center"}>
                            <a target='_blank' href={"https://www.google.com/maps/dir/?api=1&origin=&destination=" + latitudine + "," + longitudine + "&travelmode=driving"} ><small>Clicca qui per raggiungere la destinazione con Google Maps</small></a>
                        </div>}

                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Altitudine</label>

                            </div>
                            <input name='altitudine' type={"text"} onChange={(e: any) => setAltitudine(e.currentTarget.value)} className={formErrors?.altitudine != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci l'altitudine..."} value={altitudine} />

                            <small className='text-danger'>{formErrors?.altitudine}</small>
                        </div>

                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Data della visita</label>

                            </div>
                            <input name='dataVisita' type={"date"} onChange={(e: any) => setDataVisita(e.currentTarget.value)} className={formErrors?.dataVisita != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci la data..."} value={dataVisita} />

                            <small className='text-danger'>{formErrors?.dataVisita}</small>
                        </div>

                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Note</label>

                            </div>
                            <textarea rows={3} name='note' onChange={(e: any) => setNote(e.currentTarget.value)} className={formErrors?.note != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci eventuali note..."} defaultValue={note} ></textarea>

                            <small className='text-danger'>{formErrors?.note}</small>
                        </div>


                    </div>
                </div>
            </div>
        </Layout >
    );

}