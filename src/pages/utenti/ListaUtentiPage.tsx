import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import utentiService from '../../services/UtentiService';

export default function ListaUtentiPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const navigate = useNavigate();

    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    const [utenteDaEliminare, setUtenteDaEliminare] = React.useState<any>();
    const [utenti, setUtenti] = React.useState([]);
    const [paginaUtente, setPaginaUtente] = React.useState(1);

    const getUtenti = async (pagina: any) => {

        if (pagina !== 0) {

            await utentiService.getListaUtenti(utenteLoggato.token, pagina).then(response => {
                if (response.data.length !== 0) {
                    setUtenti(response.data);
                    setPaginaUtente(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    toast.warning("Non sono stati trovati utenti", {
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

    const eliminaUtente = async () => {
        await utentiService.eliminaUtente(utenteLoggato.token, utenteDaEliminare.idUtente).then(response => {
            toast.success("Utente eliminato con successo!", {
                position: "top-center",
                autoClose: 5000,
            });
            setUtenteDaEliminare(undefined);
            getUtenti(paginaUtente);
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

    const cambiaAbilitazioneUtente = async (idUtente: any, dataBlocco: any) => {
        if (dataBlocco === null) {
            await utentiService.bloccaUtente(utenteLoggato.token, null, idUtente).then(response => {
                toast.success("Utente bloccato con successo", {
                    position: "top-center",
                    autoClose: 5000,
                }); getUtenti(paginaUtente);
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
        } else {
            await utentiService.sbloccaUtente(utenteLoggato.token, null, idUtente).then(response => {
                getUtenti(paginaUtente);
                toast.success("Utente sbloccato con successo", {
                    position: "top-center",
                    autoClose: 5000,
                });
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

    useEffect(() => {
        if (!ricercaEseguita) {
            setRicercaEseguita(true);
            getUtenti(paginaUtente);
        }
    }, []);

    return (
        <Layout>

            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-solid fa-users text-primary fa-1x pe-2 "></i>
                            Lista utenti
                        </h3>
                        <Link to="/pannello-di-controllo/scheda-utente" className='btn btn-primary'><i className="fa-solid fa-user-plus pe-2"></i>Inserisci utente</Link>

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
                                            <th scope="col">Nome</th>
                                            <th scope="col">Cognome</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Bloccato</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            Array.isArray(utenti) && utenti.map((utente: any, index: number) =>
                                                <tr key={index}>
                                                    <th className='text-center' scope="row">{utente.idUtente}</th>
                                                    <td>{utente.nome}</td>
                                                    <td>{utente.cognome}</td>
                                                    <td>{utente.email}</td>
                                                    <td className='text-center'><div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" checked={utente.dataBlocco !== null} onClick={(e) => { cambiaAbilitazioneUtente(utente.idUtente, utente.dataBlocco) }} />
                                                    </div></td>
                                                    <td className='text-center'><Link to={"/pannello-di-controllo/scheda-utente/" + utente.idUtente} className='btn btn-primary'><i className="fa-solid fa-pen-to-square"></i></Link></td>
                                                    <td className='text-center'><span onClick={() => setUtenteDaEliminare(utente)} data-bs-toggle="modal" data-bs-target="#eliminaRisorsa" className='btn btn-danger'><i className="fa-solid fa-trash-can"></i></span></td>
                                                </tr>
                                            )}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='col-12 text-end'>
                            <small>Pagina {paginaUtente}</small>
                        </div>
                        <div className='col-6 text-end pt-2'>
                            <span onClick={() => getUtenti(paginaUtente - 1)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Precedente</span>
                        </div>
                        <div className='col-6 text-start pt-2'>
                            <span onClick={() => getUtenti(paginaUtente + 1)} className='btn btn-primary'>Successivo<i className='fa-solid fa-angles-right ps-2'></i></span>
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
                            Vuoi eliminare l'utente <strong>{utenteDaEliminare != undefined ? utenteDaEliminare.nome + " " + utenteDaEliminare.cognome + " (" + utenteDaEliminare.email + ")" : ""}</strong> con identificativo <strong>{utenteDaEliminare != undefined ? utenteDaEliminare.idUtente : ""}</strong>?<br /> L'operazione è irreversibile!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annulla<i className="fa-solid fa-undo ps-2"></i></button>
                            <button onClick={eliminaUtente} type="button" className="btn btn-primary" data-bs-dismiss="modal" >Elimina<i className="fa-solid fa-trash-can ps-2"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );

}