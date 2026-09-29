import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }: any) {
    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);

    const isAutorizzato = () => {
        let autorizzato = true;
        
       
        return autorizzato;
    }

    if (!isLoggedIn(utenteLoggato)) {
        return <Navigate to="/login" replace />;
    } else {
        if (isAutorizzato()) {
            return children;
        } else {
            return <Navigate to="/login" replace />;
        }

    }
};






const isLoggedIn = (token: any) => {
    return token != null;
}