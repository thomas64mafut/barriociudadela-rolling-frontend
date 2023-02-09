import './login.css'
import React, { useRef, useState, useEffect } from 'react';
import axios from '../../../api/axios';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import Info from '../../../assets/icons/Info';
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /.{6,16}$/;



const Login = () => {
    const emailRef = useRef();
    const errorRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
    }, [password])

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
                                    maxlength="24"
                                    required
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="emailnote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                />
                                <p
                                    id="emailnote"
                                    className={
                                        emailFocus && email && !validEmail
                                            ? "instructions"
                                            : "offscreen"
                                    }
                                    >
                                    <div className='valid-icons'>
                                        <Info />
                                        <ul className='w-100'>
                                            <li>
                                                Please enter a valid e-mail format.
                                            </li>
                                        </ul>
                                    </div>
                                </p>
                            </Form.Group>
                            <Form.Group >
                                <Form.Label htmlFor="password">password:</Form.Label>
                                <Form.Control
                                    placeholder="password"
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    minlength="6"
                                    maxlength="16"
                                    required
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                                <p
                                    id="pwdnote"
                                    className={
                                        pwdFocus && password && !validPwd
                                            ? "instructions"
                                            : "offscreen"
                                    }
                                    >
                                    <div className='valid-icons'>
                                        <Info />
                                        <ul className='w-100'>
                                            <li>
                                                6 to 16 characters.
                                            </li>
                                        </ul>
                                    </div>
                                </p>
                            </Form.Group>
                            <button 
                                className={
                                    !validEmail  || !validPwd
                                        ? 'btn-custom-disabled my-4'
                                        : 'btn-custom my-4'
                                }
                                disabled={
                                    !validEmail || !validPwd
                                        ? true
                                        : false
                                }
                            >
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
