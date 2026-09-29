import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import vociMenuService from '../../services/VociMenuService';
import segnapostiService from '../../services/SegnapostiService';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

//@ts-ignore
import { fetchIsLoadingAction } from '../../modules/feedback/actions';
import comboService from '../../services/ComboService';
import L from 'leaflet';
import { getData } from '../../DateUtil';
import { getIcon, TILE_SERVER_URL } from '../../MapUtil';

export default function ListaSegnapostiPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    const [segnapostoDaEliminare, setSegnapostoDaEliminare] = React.useState<any>();
    const [listaSegnaposti, setListaSegnaposti] = React.useState([]);

    const [raggruppaSegnaposti, setRaggruppaSegnaposti] = React.useState("S");
    const [idTipoSegnaposto, setIdTipoSegnaposto] = React.useState("");
    const [isVisitato, setIsVisitato] = React.useState("Z");
    const [mostraPosizioneNellaMappa, setMostraPosizioneNellaMappa] = React.useState("N");
    const [nome, setNome] = React.useState("");





    const getSegnaposti = async () => {


        await segnapostiService.getSegnaposti(utenteLoggato.token, idTipoSegnaposto !== "" ? idTipoSegnaposto : null, isVisitato !== "Z" ? isVisitato : null, nome !== "" ? nome : null).then(response => {

            if (response.data.length !== 0) {
                setListaSegnaposti(response.data);
            } else if (response.data.length === 0) {
                setListaSegnaposti(response.data);
                toast.warning("Non sono stati trovati luoghi", {
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

    const eliminaSegnaposto = async () => {
        await segnapostiService.eliminaSegnaposto(utenteLoggato.token, segnapostoDaEliminare.idSegnaposto).then(response => {
            console.info(response.data);
            toast.success("Il luogo è stato eliminato con successo!", {
                position: "top-center",
                autoClose: 5000,
            });
            setSegnapostoDaEliminare(undefined);
            getSegnaposti();


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

    const [listaTipiSegnaposto, setListaTipiSegnaposto] = React.useState([]);

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

    const [latitudineAttuale, setLatitudineAttuale] = React.useState(41.60897592585041);
    const [longitudineAttuale, setLongitudineAttuale] = React.useState(12.593894063067715);
    const [accuratezzaAttuale, setAccuratezzaAttuale] = React.useState(1);
    const [zoom, setZoom] = React.useState(5);

    const aggiornaMostraPosizioneNellaMappa = (input: any) => {
        setMostraPosizioneNellaMappa(input);
        if (input === "N") {
            setLatitudineAttuale(41.60897592585041);
            setLongitudineAttuale(12.593894063067715);
            setZoom(5);
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const accuracy = position.coords.accuracy;

                    setLatitudineAttuale(latitude);
                    setLongitudineAttuale(longitude);
                    setAccuratezzaAttuale(accuracy);

                    if (accuracy < 100) {
                        setZoom(13);
                    } else if (accuracy < 250) {
                        setZoom(12);
                    } else if (accuracy < 500) {
                        setZoom(11);
                    } else {
                        setZoom(10);
                    }

                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}, Accuracy: ${accuracy}`);
                });
            } else {
                toast.warning("Non è stato possibile accedere alla geolocalizzazione del dispositivo. Verifica di aver dato correttamente i permessi all'applicazione.", {
                    position: "top-center",
                    autoClose: 5000,
                });
                setLatitudineAttuale(41.60897592585041);
                setLongitudineAttuale(12.593894063067715);
                setZoom(5);
                setMostraPosizioneNellaMappa("N");
            }
        }
    }

    useEffect(() => {
        getComboTipoSegnaposto();
    }, [latitudineAttuale, longitudineAttuale])


    return (
        <Layout>

            <div className="card shadow-lg mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-solid fa-map-location-dot text-primary fa-1x pe-2 "></i>
                            Lista luoghi
                        </h3>
                        <Link to="/scheda-segnaposto" className='btn btn-primary'><i className="fa-solid fa-plus pe-2"></i>Inserisci luogo</Link>

                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row gx-4">

                        <div className={"col-12"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Categoria</label>

                            </div>
                            <select name='idTipoSegnaposto' className={"form-control"} onChange={(event) => setIdTipoSegnaposto(event.currentTarget.value)} value={idTipoSegnaposto}>
                                <option value={""}>Scegli...</option>
                                {Array.isArray(listaTipiSegnaposto) && listaTipiSegnaposto.map((val: any) =>
                                    <option value={val.idTipoSegnaposto} >{val.nome}</option>
                                )}
                            </select>
                        </div>

                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Nome</label>

                            </div>
                            <input name='nome' type={"text"} onChange={(e: any) => setNome(e.currentTarget.value)} className={"form-control"} placeholder={"Inserisci il nome..."} value={nome} />

                        </div>

                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Raggruppa i luoghi</label>
                            </div>
                            <select name='idTipoSegnaposto' className={"form-control"} onChange={(event) => setRaggruppaSegnaposti(event.currentTarget.value)} value={raggruppaSegnaposti}>
                                <option value={"S"} >Sì</option>
                                <option value={"N"} >No</option>
                            </select>
                        </div>

                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Luoghi visitati</label>
                            </div>
                            <select name='isVisitato' className={"form-control"} onChange={(event) => setIsVisitato(event.currentTarget.value)} value={isVisitato}>
                                <option value={"Z"} >Indifferente</option>
                                <option value={"S"} >Sì</option>
                                <option value={"N"} >No</option>
                            </select>
                        </div>

                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Mostra la mia posizione</label>
                            </div>
                            <select name='mostraPosizioneNellaMappa' className={"form-control"} onChange={(event) => aggiornaMostraPosizioneNellaMappa(event.currentTarget.value)} value={mostraPosizioneNellaMappa}>
                                <option value={"S"} >Sì</option>
                                <option value={"N"} >No</option>
                            </select>
                        </div>

                        <div className={"col-12 pt-3 text-center"}>
                            <Link to="/lista-segnaposti/report" className='btn btn-outline-primary me-1'><i className="pe-2 fa-solid fa-list"></i>Report</Link>

                            <Link to="/lista-segnaposti/filtro" className='btn btn-outline-primary me-1'><i className="pe-2 fa-solid fa-filter"></i>Filtra</Link>

                            <span onClick={getSegnaposti} className='btn btn-primary ms-1'><i className="pe-2 fa-solid fa-magnifying-glass-location"></i>Cerca</span>
                        </div>

                        <div className='col-12'>
                            {mostraPosizioneNellaMappa === "S" && <small>La posizione attuale ha una tolleranza di {accuratezzaAttuale} metri</small>}
                            <MapContainer maxBounds={L.latLngBounds(L.latLng(37.38571283492929, 6.699148353985776), L.latLng(47.119041028305254, 14.092040617437474))} center={[latitudineAttuale, longitudineAttuale]} zoom={zoom} scrollWheelZoom={true}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url={TILE_SERVER_URL}
                                />
                                {raggruppaSegnaposti === "S" &&
                                    <MarkerClusterGroup >
                                        {Array.isArray(listaSegnaposti) && listaSegnaposti.map((elemento: any, index: number) =>
                                            <span key={index}>
                                                <Marker icon={getIcon(elemento.icona, elemento.dataVisita !== null ? "text-success" : "text-danger")} position={[elemento.latitudine, elemento.longitudine]}>
                                                    <Popup>
                                                        <div className='text-center'>
                                                            <span className='text-center'>
                                                                <span className='h5'>{elemento.nome}</span>
                                                            </span>
                                                            <br />
                                                            <Link to={"/scheda-segnaposto/" + elemento.idSegnaposto}>Visualizza dettagli</Link>

                                                        </div>
                                                    </Popup>
                                                </Marker>
                                            </span>
                                        )}
                                    </MarkerClusterGroup>
                                }

                                {raggruppaSegnaposti === "N" && <>
                                    {
                                        Array.isArray(listaSegnaposti) && listaSegnaposti.map((elemento: any, index: number) =>
                                            <span key={index}>
                                                <Marker icon={getIcon(elemento.icona, elemento.dataVisita !== null ? "text-success" : "text-danger")} position={[elemento.latitudine, elemento.longitudine]}>
                                                    <Popup>
                                                        <div className='text-center'>
                                                            <span className='text-center'>
                                                                <span className='h5'>{elemento.nome}</span>
                                                            </span>
                                                            <br />
                                                            <Link to={"/scheda-segnaposto/" + elemento.idSegnaposto}>Visualizza dettagli</Link>

                                                        </div>
                                                    </Popup>
                                                </Marker>
                                            </span>
                                        )
                                    }
                                </>
                                }

                                {mostraPosizioneNellaMappa === "S" &&
                                    <Marker icon={getIcon("fa-solid fa-crosshairs", "text-info")} position={[latitudineAttuale, longitudineAttuale]}>
                                        <Popup>
                                            <div className='text-center'>
                                                <span className='text-center'>
                                                    <span className='h5'>{"La mia posizione"}</span>
                                                </span>

                                            </div>
                                        </Popup>
                                    </Marker>}

                            </MapContainer>
                        </div>

                        <div className='col-12 pt-5'>
                            <div className='table-responsive'>
                                <table className="table table-striped table-hover table-bordered">
                                    <thead >
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Visitato</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            Array.isArray(listaSegnaposti) && listaSegnaposti.map((segnaposto: any, index: number) =>
                                                <tr key={index}>
                                                    <th className='text-center' scope="row">{segnaposto.idSegnaposto}</th>
                                                    <td><span className='d-block ps-3 text-bold'>{segnaposto.nome}</span></td>
                                                    <td>{segnaposto.dataVisita !== null ? getData(segnaposto.dataVisita) : "Da visitare"}</td>
                                                    <td className='text-center'><Link to={"/scheda-segnaposto/" + segnaposto.idSegnaposto} className='btn btn-primary'><i className="fa-solid fa-pen-to-square"></i></Link></td>
                                                    <td className='text-center'><span onClick={() => setSegnapostoDaEliminare(segnaposto)} data-bs-toggle="modal" data-bs-target="#eliminaVoceMenu" className='btn btn-danger'><i className="fa-solid fa-trash-can"></i></span></td>
                                                </tr>
                                            )}


                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div className="modal fade" id="eliminaVoceMenu" data-bs-keyboard="false" aria-labelledby="eliminaVoceMenuLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="eliminaVoceMenuLabel">Attenzione!</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Vuoi eliminare il luogo <strong>{segnapostoDaEliminare != undefined ? segnapostoDaEliminare.nome : ""}</strong> con identificativo <strong>{segnapostoDaEliminare != undefined ? segnapostoDaEliminare.idSegnaposto : ""}</strong>?<br /> L'operazione è irreversibile!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annulla<i className="fa-solid fa-undo ps-2"></i></button>
                            <button onClick={eliminaSegnaposto} type="button" className="btn btn-primary" data-bs-dismiss="modal" >Elimina<i className="fa-solid fa-trash-can ps-2"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );

}