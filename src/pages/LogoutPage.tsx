import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import { fetchIsLoadingAction } from '../modules/feedback/actions';
//@ts-ignore
import { resetUtenteAction } from '../modules/utenteLoggato/actions';


export default function LogoutPage() {

    let navigate = useNavigate();
    let dispatch = useDispatch();

    const logout = () => {
        console.info("LOGOUT")
        dispatch(resetUtenteAction());
        dispatch(fetchIsLoadingAction(false));
        navigate("/login");
    }


    useEffect(() => {
        logout();
    });


    return (
        <></>
    );

}