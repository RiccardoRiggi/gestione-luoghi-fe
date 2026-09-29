import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import { getData, getOra } from '../../DateUtil';
//@ts-ignore
import { fetchIsLoadingAction } from '../../modules/feedback/actions';


import { MapContainer } from '../../../node_modules/react-leaflet/lib/MapContainer'
import { TileLayer } from '../../../node_modules/react-leaflet/lib/TileLayer'
import { Popup } from '../../../node_modules/react-leaflet/lib/Popup'
import { Marker } from '../../../node_modules/react-leaflet/lib/Marker'


import MarkerClusterGroup from 'react-leaflet-cluster'
import segnapostiService from '../../services/SegnapostiService';
import L from 'leaflet';
import { getIcon, TILE_SERVER_URL } from '../../MapUtil';

export default function FiltroSegnapostiPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [listaSegnaposti, setListaSegnaposti] = React.useState<any>([]);


    const eseguiRicerca = async (lat: any, lon: any) => {
        dispatch(fetchIsLoadingAction(true));


        await segnapostiService.getSegnapostiByCoordinate(utenteLoggato.token, lat, lon, raggio).then(response => {
            if (response.data.length !== 0) {
                setListaSegnaposti(response.data);
            } else {
                toast.warning("Non sono stati trovati segnaposti", {
                    position: "top-center",
                    autoClose: 5000,
                });
                setListaSegnaposti([]);
            }
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

    const [latitudineGlobale, setLatitudineGlobale] = React.useState(42.29);
    const [longitudineGlobale, setLongitudineGlobale] = React.useState(11.95);




    const [raggio, setRaggio] = React.useState(30);

    const aggiornaRaggio = (event: any) => {
        setRaggio(event.target.value);
    };

    const center = {
        lat: latitudineGlobale,
        lng: longitudineGlobale,
    }

    function DraggableMarker() {
        const [draggable, setDraggable] = React.useState(false)
        const [position, setPosition] = React.useState(center)
        const markerRef = React.useRef(null)
        const eventHandlers = React.useMemo(
            () => ({
                dragend() {
                    const marker: any = markerRef.current
                    if (marker != null) {
                        setPosition(marker.getLatLng())
                        console.info(marker.getLatLng());


                    }
                },
            }),
            [],
        )
        const toggleDraggable = React.useCallback(() => {
            setDraggable((d) => !d);
            const marker: any = markerRef.current
            setLatitudineGlobale(marker.getLatLng().lat);
            setLongitudineGlobale(marker.getLatLng().lng);
        }, [])

        const usaCoordinate = () => {
            const marker: any = markerRef.current
            console.info(+"USO COORDINATE" + marker.getLatLng());
            setLatitudineGlobale(marker.getLatLng().lat);
            setLongitudineGlobale(marker.getLatLng().lng);
            eseguiRicerca(marker.getLatLng().lat, (marker.getLatLng().lng));
        }

        const aggiornaMostraPosizioneNellaMappa = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setLatitudineGlobale(latitude);
                    setLongitudineGlobale(longitude);

                });
            } else {
                toast.warning("Non è stato possibile accedere alla geolocalizzazione del dispositivo. Verifica di aver dato correttamente i permessi all'applicazione.", {
                    position: "top-center",
                    autoClose: 5000,
                });

            }
        }



        return (
            <Marker icon={getIcon("fa-solid fa-bullseye", "text-info")}
                draggable={draggable}
                eventHandlers={eventHandlers}
                position={position}
                ref={markerRef}>
                <Popup >
                    <div className='text-center'>
                        {!draggable && <span>Latitudine: {latitudineGlobale.toFixed(2)} Longitudine: {longitudineGlobale.toFixed(2)}</span>}
                        <span><span className='btn btn-primary' onClick={aggiornaMostraPosizioneNellaMappa}>Recupera posizione in tempo reale</span></span>
                        <span onClick={toggleDraggable}>
                            {draggable
                                ? <span className='btn btn-outline-primary'>Conferma posizione</span>
                                : <span className='btn btn-primary'>Clicca per poter spostare il marker</span>}
                        </span>
                        {!draggable && <span className='btn btn-primary mt-1' onClick={usaCoordinate}>
                            Cerca in quest'area
                        </span>}
                    </div>
                </Popup>
            </Marker>
        )
    }

    useEffect(() => {

    }, []);

    const [raggruppaSegnaposti, setRaggruppaSegnaposti] = React.useState("S");


    return (
        <Layout>

            <div className='row'>
                <div className='col-12'>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h3 className="">
                                <i className="fa-solid fa-filter text-primary fa-1x pe-2 "></i>
                                Filtri
                            </h3>
                        </div>
                        <div className="card-body">
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Raggio: {raggio}km</label>
                                    <input type={"range"} onChange={aggiornaRaggio} className={"form-control"} value={raggio} min={1} max={100} step={0.1} />
                                </div>
                                <div className={"col-6 "}>
                                    <div className='d-flex flex-row align-items-center justify-content-between'>
                                        <label>Raggruppa i luoghi</label>
                                    </div>
                                    <select name='idTipoSegnaposto' className={"form-control"} onChange={(event) => setRaggruppaSegnaposti(event.currentTarget.value)} value={raggruppaSegnaposti}>
                                        <option value={"S"} >Sì</option>
                                        <option value={"N"} >No</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


                <div className='col-12'>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h3 className="">
                                <i className="fa-solid fa-map-location-dot text-primary fa-1x pe-2 "></i>
                                Mappa
                            </h3>                        </div>
                        <div className="card-body">
                            <MapContainer maxBounds={L.latLngBounds(L.latLng(37.38571283492929, 6.699148353985776), L.latLng(47.119041028305254, 14.092040617437474))} center={[41.60897592585041, 12.593894063067715]} zoom={5} scrollWheelZoom={false} >
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

                                <DraggableMarker />

                            </MapContainer>

                            <div className='col-12 pt-5'>
                                <div className='table-responsive'>
                                    <table className="table table-striped table-hover table-bordered">
                                        <thead >
                                            <tr>
                                                <th scope="col">Id</th>
                                                <th scope="col">Nome</th>
                                                <th scope="col">Distanza</th>
                                                <th scope="col">Visitato</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                Array.isArray(listaSegnaposti) && listaSegnaposti.map((segnaposto: any, index: number) =>
                                                    <tr key={index}>
                                                        <th className='text-center' scope="row">{segnaposto.idSegnaposto}</th>
                                                        <td><span className='d-block ps-3 text-bold'>{segnaposto.nome}</span></td>
                                                        <td><span className='d-block ps-3 text-bold'>{segnaposto.distanza}Km</span></td>
                                                        <td>{segnaposto.dataVisita !== null ? getData(segnaposto.dataVisita) : "Da visitare"}</td>
                                                        <td className='text-center'><Link to={"/scheda-segnaposto/" + segnaposto.idSegnaposto} className='btn btn-primary'><i className="fa-solid fa-pen-to-square"></i></Link></td>
                                                    </tr>
                                                )}


                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>


            </div>

        </Layout >
    );

}