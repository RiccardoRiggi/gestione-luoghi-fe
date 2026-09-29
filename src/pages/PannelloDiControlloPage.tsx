import React, { useEffect } from 'react';
import Layout from '../components/Layout';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import statisticheService from '../services/StatisticheService';




export default function PannelloDiControlloPage() {

    const navigate = useNavigate();

    const [numeroVociMenu, setNumeroVociMenu] = React.useState(0);
    const [numeroRuoli, setNumeroRuoli] = React.useState(0);
    const [numeroUtenti, setNumeroUtenti] = React.useState(0);
    const [numeroAccessiAttivi, setNumeroAccessiAttivi] = React.useState(0);
    const [numeroRisorse, setNumeroRisorse] = React.useState(0);
    const [numeroLogin, setNumeroLogin] = React.useState(0);
    const [numeroIndirizziIp, setNumeroIndirizziIp] = React.useState(0);
    const [numeroDispositiviFisiciAttivi, setNumeroDispositiviFisiciAttivi] = React.useState(0);

    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const [statistiche, setStatistiche] = React.useState<any>([]);


    useEffect(() => {
        if (!ricercaEseguita && utenteLoggato.token !== undefined) {
            setRicercaEseguita(true);
            getStatisticheMetodi();
            getNumeroVociMenu();
            getNumeroDispositiviFisiciAttivi();
            getNumeroIndirizziIp();
            getNumeroLogin();
            getNumeroRisorse();
            getNumeroAccessiAttivi();
            getNumeroUtenti();
            getNumeroRuoli();
        }





    }
    );

    const getValoreMassimo = () => {
        let valoreMax = 0;
        for (let c = 0; c < statistiche.length; c++) {
            if (parseInt(statistiche[c].chiamate) > valoreMax) {
                valoreMax = parseInt(statistiche[c].chiamate);
            }
        }
        return valoreMax + Math.round(valoreMax / 10);
    }


    const getStatisticheMetodi = async () => {


        await statisticheService.getStatisticheMetodi(utenteLoggato.token).then(response => {
            setStatistiche(response.data);
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


    const getNumeroVociMenu = async () => {
        await statisticheService.getNumeroVociMenu(utenteLoggato.token).then(response => {
            setNumeroVociMenu(response.data.numero);
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

    const getNumeroRuoli = async () => {
        await statisticheService.getNumeroRuoli(utenteLoggato.token).then(response => {
            setNumeroRuoli(response.data.numero);
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

    const getNumeroUtenti = async () => {
        await statisticheService.getNumeroUtenti(utenteLoggato.token).then(response => {
            setNumeroUtenti(response.data.numero);
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

    const getNumeroAccessiAttivi = async () => {
        await statisticheService.getNumeroAccessiAttivi(utenteLoggato.token).then(response => {
            setNumeroAccessiAttivi(response.data.numero);
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

    const getNumeroRisorse = async () => {
        await statisticheService.getNumeroRisorse(utenteLoggato.token).then(response => {
            setNumeroRisorse(response.data.numero);
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

    const getNumeroLogin = async () => {
        await statisticheService.getNumeroLogin(utenteLoggato.token).then(response => {
            setNumeroLogin(response.data.numero);
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

    const getNumeroIndirizziIp = async () => {
        await statisticheService.getNumeroIndirizziIp(utenteLoggato.token).then(response => {
            setNumeroIndirizziIp(response.data.numero);
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

    const getNumeroDispositiviFisiciAttivi = async () => {
        await statisticheService.getNumeroDispositiviFisiciAttivi(utenteLoggato.token).then(response => {
            setNumeroDispositiviFisiciAttivi(response.data.numero);
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






    return (
        <Layout>
            <div className='row'>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Voci di menu</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{numeroVociMenu}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa-solid fa-bars fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Ruoli configurati</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{numeroRuoli}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa-solid fa-tags fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Utenti registrati</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{numeroUtenti}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-users fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Utenti collegati</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{numeroAccessiAttivi}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa-solid fa-user-check fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Risorse registrate</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{numeroRisorse}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa-solid fa-sitemap fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Autenticazioni eseguite</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{numeroLogin}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa-solid fa-right-to-bracket fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Indirizzi ip</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{numeroIndirizziIp}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa-solid fa-location-crosshairs fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Dispositivi abilitati</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{numeroDispositiviFisiciAttivi}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa-solid fa-mobile-screen fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="col-12 mb-4">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body">
                            <div >
                                <h3 className="">
                                    <i className="fa-solid fa-sitemap text-primary fa-1x pe-2 "></i>
                                    Risorse chiamate
                                </h3>

                                <div className='row'>

                                    {
                                        Array.isArray(statistiche) && statistiche.map((statistica: any, index: number) =>
                                            <div className='col-12 col-md-6'><div className="pt-3 text-xs font-weight-bold text-primary  mb-1">
                                                {statistica.nomeMetodo}</div>
                                                <div className="progress" style={{ height: "20px" }}>
                                                    <div className="progress-bar" style={{ width: (statistica.chiamate * 100 / getValoreMassimo() > 25 ? statistica.chiamate * 100 / getValoreMassimo() + "%" : 25 + "%") }} >{statistica.chiamate} chiamate</div>
                                                </div></div>
                                        )}

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    );

}