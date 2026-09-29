import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { getData, getOra } from '../DateUtil';
import logService from '../services/LogService';
import { toast } from 'react-toastify';


export default function LogsPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const [isTail, setTail] = React.useState(false);

    const [paginaLogs, setPaginaLogs] = React.useState(1);
    const [logs, setLogs] = React.useState([]);

    const [paginaLogsTelegram, setPaginaLogsTelegram] = React.useState(1);
    const [logsTelegram, setLogsTelegram] = React.useState([]);

    const [paginaNotificheTelegram, setPaginaNotificheTelegram] = React.useState(1);
    const [notificheTelegram, setNotificheTelegram] = React.useState([]);

    let interval: any;
    const [idInterval, setIdInterval] = React.useState<any>("");




    const abilitaModalitaTail = () => {
        setTail(true);

        interval = setInterval(async () => {
            getLogs(1);
            getNotificheTelegram(1);
            getLogsTelegram(1);

        }, 3000);
        setIdInterval(interval);

    }

    const disabilitaModalitaTail = () => {
        setTail(false);
        clearInterval(idInterval);
    }

    const getLogs = async (pagina: any) => {

        if (pagina !== 0) {

            await logService.getLogs(utenteLoggato.token, pagina, params.livelloLog).then(response => {
                console.info(response.data);


                if (response.data.length !== 0) {
                    setLogs(response.data);
                    setPaginaLogs(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    toast.warning("Non sono stati trovati logs", {
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

    const getLogsTelegram = async (pagina: any) => {

        if (pagina !== 0) {

            await logService.getLogsTelegram(utenteLoggato.token, pagina).then(response => {
                console.info(response.data);


                if (response.data.length !== 0) {
                    setLogsTelegram(response.data);
                    setPaginaLogsTelegram(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    toast.warning("Non sono stati trovati logs Telegram", {
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

    const getNotificheTelegram = async (pagina: any) => {

        if (pagina !== 0) {

            await logService.getNotificheTelegram(utenteLoggato.token, pagina).then(response => {
                console.info(response.data);


                if (response.data.length !== 0) {
                    setNotificheTelegram(response.data);
                    setPaginaNotificheTelegram(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    toast.warning("Non sono state trovate notifiche Telegram", {
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


    useEffect(() => {
        getLogs(1);
        getLogsTelegram(1);
        getNotificheTelegram(1);
    }, [params.livelloLog]);


    return (
        <Layout>
            <div className='row'>
                <div className='col-12'>

                    <div className="card shadow-lg mx-1 mt-3">
                        <div className="card-header pb-0">
                            <div className="d-flex align-items-center">
                                <h3 className="mb-1">
                                    <i className="fa-solid fa-terminal text-primary fa-1x pe-2 "></i>
                                    Log applicativi
                                </h3>
                                {!isTail &&
                                    <button onClick={abilitaModalitaTail} className="btn btn-primary ms-auto"><i className="fa-solid fa-circle-play pe-2"></i>Abilita modalità tail</button>
                                }
                                {isTail &&
                                    <button onClick={disabilitaModalitaTail} className="btn btn-primary ms-auto"><i className="fa-solid fa-circle-stop pe-2"></i>Disabilita modalità tail</button>
                                }
                            </div>
                        </div>
                        <div className="card-body p-3">
                            <div className="row gx-4">

                                <><div className='col-12 '>
                                    <div className='table-responsive'>
                                        <table className="table table-striped table-hover table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Livello</th>
                                                    <th scope="col">Data evento</th>
                                                    <th scope="col">Descrizione</th>
                                                    <th scope="col">Indirizzo Ip</th>
                                                    <th scope='col'>Metodo</th>
                                                    <th scope='col'>Path</th>

                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    Array.isArray(logs) && logs.map((log: any, index: number) =>
                                                        <tr key={index}>
                                                            <th scope="row" className='text-center'>
                                                                {log.logLevel === "ERROR" &&
                                                                    <i className="fa-solid fa-xmark text-danger"></i>
                                                                }
                                                                {log.logLevel === "WARN" &&
                                                                    <i className="fa-solid fa-triangle-exclamation text-warning"></i>
                                                                }
                                                                {log.logLevel === "INFO" &&
                                                                    <i className="fa-solid fa-info text-info"></i>
                                                                }
                                                                {log.logLevel === "DEBUG" &&
                                                                    <i className="fa-solid fa-bug-slash text-success"></i>
                                                                }</th>
                                                            <td>{getOra(log.dataEvento)} {getData(log.dataEvento)}</td>
                                                            <td className='text-start'>{log.testo}</td>
                                                            <td>{log.indirizzoIp}</td>
                                                            <td>
                                                                {log.metodoHttp}
                                                            </td>
                                                            <td>
                                                                {log.path}
                                                            </td>
                                                        </tr>
                                                    )}


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                    <div className='col-12 text-end'>
                                        <small>Pagina {paginaLogs}</small>
                                    </div>
                                    <div className='col-6 text-end pt-2'>
                                        <span onClick={() => getLogs(paginaLogs - 1)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Precedente</span>
                                    </div>
                                    <div className='col-6 text-start pt-2'>
                                        <span onClick={() => getLogs(paginaLogs + 1)} className='btn btn-primary'>Successivo<i className='fa-solid fa-angles-right ps-2'></i></span>
                                    </div></>

                            </div>
                        </div>
                    </div>

                    <div className="card shadow-lg mx-1 mt-3">
                        <div className="card-header pb-0">
                            <div className="d-flex align-items-center">
                                <h3 className="mb-1">
                                    <i className="fa-solid fa-terminal text-primary fa-1x pe-2 "></i>
                                    Log Telegram
                                </h3>

                            </div>
                        </div>
                        <div className="card-body p-3">
                            <div className="row gx-4">

                                <><div className='col-12 '>
                                    <div className='table-responsive'>
                                        <table className="table table-striped table-hover table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Data evento</th>
                                                    <th scope="col">Descrizione</th>


                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    Array.isArray(logsTelegram) && logsTelegram.map((log: any, index: number) =>
                                                        <tr key={index}>

                                                            <td>{getOra(log.dataEvento)} {getData(log.dataEvento)}</td>

                                                            <td>
                                                                {log.jsonBody}
                                                            </td>
                                                        </tr>
                                                    )}


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                    <div className='col-12 text-end'>
                                        <small>Pagina {paginaLogsTelegram}</small>
                                    </div>
                                    <div className='col-6 text-end pt-2'>
                                        <span onClick={() => getLogsTelegram(paginaLogsTelegram - 1)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Precedente</span>
                                    </div>
                                    <div className='col-6 text-start pt-2'>
                                        <span onClick={() => getLogsTelegram(paginaLogsTelegram + 1)} className='btn btn-primary'>Successivo<i className='fa-solid fa-angles-right ps-2'></i></span>
                                    </div></>

                            </div>
                        </div>
                    </div>

                    <div className="card shadow-lg mx-1 mt-3">
                        <div className="card-header pb-0">
                            <div className="d-flex align-items-center">
                                <h3 className="mb-1">
                                    <i className="fa-solid fa-bell text-primary fa-1x pe-2 "></i>
                                    Notifiche Telegram
                                </h3>

                            </div>
                        </div>
                        <div className="card-body p-3">
                            <div className="row gx-4">

                                <><div className='col-12 '>
                                    <div className='table-responsive'>
                                        <table className="table table-striped table-hover table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Data evento</th>
                                                    <th scope="col">Descrizione</th>


                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    Array.isArray(notificheTelegram) && notificheTelegram.map((log: any, index: number) =>
                                                        <tr key={index}>

                                                            <td>{getOra(log.dataInvio)} {getData(log.dataInvio)}</td>

                                                            <td>
                                                                {log.testo}
                                                            </td>
                                                        </tr>
                                                    )}


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                    <div className='col-12 text-end'>
                                        <small>Pagina {paginaNotificheTelegram}</small>
                                    </div>
                                    <div className='col-6 text-end pt-2'>
                                        <span onClick={() => getNotificheTelegram(paginaNotificheTelegram - 1)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Precedente</span>
                                    </div>
                                    <div className='col-6 text-start pt-2'>
                                        <span onClick={() => getNotificheTelegram(paginaNotificheTelegram + 1)} className='btn btn-primary'>Successivo<i className='fa-solid fa-angles-right ps-2'></i></span>
                                    </div></>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </Layout >
    );

}