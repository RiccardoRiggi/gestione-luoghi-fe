import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import vociMenuService from '../../services/VociMenuService';
import segnapostiService from '../../services/SegnapostiService';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import comboService from '../../services/ComboService';
import L from 'leaflet';
import { getData } from '../../DateUtil';
import { TILE_SERVER_URL, getIcon } from '../../MapUtil';

export default function ReportSegnapostiPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [listaSegnaposti, setListaSegnaposti] = React.useState([]);

    const [anno, setAnno] = React.useState(new Date().toISOString().substring(0, 4));
    const [raggruppaSegnaposti, setRaggruppaSegnaposti] = React.useState("S");

    const [latitudineAttuale, setLatitudineAttuale] = React.useState(41.60897592585041);
    const [longitudineAttuale, setLongitudineAttuale] = React.useState(12.593894063067715);
    const [zoom, setZoom] = React.useState(5);


    const getSegnapostiByAnno = async () => {


        await segnapostiService.getSegnapostiByAnno(utenteLoggato.token, anno).then(response => {

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

    useEffect(() => {
        getSegnapostiByAnno();
    }, [])


    return (
        <Layout>

            <div className="card shadow-lg mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-solid fa-map-location-dot text-primary fa-1x pe-2 "></i>
                            Report luoghi
                        </h3>

                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row gx-4">


                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Anno</label>

                            </div>
                            <input name='anno' type={"number"} onChange={(e: any) => setAnno(e.currentTarget.value)} className={"form-control"} step="1" placeholder={"Inserisci un anno..."} value={anno} />

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



                        <div className={"col-12 pt-3 text-center"}>
                            <span onClick={getSegnapostiByAnno} className='btn btn-primary ms-1'><i className="pe-2 fa-solid fa-magnifying-glass-location"></i>Cerca</span>
                        </div>

                        <div className='col-12'>
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



                            </MapContainer>
                        </div>
                        <div className='col-12 pt-5'>
                            Totali: {listaSegnaposti.length}
                        </div>
                        <div className='col-12 '>
                            <div className='table-responsive'>
                                <table className="table table-striped table-hover table-bordered">
                                    <thead >
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Data visita</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            Array.isArray(listaSegnaposti) && listaSegnaposti.map((segnaposto: any, index: number) =>
                                                <tr key={index}>
                                                    <th className='text-center' scope="row"><i className={segnaposto.icona}></i></th>
                                                    <td><span className='d-block ps-3 text-bold'>{segnaposto.nome}</span></td>
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


        </Layout >
    );

}