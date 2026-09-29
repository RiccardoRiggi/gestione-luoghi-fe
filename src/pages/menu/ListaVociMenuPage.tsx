import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import vociMenuService from '../../services/VociMenuService';

export default function ListaVociMenuPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const navigate = useNavigate();

    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    const [voceMenuDaEliminare, setVoceMenuDaEliminare] = React.useState<any>();
    const [menu, setMenu] = React.useState([]);
    const [paginaMenu, setPaginaMenu] = React.useState(1);

    const getVociMenu = async (pagina: any) => {

        if (pagina !== 0) {

            await vociMenuService.getVociMenu(utenteLoggato.token, pagina).then(response => {

                if (response.data.length !== 0) {
                    setMenu(response.data);
                    setPaginaMenu(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    setMenu(response.data);
                    toast.warning("Non sono state trovate voci di menu", {
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

    const eliminaVoceMenu = async () => {
        await vociMenuService.eliminaVoceMenu(utenteLoggato.token, voceMenuDaEliminare.idVoceMenu).then(response => {
            console.info(response.data);
            toast.success("La voce di menu è stata eliminata con successo!", {
                position: "top-center",
                autoClose: 5000,
            });
            setVoceMenuDaEliminare(undefined);
            getVociMenu(paginaMenu);


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
            getVociMenu(paginaMenu);
        }
    }, []);


    return (
        <Layout>

            <div className="card shadow-lg mx-1 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-solid fa-list-ul text-primary fa-1x pe-2 "></i>
                            Lista voci di menu
                        </h3>
                        <Link to="/pannello-di-controllo/scheda-voce-menu" className='btn btn-primary'><i className="fa-solid fa-plus pe-2"></i>Inserisci voce</Link>

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
                                            <th scope="col">Descrizione</th>
                                            <th scope="col">Icona</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            Array.isArray(menu) && menu.map((voce: any, index: number) =>
                                                <tr key={index}>
                                                    <th className='text-center' scope="row">{voce.idVoceMenu}</th>
                                                    <td><small>{voce.descrizionePadre}</small><span className='d-block ps-3 text-bold'>{voce.descrizione}</span></td>
                                                    <td><i className={voce.icona + " pe-3 text-primary"}></i>{voce.icona}</td>
                                                    <td className='text-center'><Link to={"/pannello-di-controllo/scheda-voce-menu/" + voce.idVoceMenu} className='btn btn-primary'><i className="fa-solid fa-pen-to-square"></i></Link></td>
                                                    <td className='text-center'><span onClick={() => setVoceMenuDaEliminare(voce)} data-bs-toggle="modal" data-bs-target="#eliminaVoceMenu" className='btn btn-danger'><i className="fa-solid fa-trash-can"></i></span></td>
                                                </tr>
                                            )}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='col-12 text-end'>
                            <small>Pagina {paginaMenu}</small>
                        </div>

                        <div className='col-6 text-end pt-2'>
                            <span onClick={() => getVociMenu(paginaMenu - 1)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Precedente</span>
                        </div>
                        <div className='col-6 text-start pt-2'>
                            <span onClick={() => getVociMenu(paginaMenu + 1)} className='btn btn-primary'>Successivo<i className='fa-solid fa-angles-right ps-2'></i></span>
                        </div>
                    </div>
                </div>

            </div>

            <div className="modal fade" id="eliminaVoceMenu" data-bs-keyboard="false" aria-labelledby="eliminaVoceMenuLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="eliminaVoceMenuLabel">Attenzione!</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Vuoi eliminare la voce <strong>{voceMenuDaEliminare != undefined ? voceMenuDaEliminare.descrizione : ""}</strong> con identificativo <strong>{voceMenuDaEliminare != undefined ? voceMenuDaEliminare.idVoceMenu : ""}</strong>?<br /> L'operazione è irreversibile!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annulla<i className="fa-solid fa-undo ps-2"></i></button>
                            <button onClick={eliminaVoceMenu} type="button" className="btn btn-primary" data-bs-dismiss="modal" >Elimina<i className="fa-solid fa-trash-can ps-2"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );

}