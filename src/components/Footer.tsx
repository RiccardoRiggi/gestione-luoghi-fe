
export default function Footer() {
    return (
        <>
            <footer className="footer pt-3  ">
                <div className="container-fluid">
                    <div className="row align-items-center justify-content-lg-between">
                        <div className="col-lg-6 mb-lg-0 mb-4">
                            <div className="copyright text-center text-sm text-muted text-lg-start">
                                Progetto realizzato da <a className='text-bold text-decoration-none text-muted' href='https://www.riccardoriggi.it'>Riccardo Riggi</a>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                                <li className="nav-item">
                                    <a href="https://github.com/RiccardoRiggi" className="nav-link text-muted" target="_blank"><i className="fa-brands fa-github pe-1"></i>GitHub</a>
                                </li>
                                <li className="nav-item">
                                    <a href="https://www.riccardoriggi.it/progetti/" className="nav-link text-muted" target="_blank"><i className="fa-solid fa-code pe-1"></i>Vedi gli altri progetti</a>
                                </li>
                                <li className="nav-item">
                                    <a href="https://www.linkedin.com/in/riccardoriggi/" className="nav-link text-muted" target="_blank"><i className="fa-brands fa-linkedin pe-1"></i>LinkedIn</a>
                                </li>
                               
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}