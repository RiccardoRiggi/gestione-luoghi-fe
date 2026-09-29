import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import ruoliService from '../../services/RuoliService';
import segnapostiService from '../../services/SegnapostiService';

export default function ListaTipiSegnapostoPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const navigate = useNavigate();

    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    const [tipoSegnapostoDaEliminare, setTipoSegnapostoDaEliminare] = React.useState<any>();
    const [listaTipiSegnaposti, setListaTipiSegnaposti] = React.useState([]);
    const [paginaTipoSegnaposto, setPaginaTipoSegnaposto] = React.useState(1);

    const getListaTipiSegnaposto = async (pagina: any) => {

        if (pagina !== 0) {

            await segnapostiService.getTipiSegnaposto(utenteLoggato.token, pagina).then(response => {

                if (response.data.length !== 0) {
                    setListaTipiSegnaposti(response.data);
                    setPaginaTipoSegnaposto(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    setPaginaTipoSegnaposto(pagina);
                    setListaTipiSegnaposti(response.data);
                    toast.warning("Non sono stati trovati tipi segnaposto", {
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

    const eliminaTipoSegnaposto = async () => {
        await segnapostiService.eliminaTipoSegnaposto(utenteLoggato.token, tipoSegnapostoDaEliminare.idTipoSegnaposto).then(response => {
            toast.success("Il tipo segnaposto è stato eliminato con successo!", {
                position: "top-center",
                autoClose: 5000,
            });
            setTipoSegnapostoDaEliminare(undefined);
            getListaTipiSegnaposto(paginaTipoSegnaposto);
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
            getListaTipiSegnaposto(paginaTipoSegnaposto);
        }
    }, []);

    return (
        <Layout>

            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-solid fa-list-ul text-primary fa-1x pe-2 "></i>
                            Lista tipi segnaposti
                        </h3>
                        <Link to="/scheda-tipo-segnaposto" className='btn btn-primary'><i className="fa-solid fa-plus pe-2"></i>Inserisci tipo segnaposto</Link>

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
                                            <th scope="col">Nome</th>
                                            <th scope="col">Descrizione</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            Array.isArray(listaTipiSegnaposti) && listaTipiSegnaposti.map((tipoSegnaposto: any, index: number) =>
                                                <tr key={index}>
                                                    <th className='text-center' scope="row">{tipoSegnaposto.idTipoSegnaposto}</th>
                                                    <td><i className={tipoSegnaposto.icona + " pe-3 text-primary"}></i>{tipoSegnaposto.icona}</td>
                                                    <td>{tipoSegnaposto.nome}</td>
                                                    <td>{tipoSegnaposto.descrizione}</td>
                                                    <td className='text-center'><Link to={"/scheda-tipo-segnaposto/" + tipoSegnaposto.idTipoSegnaposto} className='btn btn-primary'><i className="fa-solid fa-pen-to-square"></i></Link></td>
                                                    <td className='text-center'><span onClick={() => setTipoSegnapostoDaEliminare(tipoSegnaposto)} data-bs-toggle="modal" data-bs-target="#eliminaRisorsa" className='btn btn-danger'><i className="fa-solid fa-trash-can"></i></span></td>
                                                </tr>
                                            )}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='col-12 text-end'>
                            <small>Pagina {paginaTipoSegnaposto}</small>
                        </div>

                        <div className='col-6 text-end pt-2'>
                            <span onClick={() => getListaTipiSegnaposto(paginaTipoSegnaposto - 1)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Precedente</span>
                        </div>
                        <div className='col-6 text-start pt-2'>
                            <span onClick={() => getListaTipiSegnaposto(paginaTipoSegnaposto + 1)} className='btn btn-primary'>Successivo<i className='fa-solid fa-angles-right ps-2'></i></span>
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
                            Vuoi eliminare il ruolo <strong>{tipoSegnapostoDaEliminare != undefined ? tipoSegnapostoDaEliminare.nome : ""}</strong> con identificativo <strong>{tipoSegnapostoDaEliminare != undefined ? tipoSegnapostoDaEliminare.idTipoSegnaposto : ""}</strong>?<br /> L'operazione è irreversibile!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annulla<i className="fa-solid fa-undo ps-2"></i></button>
                            <button onClick={eliminaTipoSegnaposto} type="button" className="btn btn-primary" data-bs-dismiss="modal" >Elimina<i className="fa-solid fa-trash-can ps-2"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );

}