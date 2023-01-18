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
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    //withCredentials: true
                }
            );
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
        <>
            <div className='main-login-container'>
                <div className='login-container'>
                    <div className='border-container'>
                        <h1>Login </h1>
                        <p
                            ref={errorRef}
                            className={errorMsg ? "errmsg" : "offscreen"}
                            aria-live="assertive"
                        >
                            {errorMsg}
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className='login-form-container'>
                                <label htmlFor="email">e-mail:</label>
                                <input
                                    type="text"
                                    id="email"
                                    ref={emailRef}
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                />

                                <label htmlFor="password">password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />
                                <button className='btn-custom'>
                                    <span className='btn-custom_top'> sign in
                                    </span>
                                </button>
                            </div>
                        </form>
                        <p className='my-1'>
                            Need an Account?
                        </p>
                        <span className="line m-0">
                            <Link to="/register">Sign Up</Link>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login