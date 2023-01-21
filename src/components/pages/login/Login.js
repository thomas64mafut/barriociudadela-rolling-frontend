import './login.css'
import axios from '../../../api/axios';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const LOGIN_URL = '/api/user/login';

const Login = () => {
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
            localStorage.setItem('jwt', response?.data?.token);
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
                        <Form onSubmit={handleSubmit}>
                            <Form.Group >
                                <Form.Label htmlFor="email">email:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="user@mail.com"
                                    id="email"
                                    ref={emailRef}
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label htmlFor="password">password:</Form.Label>
                                <Form.Control
                                    placeholder="password"
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />
                            </Form.Group>
                            <button className='btn-custom my-4'>
                                <span className='btn-custom_top'> sign in
                                </span>
                            </button>
                        </Form>
                        <p>
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