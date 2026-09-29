import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// @ts-ignore
import { fetchIsLoadingAction } from '../modules/feedback/actions';
// @ts-ignore
import { fetchPreTokenAction, fetchTokenAction, resetUtenteAction } from '../modules/utenteLoggato/actions';
import QRCode from "react-qr-code";
import autenticazioneService from '../services/AutenticazioneService';
import { ToastContainer, toast } from 'react-toastify';
import configurazione from '../configurazione';



export default function LoginPage() {
    const dispatch = useDispatch();
    const feedback = useSelector((state: any) => state.feedback);

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);


    const [qrCode, setQrCode] = React.useState("");

    const [tipoAutenticazione, setTipoAutenticazione] = React.useState("");


    const [email, setEmail] = React.useState("");
    const [emailError, setEmailError] = React.useState("");

    const [password, setPassword] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");

    const [codiceSeiCifre, setCodiceSeiCifre] = React.useState("");
    const [codiceSeiCifreError, setCodiceSeiCifreError] = React.useState("");

    const [checkOtpGlobale, setCheckOtpGlobale] = React.useState(false);
    const [codiceOtpGlobale, setCodiceOtpGlobale] = React.useState("");
    const [codiceOtpGlobaleError, setCodiceOtpGlobaleError] = React.useState("");

    const [attesaSecondoFattore, setAttesaSecondoFattore] = React.useState(false);
    const [descrizioneSecondoFattore, setDescrizioneSecondoFattore] = React.useState("");

    const [idLogin, setIdLogin] = React.useState("");


    const [idInterval, setIdInterval] = React.useState<any>("");
    const [iidTimerAttesaSecondoFattoredInterval, setIdTimerAttesaSecondoFattore] = React.useState<any>("");


    const [listaMetodiAutenticazioneSupportati, setListaMetodiAutenticazioneSupportati] = React.useState([]);

    let navigate = useNavigate();

    var interval: any;

    var timerAttesaSecondoFattore: any;


    const annullaProcessoDiAutenticazione = () => {
        setListaMetodiAutenticazioneSupportati([]);
        setEmail("");
        setPassword("");
        setQrCode("");
        setEmailError("");
        setPasswordError("");
        setCodiceSeiCifre("");
        setCodiceSeiCifreError("");
        setAttesaSecondoFattore(false);
        clearInterval(idInterval);
        clearInterval(iidTimerAttesaSecondoFattoredInterval);

    }

    const verificaAttivazioneQrCode = (qrCode: any) => {
        interval = setInterval(async () => {

            console.error(interval);

            await autenticazioneService.recuperaTokenDaQrCode(qrCode, utenteLoggato.preToken).then(response => {
                dispatch(fetchIsLoadingAction(true));

                console.info(response.headers);
                clearInterval(interval);
                dispatch(fetchTokenAction(response.headers.token));
                setTimeout(() => {
                    dispatch(fetchIsLoadingAction(false));
                    navigate("/")
                }, 1500);


            }).catch(e => {
                console.error(e);
                dispatch(fetchIsLoadingAction(false));
            });
        }, 2000);
        setIdInterval(interval);
    }

    const generaPreToken = async () => {

        await autenticazioneService.generaPreToken(codiceOtpGlobale).then(response => {

            dispatch(fetchPreTokenAction(response.data.preToken));
            toast.success("Applicazione sbloccata correttamente!", {
                position: "top-center",
                autoClose: 5000,
            });
            setCodiceOtpGlobale("");
            setCheckOtpGlobale(false);
        }).catch(e => {
            console.error(e);
            dispatch(fetchIsLoadingAction(false));
            console.error(e.response);
            toast.error(e.response.data.descrizione, {
                position: "top-center",
                autoClose: 5000,
            });
            dispatch(fetchPreTokenAction(""));
        });

    }

    const generaQrCode = async () => {
        setEmailError("");


        dispatch(fetchIsLoadingAction(true));

        await autenticazioneService.generaQrCode(utenteLoggato.preToken).then(response => {
            console.info(response.data);
            setQrCode(response.data.idQrCode);

            verificaAttivazioneQrCode(response.data.idQrCode);

            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchPreTokenAction(""));
            dispatch(fetchIsLoadingAction(false));
        });
    }


    const getMetodiAutenticazioneSupportati = async () => {

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

        await autenticazioneService.getMetodiAutenticazioneSupportati(jsonBody, utenteLoggato.preToken).then(response => {
            console.info(response.data);
            setListaMetodiAutenticazioneSupportati(response.data);

            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e.response.data);
            dispatch(fetchPreTokenAction(""));
            dispatch(fetchIsLoadingAction(false));
        });
    }

    const accedi = () => {
        if (password === "") {
            setPasswordError("La password è richiesta");
            return;
        } else {
            setPasswordError("");
        }

        effettuaAutenticazione(email, password, tipoAutenticazione)
    }

    const effettuaAutenticazione = async (email: any, password: any, tipoAutenticazione: any) => {

        dispatch(fetchIsLoadingAction(true));

        let jsonBody: any = {
            email: email,
            password: password,
            tipoAutenticazione: tipoAutenticazione,

        }

        await autenticazioneService.effettuaAutenticazione(jsonBody, utenteLoggato.preToken).then(response => {
            console.info(response.data);
            setAttesaSecondoFattore(true);
            setDescrizioneSecondoFattore(response.data.descrizione);
            setIdLogin(response.data.idLogin);
            if (tipoAutenticazione.includes("SI_NO")) {
                dispatch(fetchIsLoadingAction(false));
                avviaAttesaSecondoFattore(response.data.idLogin);
            } else {
                dispatch(fetchIsLoadingAction(false));
                setAttesaSecondoFattore(true);
            }

        }).catch(e => {
            console.error(e);
            dispatch(fetchPreTokenAction(""));
            toast.error(e.response.data.descrizione, {
                position: "top-center",
                autoClose: 5000,
            });
            dispatch(fetchIsLoadingAction(false));
        });
    }

    const confermaAutenticazione = async () => {

        dispatch(fetchIsLoadingAction(true));

        let jsonBody: any = {
            idLogin: idLogin,
            codice: codiceSeiCifre,

        }

        await autenticazioneService.confermaAutenticazione(jsonBody, utenteLoggato.preToken).then(response => {
            console.info(response.data);

            console.info(response.headers);
            clearInterval(timerAttesaSecondoFattore);
            dispatch(fetchTokenAction(response.headers.token));
            setTimeout(() => {
                dispatch(fetchIsLoadingAction(false));
                navigate("/");
            }, 1500);

        }).catch(e => {
            console.error(e);
            dispatch(fetchPreTokenAction(""));
            dispatch(fetchIsLoadingAction(false));
            console.error(e.response);
            toast.error(e.response.data.descrizione, {
                position: "top-center",
                autoClose: 5000,
            });
        });
    }

    const scegliMetodoAutenticazione = (tipoAutenticazione: any) => {
        setTipoAutenticazione(tipoAutenticazione);
        if (!tipoAutenticazione.includes("PSW")) {
            effettuaAutenticazione(email, undefined, tipoAutenticazione);
        }
    }

    const avviaAttesaSecondoFattore = (idLogin: any) => {
        timerAttesaSecondoFattore = setInterval(async () => {

            console.error(timerAttesaSecondoFattore);

            await autenticazioneService.recuperaTokenDaLogin(idLogin, utenteLoggato.preToken).then(response => {
                dispatch(fetchIsLoadingAction(true));

                console.info(response.headers);
                clearInterval(timerAttesaSecondoFattore);
                dispatch(fetchTokenAction(response.headers.token));
                setTimeout(() => {
                    dispatch(fetchIsLoadingAction(false));
                    navigate("/");
                }, 1500);


            }).catch(e => {
                console.error(e);


                dispatch(fetchIsLoadingAction(false));
            });
        }, 2000);
        setIdTimerAttesaSecondoFattore(timerAttesaSecondoFattore);
    }

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
            {!utenteLoggato.preToken &&

                <main className="main-content  mt-0">
                    <section>
                        <div className="page-header min-vh-80">
                            <div className="container">
                                <div className="row">
                                    <div className="shadow-lg bg-white rounded col-xl-4 col-lg-4 col-md-8 d-flex flex-column mx-0 mx-auto">
                                        <div className="card shadow-lg card-plain">
                                            {!checkOtpGlobale && <>
                                                <div className="card-header bg-transparent pb-0 text-start">
                                                    <h4 className="font-weight-bolder">Avviso</h4>
                                                    <p className="mb-0">Procedendo con l'accesso, dichiaro di essere consapevole che questa applicazione è ad uso strettamente riservato. Confermo di essere in possesso dell'autorizzazione esplicita da parte del proprietario del sistema e di operare nel rispetto delle condizioni d'uso previste. Ogni accesso non autorizzato o uso improprio sarà perseguito a norma di legge.</p>
                                                </div>

                                                <div className="card-body pt-3">

                                                    <div className='row d-flex align-items-center'>

                                                        <div className='col-12'>
                                                            <span onClick={() => { setCheckOtpGlobale(true) }} className="btn btn-lg btn-primary btn-lg w-100 mb-0" >Accetto</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </>}
                                            {checkOtpGlobale && <>
                                                <div className="card-header bg-transparent pb-0 text-start">
                                                    <h4 className="font-weight-bolder">Codice di sblocco</h4>
                                                    <p className="mb-0">Inserisci il codice di sblocco per proseguire</p>
                                                </div>
                                                <div className="card-body">
                                                    <div className="mb-3">
                                                        <input className={codiceOtpGlobaleError != "" ? "is-invalid form-control form-control-lg" : "form-control form-control-lg"} type="text" required onChange={(event) => { setCodiceOtpGlobaleError(""); setCodiceOtpGlobale(event.currentTarget.value) }} value={codiceOtpGlobale} placeholder="Codice di sblocco" aria-label="Codice di sblocco" />
                                                        <div className="text-danger">
                                                            {codiceOtpGlobaleError}
                                                        </div>
                                                    </div>

                                                </div>


                                                <div className="card-body mx-0 pt-0 ">

                                                    <div className='row d-flex align-items-center'>

                                                        <div className='col-12'>
                                                            <span onClick={generaPreToken} className="btn btn-lg btn-primary btn-lg w-100 mb-0" >Conferma</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </>}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

            }
            {utenteLoggato.preToken &&
                <>

                    {!feedback.isLoading && listaMetodiAutenticazioneSupportati.length == 0 && qrCode == "" &&
                        <main className="main-content  mt-0">
                            <section>
                                <div className="page-header min-vh-80">
                                    <div className="container">
                                        <div className="row">
                                            <div className="shadow-lg bg-white rounded col-xl-4 col-lg-4 col-md-8 d-flex flex-column mx-0 mx-auto">
                                                <div className="card shadow-lg card-plain">
                                                    <div className="card-header bg-transparent pb-0 text-start">
                                                        <h4 className="font-weight-bolder">Autenticazione</h4>
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
                                                            <div className='col-3 text-center'>
                                                                <span onClick={generaQrCode}><i className="cursor-pointer fa-solid fa-qrcode fa-2x"></i></span>
                                                            </div>
                                                            <div className='col-9'>
                                                                <span onClick={getMetodiAutenticazioneSupportati} className="btn btn-lg btn-primary btn-lg w-100 mb-0" >Avanti</span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                                        <p className="mb-4 text-sm mx-auto">
                                                            Hai dimenticato la password?
                                                            <Link to="/recupero-password" className="ps-1 text-primary text-gradient font-weight-bold">Clicca qui</Link>
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

                    {!feedback.isLoading && listaMetodiAutenticazioneSupportati.length == 0 && qrCode != "" &&
                        <main className="main-content  mt-0">
                            <section>
                                <div className="page-header min-vh-80">
                                    <div className="container">
                                        <div className="row">
                                            <div className="shadow-lg bg-white rounded col-xl-4 col-lg-4 col-md-8 d-flex flex-column mx-0 mx-auto">
                                                <div className="card  card-plain">
                                                    <div className="card-header bg-transparent pb-0 text-start">
                                                        <h4 className="font-weight-bolder">Autenticazione</h4>
                                                        <p className="mb-0">Inquadra il qr code con l'authenticator</p>
                                                    </div>
                                                    <div className="card-body">
                                                        <form role="form">
                                                            <div className="mb-3">
                                                                <QRCode className='w-100 ' fgColor='#344767' value={qrCode} />
                                                            </div>

                                                        </form>
                                                    </div>


                                                    <div className="card-body mx-0 pt-0 ">
                                                        <div className='row d-flex align-items-center'>

                                                            <div className='col-12'>
                                                                <span onClick={annullaProcessoDiAutenticazione} className="btn btn-lg btn-primary btn-lg w-100 mb-0">Annulla</span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                                        <p className="mb-4 text-sm mx-auto">
                                                            Hai dimenticato la password?
                                                            <Link to="/recupero-password" className="ps-1 text-primary text-gradient font-weight-bold">Clicca qui</Link>
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

                    {!feedback.isLoading && listaMetodiAutenticazioneSupportati.length > 0 && tipoAutenticazione == "" &&
                        <>
                            <main className="main-content  mt-0">
                                <section>
                                    <div className="page-header min-vh-80">
                                        <div className="container">
                                            <div className="row">
                                                <div className="shadow-lg bg-white rounded col-xl-4 col-lg-4 col-md-8 d-flex flex-column mx-0 mx-auto">
                                                    <div className="card  card-plain">
                                                        <div className="card-header pb-0 text-start">
                                                            <h4 className="font-weight-bolder">Autenticazione</h4>
                                                            <p className="mb-0">Seleziona il metodo di autenticazione con il quale proseguire</p>
                                                        </div>
                                                        <div className="card-body">
                                                            <ol className="list-group list-group-numbered">
                                                                {
                                                                    Array.isArray(listaMetodiAutenticazioneSupportati) && listaMetodiAutenticazioneSupportati.map((metodoAutenticazione: any, index: number) =>

                                                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center cursor-pointer" onClick={() => scegliMetodoAutenticazione(metodoAutenticazione.codice)}>
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
                                                                Hai dimenticato la password?
                                                                <Link to="/recupero-password" className="ps-1 text-primary text-gradient font-weight-bold">Clicca qui</Link>
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

                    {!feedback.isLoading && listaMetodiAutenticazioneSupportati.length > 0 && tipoAutenticazione != "" && tipoAutenticazione.includes("PSW") && !attesaSecondoFattore &&
                        <main className="main-content  mt-0">
                            <section>
                                <div className="page-header min-vh-80">
                                    <div className="container">
                                        <div className="row">
                                            <div className="shadow-lg bg-white rounded col-xl-4 col-lg-4 col-md-8 d-flex flex-column mx-0 mx-auto">
                                                <div className="card shadow-lg card-plain">
                                                    <div className="card-header bg-transparent pb-0 text-start">
                                                        <h4 className="font-weight-bolder">Autenticazione</h4>
                                                        <p className="mb-0">Inserisci la tua password per proseguire</p>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="mb-3">
                                                            <input className={passwordError != "" ? "is-invalid form-control form-control-lg" : "form-control form-control-lg"} type="password" required onChange={(event) => { setPasswordError(""); setPassword(event.currentTarget.value) }} value={password} placeholder="Password" aria-label="Password" />
                                                            <div className="text-danger">
                                                                {passwordError}
                                                            </div>
                                                        </div>

                                                    </div>


                                                    <div className="card-body mx-0 pt-0 ">

                                                        <div className='row d-flex align-items-center'>

                                                            <div className='col-12'>
                                                                <span onClick={accedi} className="btn btn-lg btn-primary btn-lg w-100 mb-0" >Accedi</span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                                        <p className="mb-4 text-sm mx-auto">
                                                            Hai dimenticato la password?
                                                            <Link to="/recupero-password" className="ps-1 text-primary text-gradient font-weight-bold">Clicca qui</Link>
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

                    {!feedback.isLoading && listaMetodiAutenticazioneSupportati.length > 0 && tipoAutenticazione != "" && (tipoAutenticazione.includes("SIX") || tipoAutenticazione.includes("BACKUP_CODE")) && attesaSecondoFattore &&
                        <main className="main-content  mt-0">
                            <section>
                                <div className="page-header min-vh-80">
                                    <div className="container">
                                        <div className="row">
                                            <div className="shadow-lg bg-white rounded col-xl-4 col-lg-4 col-md-8 d-flex flex-column mx-0 mx-auto">
                                                <div className="card shadow-lg card-plain">
                                                    <div className="card-header bg-transparent pb-0 text-start">
                                                        <h4 className="font-weight-bolder">Autenticazione</h4>
                                                        <p className="mb-0">{descrizioneSecondoFattore}</p>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="mb-3">
                                                            <input className={codiceSeiCifreError != "" ? "is-invalid form-control form-control-lg" : "form-control form-control-lg"} type="text" required onChange={(event) => { setCodiceSeiCifreError(""); setCodiceSeiCifre(event.currentTarget.value) }} value={codiceSeiCifre} placeholder="Codice di conferma" aria-label="Codice di conferma" />
                                                            <div className="text-danger">
                                                                {codiceSeiCifreError}
                                                            </div>
                                                        </div>

                                                    </div>


                                                    <div className="card-body mx-0 pt-0 ">

                                                        <div className='row d-flex align-items-center'>

                                                            <div className='col-12'>
                                                                <span onClick={confermaAutenticazione} className="btn btn-lg btn-primary btn-lg w-100 mb-0" >Conferma</span>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </main>
                    }

                    {!feedback.isLoading && listaMetodiAutenticazioneSupportati.length > 0 && tipoAutenticazione != "" && tipoAutenticazione.includes("SI_NO") && attesaSecondoFattore &&
                        <main className="main-content  mt-0">
                            <section>
                                <div className="page-header min-vh-80">
                                    <div className="container">
                                        <div className="row">
                                            <div className="shadow-lg bg-white rounded col-xl-4 col-lg-4 col-md-8 d-flex flex-column mx-0 mx-auto">
                                                <div className="card shadow-lg card-plain">
                                                    <div className="card-header bg-transparent pb-0 text-start">
                                                        <h4 className="font-weight-bolder">Autenticazione</h4>
                                                        <p className="mb-0">{descrizioneSecondoFattore}</p>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="mb-3 text-center">
                                                            <i className="fa-solid fa-mobile-screen-button fa-5x text-primary fa-beat-fade"></i>
                                                        </div>

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
            }
        </>
    );

}

