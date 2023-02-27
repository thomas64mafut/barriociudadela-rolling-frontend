import './login.css';
import React, { useRef, useState, useEffect, useContext } from 'react';
import axios from '../../../api/axios';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { ThemeContext } from '../../../context/ThemeContext';
import Icon from 'react-icons-kit';
import {basic_eye} from 'react-icons-kit/linea/basic_eye';
import {basic_eye_closed} from 'react-icons-kit/linea/basic_eye_closed';
import Info from '../../../assets/icons/Info';
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /.{6,16}$/;

const Login = () => {

  const { darkMode } = useContext(ThemeContext);

  const emailRef = useRef();
  const errorRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [type, setType] = useState('password');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setErrorMsg('');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/login', { email, password });
      sessionStorage.setItem('jwt', response?.data?.token);
      setEmail('');
      setPassword('');
      window.location.replace('/');
    } catch (error) {
      setErrorMsg(error?.response?.data?.message);
      errorRef.current.focus();
    }
  };

  return (
    <>
      <div className={ darkMode ? 'main-login-container-dark' : 'main-login-container' }>
        <div className={ darkMode ? 'login-container-dark' : 'login-container' }>
          <div className={ darkMode ? 'border-container-dark' : 'border-container' }>
            <h1>Login </h1>
            <p
              ref={errorRef}
              className={errorMsg ? 'errmsg' : 'offscreen'}
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
                  maxLength="24"
                  required
                  aria-invalid={validEmail ? 'false' : 'true'}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <p
                  id="emailnote"
                  className={
                    emailFocus && email && !validEmail
                      ? 'instructions'
                      : 'offscreen'
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
                <div className='input-with-icon-div form-control'>
                  <input
                    className='custom-input'
                    placeholder="password"
                    type= {type}
                    id="password"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    minLength="6"
                    maxLength="16"
                    required
                    aria-invalid={validPwd ? 'false' : 'true'}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                  />
                  {type==='password'?(
                    <span className='icon-span' onClick={()=>setType('text')}>
                      <Icon icon={basic_eye_closed} size={18}/>
                    </span>
                  ):(
                    <span className='icon-span' onClick={()=>setType('password')}>
                      <Icon icon={basic_eye} size={18}/>
                    </span>
                  )}
                </div>
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && password && !validPwd
                      ? 'instructions'
                      : 'offscreen'
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
                  !darkMode && (!validEmail  || !validPwd)
                    ? 'btn-custom-disabled my-4'
                    : darkMode && (!validEmail  || !validPwd)
                      ? 'btn-custom-disabled-dark my-4'
                      : !darkMode && (validEmail  || validPwd)
                        ? 'btn-custom my-4'
                        : 'btn-custom-dark my-4'
                }
                disabled={
                  !validEmail || !validPwd
                    ? true
                    : false
                }
              >
                <span className={ darkMode ? 'btn-custom_top-dark' : 'btn-custom_top' }> sign in
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
  );
};

export default Login;
