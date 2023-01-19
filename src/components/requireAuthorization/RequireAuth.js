import axios from '../../api/axios';
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const AUTHSTATUS_URL = '/api/user/status';

const RequireAuth = ({ authProvider }) => {
    const { auth, setAuth } = authProvider;
    const [loggedStatus, setLoggedStatus] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAuthStatus();
    }, []);

    useEffect(() => {
        if (loggedStatus) {
            setAuth(loggedStatus);
            setIsLoading(false);
        }
    }, [loggedStatus]);

    const getAuthStatus = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const { data } = await axios.get(AUTHSTATUS_URL, { headers: { Authorization: token } });
            if (!data?.isLogged) setLoggedStatus({ isLogged: false });
            else setLoggedStatus({ isLogged: true, role: data.role }); 
        } catch (error) {
            alert(error.response?.data?.message); 
            //customizar mensaje para en caso de que no haya token o token expirado
            setIsLoading(false)
        }
    }

    return (
        !isLoading 
            ? loggedStatus?.isLogged
                ? <Outlet context={ authProvider }/>
            : <Navigate to="/login"  replace />
        : <p>loading</p>
    );
}
// state={{ from: location }}
export default RequireAuth;