import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from '../../api/axios';
import { useEffect, useState } from "react";

const AUTHSTATUS_URL = '/api/user/status';

const RequireAuth = () => {
    const { setAuth } = useAuth();
    const location = useLocation();

    let loggedStatus;
    // traer token, validar, setear en state
    useEffect(() => {
        getAuthStatus();
        console.log(loggedStatus);
    }, [location])

    const getAuthStatus = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const { data } = await axios.get(AUTHSTATUS_URL, { headers: { Authorization: token } });
            console.log({ data });
            if (!data?.isLogged) {
                loggedStatus = false;
            }            
            loggedStatus = true
            console.log('holaputo');
            setAuth({ isLogged: true, role: data.role })
        } catch (error) {
            alert(error.response?.data?.message); //customizar mensaje para en caso de que no haya token o token expirado
        }
    }

    return (
        loggedStatus
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;