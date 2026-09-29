import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import BreadcrumbsMap, { type BreadcrumbType } from "../BreadcrumbsMap";
import PageTitleMap from "../PageTitleMap";

export default function BreadCrumb() {

    const location = useLocation();

    const [nomePagina, setNomePagina] = React.useState("");
    const [lista, setLista] = React.useState<any>();



    useEffect(() => {
        setNomePagina(PageTitleMap(location.pathname));
        setLista(BreadcrumbsMap(location.pathname));
        console.error(nomePagina);
    }, [location.pathname]);


    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                    {
                        Array.isArray(lista) && lista.length > 1 && lista.map((singolo: BreadcrumbType, index: number) =>
                            <li key={index} className={index === lista.length - 1 ? "breadcrumb-item text-sm text-white active" : "breadcrumb-item text-sm text-white"}><Link className={index === lista.length - 1 ? "text-white" : "opacity-5 text-white"} to={singolo.path}>{singolo.nome}</Link></li>

                        )}
                </ol>
                <h6 className="font-weight-bolder text-white mb-0">{nomePagina}</h6>
            </nav>
        </>
    );
}