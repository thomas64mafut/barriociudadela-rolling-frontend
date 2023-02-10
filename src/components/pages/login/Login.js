import './login.css'
import React, { useRef, useState, useEffect } from 'react';
import axios from '../../../api/axios';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const Login = () => {
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
            const response = await axios.post('/user/login', { email, password });
            sessionStorage.setItem('jwt', response?.data?.token);
            setEmail('');
            setPassword('');
            window.location.replace('/')
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
                                    type="email"
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
                            <button className='btn-custom my-4' type='submit'>
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
