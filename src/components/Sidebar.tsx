import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import vociMenuService from '../services/VociMenuService';
import { toast } from 'react-toastify'
// @ts-ignore
import { fetchMenuAction } from '../modules/utenteLoggato/actions';
import configurazione from '../configurazione';
// @ts-ignore
import { fetchIsLoadingAction } from '../modules/feedback/actions';

export default function Sidebar() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getVociMenu = async () => {


        await vociMenuService.getVociMenuPerUtente(utenteLoggato.token).then(response => {
            console.info(response.data);
            dispatch(fetchIsLoadingAction(false));

            dispatch(fetchMenuAction(response.data));


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



    // Toggle Sidenav
    const iconNavbarSidenav: any = document.getElementById('iconNavbarSidenav');
    const iconSidenav: any = document.getElementById('iconSidenav');
    let sidenav: any = document.getElementById('sidenav-main');
    let body = document.getElementsByTagName('body')[0];
    let className = 'g-sidenav-pinned';




    function toggleSidenav() {

        if (body.classList.contains(className)) {
            body.classList.remove(className);
            setTimeout(function () {
                sidenav.classList.remove('bg-white');
            }, 100);
            sidenav.classList.remove('bg-transparent');

        } else {
            body.classList.add(className);
            sidenav.classList.add('bg-white');
            sidenav.classList.remove('bg-transparent');
            iconSidenav.classList.remove('d-none');
        }
    }

    window.addEventListener("resize", navbarColorOnResize);

    let referenceButtons: any = document.querySelector('[data-class]');


    function navbarColorOnResize() {

        if (sidenav == null) {
            sidenav = document.getElementById('sidenav-main');
        }

        if (referenceButtons == null) {
            referenceButtons = document.querySelector('[data-class]');
        }

        if (window.innerWidth > 1200 && referenceButtons != null) {
            if (referenceButtons.classList.contains('active') && referenceButtons.getAttribute('data-class') === 'bg-transparent') {
                sidenav.classList.remove('bg-white');
            } else {
                if (!body.classList.contains('dark-version')) {
                    sidenav.classList.add('bg-white');
                }
            }
        } else {
            sidenav.classList.add('bg-white');
            sidenav.classList.remove('bg-transparent');
        }
    }

    useEffect(() => {
        if (utenteLoggato.menu === undefined) {
            getVociMenu();
        }
    });

    const config: any = configurazione;

    return (

        <>
            <aside data-bs-dismiss="modal"
                className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 shadow-lg"
                id="sidenav-main">
                <div className="sidenav-header text-center">
                    <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-xl-none"
                        aria-hidden="true" id="iconSidenav" onClick={toggleSidenav}></i>
                    <Link onClick={getVociMenu} className="navbar-brand m-0" to="/">
                        <h1 className=""><i className={config.iconaApplicativo + " text-primary"}></i></h1>
                        <h6>{config.nomeApplicativo}</h6>
                    </Link>
                </div>
                <div className="collapse navbar-collapse  w-auto mt-5" id="sidenav-collapse-main">
                    <ul className="navbar-nav">

                        {utenteLoggato.menu !== undefined ?
                            utenteLoggato.menu.map((elemento: any, index: any) => {

                                if (elemento.figli.length === 0) {
                                    return <li key={index} title={elemento.descrizione} className="nav-item">
                                        <span className={elemento.visibile === "0" ? "d-none" : ""}>
                                            <Link className="nav-link py-1" to={"/" + elemento.path}>
                                                <div
                                                    className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                                    <i className={elemento.icona + " text-primary text-sm opacity-10"}></i>
                                                </div>
                                                <span className="nav-link-text ms-1">{elemento.descrizione}</span>
                                            </Link>
                                        </span>
                                    </li>


                                } else {
                                    return <VoceMenuFiglio key={index} elemento={elemento} />

                                }

                            }) : <></>}


                    </ul>
                </div>

            </aside>
        </>
    );

}

function VoceMenuFiglio(el: any) {

    let elemento = el.elemento;
    let key = el.key;

    return (<li key={key} className="nav-item">
        <span className="nav-link cursor-pointer py-1 collapsed" data-bs-toggle="collapse" data-bs-target={"#Z" + elemento.idVoceMenu + "-collapse"} aria-expanded="false">
            <div
                className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className={elemento.icona + " text-primary text-sm opacity-10"}></i>
            </div>
            <span className="nav-link-text ms-1">{elemento.descrizione}</span>
        </span>
        <div className="collapse ps-2" id={"Z" + elemento.idVoceMenu + "-collapse"}>
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                {

                    elemento.figli.map((figlio: any, index: any) => (

                        figlio.figli.length > 0 ?

                            <VoceMenuFiglio elemento={figlio} />
                            :
                            <li key={index} title={figlio.descrizione} className="nav-item">
                                <span className={figlio.visibile === "0" ? "d-none" : ""}>
                                    <Link className="nav-link py-1" to={"/" + figlio.path}>
                                        <div
                                            className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className={figlio.icona + " text-primary text-sm opacity-10"}></i>
                                        </div>
                                        <span className="nav-link-text ms-1">{figlio.descrizione}</span>
                                    </Link>
                                </span>
                            </li>


                    ))

                }

            </ul>
        </div>
    </li >);

}