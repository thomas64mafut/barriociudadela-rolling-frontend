import axios from '../../api/axios';
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const RequireAuth = ({ authProvider }) => {
    const location = useLocation();
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
            const { data } = await axios.get('/user/status');
            if (!data?.isLogged) setLoggedStatus({ isLogged: false });
            else setLoggedStatus({ isLogged: true, role: data.role }); 
        } catch (error) {
            setIsLoading(false);
        }
    }

    return (
        !isLoading 
            ? loggedStatus?.isLogged
                ? <Outlet context={ authProvider }/>
            : <Navigate to="/unauthorized"  state={{ from: location }} replace />
        : <p>loading</p>
    );
}

export default RequireAuth;
