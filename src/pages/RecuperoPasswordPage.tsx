import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// @ts-ignore
import { fetchIsLoadingAction } from '../modules/feedback/actions';
import { toast } from 'react-toastify';
import recuperoPasswordService from '../services/RecuperoPasswordService';
import configurazione from '../configurazione';



export default function RecuperoPasswordPage() {
    const dispatch = useDispatch();
    const feedback = useSelector((state: any) => state.feedback);

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);


    const [tipoRecuperoPassword, setTipoRecuperoPassword] = React.useState("");


    const [email, setEmail] = React.useState("");
    const [emailError, setEmailError] = React.useState("");

    const [nuovaPassowrd, setNuovaPassword] = React.useState("");
    const [nuovaPassowrdError, setNuovaPasswordError] = React.useState("");
    const [confermaNuovaPassword, setConfermaNuovaPassword] = React.useState("");

    const [codiceSeiCifre, setCodiceSeiCifre] = React.useState("");
    const [codiceSeiCifreError, setCodiceSeiCifreError] = React.useState("");

    const [attesaSecondoFattore, setAttesaSecondoFattore] = React.useState(false);
    const [descrizioneSecondoFattore, setDescrizioneSecondoFattore] = React.useState("");

    const [idRecPsw, setIdRecPsw] = React.useState("");

    const [listaMetodiRecuperoPassowordSupportati, setListaMetodiRecuperoPasswordSupportati] = React.useState([]);

    let navigate = useNavigate();

    const annullaProcessoDiAutenticazione = () => {
        setListaMetodiRecuperoPasswordSupportati([]);
        setEmail("");
        setNuovaPassword("");
        setConfermaNuovaPassword("");
        setEmailError("");
        setNuovaPasswordError("");
        setCodiceSeiCifre("");
        setCodiceSeiCifreError("");
        setAttesaSecondoFattore(false);

    }




    const getMetodiRecuperoPasswordSupportati = async () => {

        if (email === "") {
            setEmailError("L'indirizzo email è richiesto");
            return;
        } else {
            setEmailError("");
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            setEmailError("L'indirizzo email non è formalmente valido");
            return;
        } else {
            setEmailError("");
        }

        dispatch(fetchIsLoadingAction(true));

        let jsonBody: any = {
            email: email,
        }

        await recuperoPasswordService.getMetodiRecuperoPasswordSupportati(jsonBody, utenteLoggato.preToken).then(response => {
            console.info(response.data);
            setListaMetodiRecuperoPasswordSupportati(response.data);

            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchIsLoadingAction(false));
            navigate("/login");
        });
    }



    const effettuaRichiestaRecuperoPassword = async (email: any, tipoRecuperoPassword: any) => {

        dispatch(fetchIsLoadingAction(true));

        let jsonBody: any = {
            email: email,
            tipoRecuperoPassword: tipoRecuperoPassword,

        }

        await recuperoPasswordService.effettuaRichiestaRecuperoPassword(jsonBody, utenteLoggato.preToken).then(response => {
            console.info(response.data);
            setAttesaSecondoFattore(true);
            setDescrizioneSecondoFattore(response.data.descrizione);
            setIdRecPsw(response.data.idRecPsw);

            dispatch(fetchIsLoadingAction(false));
            setAttesaSecondoFattore(true);


        }).catch(e => {
            console.error(e);
            toast.success("Se l'indirizzo email inserito è associato ad un utente riceverai le istruzioni per proseguire con il recupero della password", {
                position: "top-center",
                autoClose: 5000,
            });
            navigate("/login");
            dispatch(fetchIsLoadingAction(false));
        });
    }

    const confermaRecuperoPassword = async () => {

        dispatch(fetchIsLoadingAction(true));

        let jsonBody: any = {
            idRecPsw: idRecPsw,
            codice: codiceSeiCifre,
            nuovaPassowrd: nuovaPassowrd,
            confermaNuovaPassword: confermaNuovaPassword

        }

        await recuperoPasswordService.confermaRecuperoPassword(jsonBody, utenteLoggato.preToken).then(response => {
            console.info(response.data);


            dispatch(fetchIsLoadingAction(false));
            navigate("/login");


        }).catch(e => {
            console.error(e);
            navigate("/login");
            dispatch(fetchIsLoadingAction(false));
        });
    }

    const scegliMetodoRecuperoPassword = (tipoAutenticazione: any) => {
        setTipoRecuperoPassword(tipoAutenticazione);
        effettuaRichiestaRecuperoPassword(email, tipoAutenticazione);

    }

    useEffect(() => {
        if (!utenteLoggato.preToken) {
            navigate("/login");
        }
    }, [])

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 text-center mx-auto">
                        <Link to="/">
                            <h1 className=" mb-2 mt-5"><i className={configurazione.iconaApplicativo + " text-primary"}></i></h1>
                            <p className="text-lead">{configurazione.nomeApplicativo}</p>
                        </Link>
                    </div>
                </div>
            </div>
            {feedback.isLoading &&
                <>
                    <main className="main-content  mt-0">
                        <section>
                            <div className="page-header min-vh-80">
                                <div className="container">
                                    <div className="row">
                                        <div className='col-12 text-center'>
                                            <i className="text-primary fa-3x fa-solid fa-spinner fast-spin fa-spin"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </>
            }

            {!feedback.isLoading && listaMetodiRecuperoPassowordSupportati.length == 0 &&
                <main className="main-content  mt-0">
                    <section>
                        <div className="page-header min-vh-80">
                            <div className="container">
                                <div className="row">
                                    <div className="shadow-lg bg-white rounded col-xl-4 col-lg-4 col-md-8 d-flex flex-column mx-0 mx-auto">
                                        <div className="card shadow-lg card-plain">
                                            <div className="card-header bg-transparent pb-0 text-start">
                                                <h4 className="font-weight-bolder">Recupero password</h4>
                                                <p className="mb-0">Inserisci il tuo indirizzo email per proseguire</p>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3">
                                                    <input className={emailError != "" ? "is-invalid form-control form-control-lg" : "form-control form-control-lg"} type="email" required onChange={(event) => { setEmailError(""); setEmail(event.currentTarget.value) }} value={email} placeholder="Email" aria-label="Email" />
                                                    <div className="text-danger">
                                                        {emailError}
                                                    </div>
                                                </div>

                                            </div>


                                            <div className="card-body mx-0 pt-0 ">

                                                <div className='row d-flex align-items-center'>

                                                    <div className='col-12'>
                                                        <span onClick={getMetodiRecuperoPasswordSupportati} className="btn btn-lg btn-primary btn-lg w-100 mb-0" >Avanti</span>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                                <p className="mb-4 text-sm mx-auto">

                                                    <Link to="/login" className="ps-1 text-primary text-gradient font-weight-bold">Clicca qui</Link> per effettuare il login!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            }



            {!feedback.isLoading && listaMetodiRecuperoPassowordSupportati.length > 0 && tipoRecuperoPassword == "" &&
                <>
                    <main className="main-content  mt-0">
                        <section>
                            <div className="page-header min-vh-80">
                                <div className="container">
                                    <div className="row">
                                        <div className="shadow-lg bg-white rounded col-xl-4 col-lg-4 col-md-8 d-flex flex-column mx-0 mx-auto">
                                            <div className="card  card-plain">
                                                <div className="card-header pb-0 text-start">
                                                    <h4 className="font-weight-bolder">Recupero password</h4>
                                                    <p className="mb-0">Seleziona il metodo di recupero password con il quale proseguire</p>
                                                </div>
                                                <div className="card-body">
                                                    <ol className="list-group list-group-numbered">
                                                        {
                                                            Array.isArray(listaMetodiRecuperoPassowordSupportati) && listaMetodiRecuperoPassowordSupportati.map((metodoAutenticazione: any, index: number) =>

                                                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center cursor-pointer" onClick={() => scegliMetodoRecuperoPassword(metodoAutenticazione.codice)}>
                                                                    <div className="ms-2 me-auto">
                                                                        {metodoAutenticazione.descrizione.substring(0, metodoAutenticazione.descrizione.indexOf("#"))}
                                                                    </div>
                                                                    <i className="fa-solid fa-chevron-right fa-2x text-primary ms-2 "></i>
                                                                </li>
                                                            )}
                                                    </ol>
                                                    <div className="text-center">
                                                        <span onClick={annullaProcessoDiAutenticazione} className="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0">Annulla</span>
                                                    </div>
                                                </div>
                                                <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                                    <p className="mb-4 text-sm mx-auto">

                                                        <Link to="/login" className="ps-1 text-primary text-gradient font-weight-bold">Clicca qui</Link> per effettuare il login!
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </>
            }

            {!feedback.isLoading && listaMetodiRecuperoPassowordSupportati.length > 0 && tipoRecuperoPassword != "" && tipoRecuperoPassword.includes("SIX") && attesaSecondoFattore &&
                <main className="main-content  mt-0">
                    <section>
                        <div className="page-header min-vh-80">
                            <div className="container">
                                <div className="row">
                                    <div className="shadow-lg bg-white rounded col-xl-4 col-lg-4 col-md-8 d-flex flex-column mx-0 mx-auto">
                                        <div className="card shadow-lg card-plain">
                                            <div className="card-header bg-transparent pb-0 text-start">
                                                <h4 className="font-weight-bolder">Recupero password</h4>
                                                <p className="mb-0">{descrizioneSecondoFattore}</p>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3">
                                                    <input className={codiceSeiCifreError != "" ? "is-invalid form-control form-control-lg" : "form-control form-control-lg"} type="text" required onChange={(event) => { setCodiceSeiCifreError(""); setCodiceSeiCifre(event.currentTarget.value) }} value={codiceSeiCifre} placeholder="Codice di conferma" aria-label="Codice di conferma" />
                                                    <div className="text-danger">
                                                        {codiceSeiCifreError}
                                                    </div>
                                                    <input className={nuovaPassowrdError != "" ? "mt-3 is-invalid form-control form-control-lg" : "mt-3 form-control form-control-lg"} type="password" required onChange={(event) => { setNuovaPasswordError(""); setNuovaPassword(event.currentTarget.value) }} value={nuovaPassowrd} placeholder="Password" aria-label="Password" />
                                                    <input className={nuovaPassowrdError != "" ? "mt-3 is-invalid form-control form-control-lg" : "mt-3 form-control form-control-lg"} type="password" required onChange={(event) => { setNuovaPasswordError(""); setConfermaNuovaPassword(event.currentTarget.value) }} value={confermaNuovaPassword} placeholder="Conferma password" aria-label="Conferma password" />
                                                    <div className="text-danger">
                                                        {nuovaPassowrdError}
                                                    </div>
                                                </div>

                                            </div>


                                            <div className="card-body mx-0 pt-0 ">

                                                <div className='row d-flex align-items-center'>

                                                    <div className='col-12'>
                                                        <span onClick={confermaRecuperoPassword} className="btn btn-lg btn-primary btn-lg w-100 mb-0" >Reimposta password</span>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                                <p className="mb-4 text-sm mx-auto">
                                                    <Link to="/login" className="ps-1 text-primary text-gradient font-weight-bold">Clicca qui</Link> per effettuare il login!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            }


        </>
    );

}

