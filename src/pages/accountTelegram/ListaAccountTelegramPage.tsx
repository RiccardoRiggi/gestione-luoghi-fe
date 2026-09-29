import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import { getData, getOra } from '../../DateUtil';
import dispositiviFisiciService from '../../services/DispositiviFisiciService';

export default function ListaAccountTelegramPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const navigate = useNavigate();

    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    const [dispositivoDaEliminare, setDispositivoDaEliminare] = React.useState<any>();
    const [dispositivi, setDispositivi] = React.useState([]);
    const [paginaDispositivo, setPaginaDispositivo] = React.useState(1);

    const getListaDispositiviFisici = async (pagina: any) => {

        if (pagina !== 0) {

            await dispositiviFisiciService.getListaDispositiviFisiciTelegram(utenteLoggato.token, pagina).then(response => {

                if (response.data.length !== 0) {
                    setDispositivi(response.data);
                    setPaginaDispositivo(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    setDispositivi(response.data);
                    toast.warning("Non sono stati trovati dispositivi fisici", {
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

    const rimuoviDispositivoFisico = async () => {
        await dispositiviFisiciService.rimuoviDispositivoFisicoTelegram(utenteLoggato.token, { idDispositivoFisico: dispositivoDaEliminare.idDispositivoFisico }).then(response => {
            toast.success("Account telegram rimosso con successo!", {
                position: "top-center",
                autoClose: 5000,
            });
            setDispositivoDaEliminare(undefined);
            getListaDispositiviFisici(paginaDispositivo);

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
            getListaDispositiviFisici(paginaDispositivo);
        }
    }, []);


    return (
        <Layout>

            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-brands fa-telegram text-primary fa-1x pe-2 "></i>
                            Lista account Telegram
                        </h3>

                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row gx-4">

                        <div className='col-12 '>
                            <div className='table-responsive'>
                                <table className="table table-striped table-hover table-bordered">
                                    <thead >
                                        <tr>
                                            <th scope="col">Nome dispositivo</th>
                                            <th scope="col">Proprietario</th>
                                            <th scope="col">Data abilitazione</th>
                                            <th scope="col">Data disabilitazione</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            Array.isArray(dispositivi) && dispositivi.map((dispositivo: any, index: number) =>
                                                <tr key={index}>
                                                    <th scope="row">{dispositivo.usernameTelegram}</th>
                                                    <td>{dispositivo.cognome} {dispositivo.nome}</td>
                                                    <td>{dispositivo.dataAbilitazione !== null && <>{getData(dispositivo.dataAbilitazione)} ore {getOra(dispositivo.dataAbilitazione)}</>}</td>
                                                    <td>{dispositivo.dataDisabilitazione !== null && <>{getData(dispositivo.dataDisabilitazione)} ore {getOra(dispositivo.dataDisabilitazione)}</>}</td>
                                                    <td className='text-center'>{dispositivo.dataDisabilitazione === null && <span onClick={() => setDispositivoDaEliminare(dispositivo)} data-bs-toggle="modal" data-bs-target="#eliminaRisorsa" className='btn btn-danger'><i className="fa-solid fa-trash-can"></i></span>}</td>
                                                </tr>
                                            )}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='col-12 text-end'>
                            <small>Pagina {paginaDispositivo}</small>
                        </div>

                        <div className='col-6 text-end pt-2'>
                            <span onClick={() => getListaDispositiviFisici(paginaDispositivo - 1)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Precedente</span>
                        </div>
                        <div className='col-6 text-start pt-2'>
                            <span onClick={() => getListaDispositiviFisici(paginaDispositivo + 1)} className='btn btn-primary'>Successivo<i className='fa-solid fa-angles-right ps-2'></i></span>
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
                            Vuoi disabilitare il dispositivo di <strong>{dispositivoDaEliminare != undefined ? dispositivoDaEliminare.nome + "" + dispositivoDaEliminare.cognome : ""}</strong> chiamato <strong>{dispositivoDaEliminare != undefined ? dispositivoDaEliminare.nomeDispositivo : ""}</strong>?<br /> L'operazione è irreversibile!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annulla<i className="fa-solid fa-undo ps-2"></i></button>
                            <button onClick={rimuoviDispositivoFisico} type="button" className="btn btn-primary" data-bs-dismiss="modal" >Disabilita<i className="fa-solid fa-trash-can ps-2"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );

}