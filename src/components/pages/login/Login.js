import './login.css'
import { useRef, useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LOGIN_URL = '/api/user/login';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const emailRef = useRef();
    const errorRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    
    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrorMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL, { email, password });

            console.log(response?.data?.message);
            
            localStorage.setItem('jwt', response?.data?.token);

            //const token = response?.data?.token;

            setAuth({ email, password });
            setEmail('');
            setPassword('');
            navigate(from, { replace: true });
        } catch (error) {
            setErrorMsg(error?.response?.data?.message)
            errorRef.current.focus();
        }
    }

    return (
        <section>
            <p ref={errorRef} className={errorMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errorMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail:</label>
                <input
                    type="text"
                    id="email"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </section>
    )
}

export default Login