import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// @ts-ignore
import { fetchIsLoadingAction } from '../modules/feedback/actions';
// @ts-ignore
import { fetchCognomeAction, fetchDataCreazioneAction, fetchEmailAction, fetchIdUtenteAction, fetchNomeAction, resetUtenteAction } from '../modules/utenteLoggato/actions';
import notificheService from '../services/NotificheService';
import utenteLoggatoService from '../services/UtenteLoggatoService';
import BreadCrumb from './Breadcrumbs';

import { toast } from 'react-toastify';
import { getData, getOra } from '../DateUtil';


export default function Header() {
    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);

    const [notifiche, setNotifiche] = React.useState<any>([]);
    const [notificheNonLette, setNotificheNonLette] = React.useState<any>([]);



    let navigate = useNavigate();
    let dispatch = useDispatch();

    // Toggle Sidenav
    const iconNavbarSidenav: any = document.getElementById('iconNavbarSidenav');
    const iconSidenav: any = document.getElementById('iconSidenav');
    const sidenav: any = document.getElementById('sidenav-main');
    let body = document.getElementsByTagName('body')[0];
    let className = 'g-sidenav-pinned';

    function toggleSidenav() {
        if (body.classList.contains(className)) {
            body.classList.remove(className);
            setTimeout(function () {
                sidenav.classNameList.remove('bg-white');
            }, 100);
            sidenav.classNameList.remove('bg-transparent');

        } else {
            body.classList.add(className);
            sidenav.classList.add('bg-white');
            sidenav.classList.remove('bg-transparent');
            iconSidenav.classList.remove('d-none');
        }
    }

    const logout = async () => {
        dispatch(fetchIsLoadingAction(true));

        await utenteLoggatoService.invalidaToken(utenteLoggato.token).then(response => {
            console.info("TOKEN INVALIDATO CON SUCCESSO");


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
            //---------------------------------------------
        }).finally(() => {
            dispatch(resetUtenteAction());
            navigate("/logout");
            dispatch(fetchIsLoadingAction(false));
        });

    }

    const getUtenteLoggato = async () => {

        dispatch(fetchIsLoadingAction(true));


        await utenteLoggatoService.getUtenteLoggato(utenteLoggato.token).then(response => {
            console.info(response.data);
            dispatch(fetchIdUtenteAction(response.data.idUtente));
            dispatch(fetchNomeAction(response.data.nome));
            dispatch(fetchCognomeAction(response.data.cognome));
            dispatch(fetchEmailAction(response.data.email));
            dispatch(fetchDataCreazioneAction(response.data.dataCreazione));


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

    const getNotificheLatoUtente = async () => {

        await notificheService.getNotificheLatoUtente(utenteLoggato.token, 1).then(response => {
            console.info(response.data);
            setNotifiche(response.data);
            let arrayTmp = [];
            for (let c = 0; c < response.data.length; c++) {
                if (response.data[c].dataLettura === null) {
                    arrayTmp.push(response.data[c]);
                }
            }
            if (arrayTmp.length > 0) {
                toast.info("Hai " + arrayTmp.length + " " + (arrayTmp.length === 1 ? "notifica" : "notifiche") + " da leggere", {
                    position: "top-center",
                    autoClose: 5000,
                });
            }
            setNotificheNonLette(arrayTmp);

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

    const leggiNotificheLatoUtente = async () => {

        await notificheService.leggiNotificheLatoUtente(utenteLoggato.token).then(response => {

            setNotificheNonLette(0);

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
        if (utenteLoggato.nome === undefined) {
            getUtenteLoggato();

        }
        getNotificheLatoUtente();

    }, []);

    return (
        <>
            <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
                <div className="container-fluid py-1 px-3">
                    <BreadCrumb />
                    <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                        <div className="ms-md-auto pe-md-3 d-flex align-items-center">

                        </div>
                        <ul className="navbar-nav  justify-content-end">

                            <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                                <a href="#" className="nav-link text-dark p-0" id="iconNavbarSidenav" onClick={toggleSidenav}>
                                    <div className="sidenav-toggler-inner">
                                        <i className="sidenav-toggler-line bg-white"></i>
                                        <i className="sidenav-toggler-line bg-white"></i>
                                        <i className="sidenav-toggler-line bg-white"></i>
                                    </div>
                                </a>
                            </li>

                            <li className="nav-item dropdown pe-3 ps-3 d-flex align-items-center">
                                <a onClick={leggiNotificheLatoUtente} href="#" className="nav-link text-white p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className={("fa fa-bell cursor-pointer ") + (notificheNonLette.length > 0 ? "fa-beat-fade" : "")}></i>
                                </a>
                                <ul className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                                    <li className="">
                                        <a className="dropdown-item border-radius-md" href="#">
                                            {
                                                Array.isArray(notifiche) && notifiche.slice(0, 3).map((notifica: any, index: number) =>
                                                    <><div key={index} className="d-flex py-1">

                                                        <div className="d-flex flex-column justify-content-center">
                                                            <h6 className="text-sm font-weight-normal mb-1">
                                                                <span className="font-weight-bold text-primary">{notifica.titolo}</span>
                                                            </h6>
                                                            <small className=" mb-1">
                                                                <span className="">{notifica.testo}</span>
                                                            </small>
                                                            <p className="text-xs text-secondary mb-0">
                                                                <i className="fa fa-clock me-1"></i>
                                                                {getData(notifica.dataInvio)} ore {getOra(notifica.dataInvio)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                        <hr className='mt-1 mb-1 bg-dark' />
                                                    </>
                                                )}
                                            <div className="d-flex justify-content-center ">

                                                <div className="d-flex flex-column justify-content-center">
                                                    <Link className='text-primary' to="/pannello-di-controllo/lista-notifiche-utente">Vedi tutte</Link>
                                                </div>
                                            </div>

                                        </a>
                                    </li>

                                </ul>
                            </li>
                            <li className="nav-item dropdown pe-2 d-flex align-items-center">
                                <a href="#" className="nav-link text-white p-0" id="dropdownUtente" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa fa-user cursor-pointer pe-1"></i>
                                    <span className="d-sm-inline d-none font-weight-bold">{utenteLoggato.nome} {utenteLoggato.cognome}</span>
                                </a>
                                <ul className="dropdown-menu  dropdown-menu-end  px-2  me-sm-n4" aria-labelledby="dropdownUtente">
                                    <li className="mb-2">
                                        <Link to="/impostazioni" className="dropdown-item" aria-current="page">
                                            <i className="fa fa-cogs fixed-plugin-button-nav cursor-pointer pe-2 text-primary"></i>
                                            Impostazioni</Link>

                                    </li>
                                    <li className="mb-2">
                                        <span className="dropdown-item" aria-current="page" onClick={logout} >
                                            <i className="fa fa-right-from-bracket fixed-plugin-button-nav cursor-pointer pe-2 text-primary"></i>
                                            Logout</span>

                                    </li>

                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
        </>
    );

}

