import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import risorseService from '../../services/RisorseService';

export default function ListaRisorsePage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const navigate = useNavigate();

    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    const [risorsaDaEliminare, setRisorsaDaEliminare] = React.useState<any>();

    const [risorse, setRisorse] = React.useState([]);
    const [paginaRisorse, setPaginaRisorse] = React.useState(1);

    const getRisorse = async (pagina: any) => {

        if (pagina !== 0) {

            await risorseService.getRisorse(utenteLoggato.token, pagina).then(response => {

                if (response.data.length !== 0) {
                    setRisorse(response.data);
                    setPaginaRisorse(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    setRisorse(response.data);
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

    const eliminaRisorsa = async () => {
        await risorseService.eliminaRisorsa(utenteLoggato.token, risorsaDaEliminare.idRisorsa).then(response => {
            toast.success("La risorsa è stata eliminata con successo!", {
                position: "top-center",
                autoClose: 5000,
            });
            setRisorsaDaEliminare(undefined);
            getRisorse(paginaRisorse);


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
        if (!ricercaEseguita) {
            setRicercaEseguita(true);
            getRisorse(paginaRisorse);
        }
    }, []);

    return (
        <Layout>

            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-solid fa-sitemap text-primary fa-1x pe-2 "></i>
                            Lista risorse
                        </h3>
                        <Link to="/pannello-di-controllo/scheda-risorsa" className='btn btn-primary'><i className="fa-solid fa-plus pe-2"></i>Inserisci risorsa</Link>

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
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            Array.isArray(risorse) && risorse.map((voce: any, index: number) =>
                                                <tr key={index}>
                                                    <th scope="row">{voce.idRisorsa}</th>
                                                    <td>{voce.nomeMetodo}</td>
                                                    <td>{voce.descrizione}</td>
                                                    <td className='text-center'><Link to={"/pannello-di-controllo/scheda-risorsa/" + voce.idRisorsa} className='btn btn-primary'><i className="fa-solid fa-pen-to-square"></i></Link></td>
                                                    <td className='text-center'><span onClick={() => setRisorsaDaEliminare(voce)} data-bs-toggle="modal" data-bs-target="#eliminaRisorsa" className='btn btn-danger'><i className="fa-solid fa-trash-can"></i></span></td>
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
                            <span onClick={() => getRisorse(paginaRisorse - 1)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Precedente</span>
                        </div>
                        <div className='col-6 text-start pt-2'>
                            <span onClick={() => getRisorse(paginaRisorse + 1)} className='btn btn-primary'>Successivo<i className='fa-solid fa-angles-right ps-2'></i></span>
                        </div>
                    </div>
                </div>

            </div>

            <div className="modal fade" id="eliminaRisorsa" data-bs-keyboard="false" aria-labelledby="eliminaRisorsaLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="eliminaRisorsaLabel">Attenzione!</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Vuoi eliminare la risorsa <strong>{risorsaDaEliminare != undefined ? risorsaDaEliminare.descrizione : ""}</strong> con identificativo <strong>{risorsaDaEliminare != undefined ? risorsaDaEliminare.idRisorsa : ""}</strong>?<br /> L'operazione è irreversibile!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annulla<i className="fa-solid fa-undo ps-2"></i></button>
                            <button onClick={eliminaRisorsa} type="button" className="btn btn-primary" data-bs-dismiss="modal" >Elimina<i className="fa-solid fa-trash-can ps-2"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );

}