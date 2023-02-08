import '../login/login.css';
import './register.css';
import { useRef, useState, useEffect } from "react";
import axios from '../../../api/axios';
import { Link } from "react-router-dom";
import { Form } from 'react-bootstrap';

import Icon from 'react-icons-kit';
import {basic_eye} from 'react-icons-kit/linea/basic_eye';
import {basic_eye_closed} from 'react-icons-kit/linea/basic_eye_closed';
import {arrows_exclamation} from 'react-icons-kit/linea/arrows_exclamation';
import {arrows_circle_check} from 'react-icons-kit/linea/arrows_circle_check';

import Check from '../../../assets/icons/Check';
import Info from '../../../assets/icons/Info';
import X from '../../../assets/icons/X';

const USER_REGEX = /^[A-z][A-z0-9-_]{4,16}$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,16}$/;

const Register = () => {
    const userRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    const [letterInitValidated, setLetterInitValidated]=useState(false);
    const [specialUserValidated, setSpecialUserValidated]=useState(false);
    const [lengthUserValidated, setLengthUserValidated]=useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [type, setType] = useState('password');
    const [lowerValidated, setLowerValidated]=useState(false);
    const [upperValidated, setUpperValidated]=useState(false);
    const [numberValidated, setNumberValidated]=useState(false);
    const [specialValidated, setSpecialValidated]=useState(false);
    const [lengthValidated, setLengthValidated]=useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        if (password) setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    useEffect(() => {
        setErrorMsg('');
    }, [username, email, password, matchPwd])
    
    const handleUserNameChange=(value)=>{
        setUsername(value)
        const letterInit = new RegExp('(^[a-zA-Z])');
        const specialUser = new RegExp('(?=.*[A-z0-9-_])');
        const lengthUser = new RegExp('(?=.{5,16})');

        letterInit.test(value)
            ? setLetterInitValidated(true)
            : setLetterInitValidated(false)
        
        specialUser.test(value)
            ? setSpecialUserValidated(true)
            : setSpecialUserValidated(false)

        lengthUser.test(value)
            ? setLengthUserValidated(true)
            : setLengthUserValidated(false)
    }
    
    const handlePwdChange=(value)=>{
        setPassword(value)
        const lower = new RegExp('(?=.*[a-z])');
        const upper = new RegExp('(?=.*[A-Z])');
        const number = new RegExp('(?=.*[0-9])');
        const special = new RegExp('(?=.*[!@#$%])');
        const length = new RegExp('(?=.{6,16})')

        lower.test(value)
            ? setLowerValidated(true)
            : setLowerValidated(false)

        upper.test(value)
            ? setUpperValidated(true)
            : setUpperValidated(false)

        number.test(value)
            ? setNumberValidated(true)
            : setNumberValidated(false)
        
        special.test(value)
            ? setSpecialValidated(true)
            : setSpecialValidated(false)
        
        length.test(value)
            ? setLengthValidated(true)
            : setLengthValidated(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(username);
        const v2 = EMAIL_REGEX.test(email);
        const v3 = PWD_REGEX.test(password);
        if (!v1 || !v2 || !v3) {
            setErrorMsg("Invalid Entry");
            return;
        }

        try {
            await axios.post('/user/register', { username, email, password });
            setSuccess(true);
            setUsername('');
            setPassword('');
            setMatchPwd('');
        } catch (error) {
            if (!error?.response) {
                setErrorMsg('No Server Response');
            } else if (error.response?.status === 409) {
                setErrorMsg('Username Taken');
            } else if (error.response?.status === 400) {
                if (error.response.data.errors[0].msg === 'e-mail already in use') setErrorMsg('e-mail already in use')
                else setErrorMsg('Invalid e-mail');
            } else {
                setErrorMsg('Registration Failed')
            }
            errorRef.current.focus();
        }
    }

    return (
        <>
            <div className='main-login-container'>
                <div className="login-container">
                    <div className="border-container">
                        {success ? (
                            <div>
                                <h1>Success!</h1>
                                <p>
                                    <Link to="/login">Sign In</Link>
                                </p>
                            </div>
                        ) : (
                            <div>
                                <p ref={errorRef} className={errorMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errorMsg}</p>
                                <h1>Register</h1>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group id='username'>
                                        <Form.Label htmlFor="username">
                                            <div className='valid-icons'>
                                                username:
                                                <div className={validName ? "valid" : "hide"}>
                                                    <Check />
                                                </div>
                                                <div className={validName || !username ? "hide" : "invalid"}>
                                                    <X />
                                                </div>
                                            </div>
                                        </Form.Label>
                                        <Form.Control
                                            placeholder="username"
                                            type="text"
                                            id="username"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => handleUserNameChange(e.target.value)}
                                            value={username}
                                            minlength="5"
                                            maxlength="16"
                                            required
                                            aria-invalid={validName ? "false" : "true"}
                                            aria-describedby="uidnote"
                                            onFocus={() => setUserFocus(true)}
                                            onBlur={() => setUserFocus(false)}
                                        />
                                        <p
                                            id="uidnote"
                                            className={
                                                userFocus && username && !validName
                                                    ? "instructions"
                                                    : "offscreen"
                                            }
                                        >
                                            <div className='valid-icons'>
                                                <Info />
                                                <div className='tacker-box'>
                                                    <div className={letterInitValidated?'validated':'not-validated'}>
                                                        {letterInitValidated?(
                                                        <span className='list-icon green'>
                                                            <Icon icon={arrows_circle_check}/>  
                                                        </span>
                                                        ):(
                                                        <span className='list-icon'>
                                                            <Icon icon={arrows_exclamation}/>  
                                                        </span>
                                                        )}
                                                        Must begin with a letter.
                                                    </div>
                                                    <div className={lengthUserValidated?'validated':'not-validated'}>
                                                        {lengthUserValidated?(
                                                        <span className='list-icon green'>
                                                            <Icon icon={arrows_circle_check}/>  
                                                        </span>
                                                        ):(
                                                        <span className='list-icon'>
                                                            <Icon icon={arrows_exclamation}/>  
                                                        </span>
                                                        )}
                                                        At least 5 characters
                                                    </div>
                                                    <div className={specialUserValidated?'validated':'not-validated'}>
                                                        {specialUserValidated?(
                                                        <span className='list-icon green'>
                                                            <Icon icon={arrows_circle_check}/>  
                                                        </span>
                                                        ):(
                                                        <span className='list-icon'>
                                                            <Icon icon={arrows_exclamation}/>  
                                                        </span>
                                                        )}
                                                        Letters, numbers, underscores, hyphens allowed.
                                                    </div>
                                                </div>
                                            </div>
                                        </p>
                                    </Form.Group>
                                    <Form.Group id='email'>
                                        <Form.Label htmlFor="email">
                                            <div className='valid-icons'>
                                                e-mail:
                                                <div className={validEmail ? "valid" : "hide"}>
                                                    <Check />
                                                </div>
                                                <div className={validEmail || !email ? "hide" : "invalid"}>
                                                    <X />
                                                </div>
                                            </div>
                                        </Form.Label>
                                        <Form.Control
                                            placeholder="email"
                                            type="email"
                                            id="email"
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
                                            id="uidnote"
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
                                                        Please enter a valid e-mail.
                                                    </li>
                                                </ul>
                                            </div>
                                        </p>
                                    </Form.Group>
                                    <Form.Group id='pwd'>
                                        <Form.Label>
                                            <div className='valid-icons'>
                                                password:
                                                <div className={validPwd ? "valid" : "hide"}>
                                                    <Check />
                                                </div>
                                                <div className={validPwd || !password ? "hide" : "invalid"}>
                                                    <X />
                                                </div>
                                            </div>
                                        </Form.Label>
                                        <div className='input-with-icon-div form-control'>
                                            <input
                                                className='custom-input'
                                                placeholder="password"
                                                type= {type}
                                                id="password"
                                                onChange={(e)=>handlePwdChange(e.target.value)}
                                                value={password}
                                                minlength="6"
                                                maxlength="16"
                                                required
                                                aria-invalid={validPwd ? "false" : "true"}
                                                aria-describedby="pwdnote"
                                                onFocus={() => setPwdFocus(true)}
                                                onBlur={() => setPwdFocus(false)}
                                            />
                                            {type==="password"?(
                                                <span className='icon-span' onClick={()=>setType("text")}>
                                                <Icon icon={basic_eye_closed} size={18}/>
                                                </span>
                                            ):(
                                                <span className='icon-span' onClick={()=>setType("password")}>
                                                <Icon icon={basic_eye} size={18}/>
                                                </span>
                                            )}
                                        </div>
                                        <p id="pwdnote" className={
                                            pwdFocus && !validPwd 
                                                ? "instructions" 
                                                : "offscreen"
                                            }
                                        >
                                            <div className="valid-icons flex-row ">
                                                <div className='tracker-box'>
                                                    <Info />
                                                    <u>Must include:</u>
                                                    <div className={lengthValidated?'validated':'not-validated'}>
                                                        {lengthValidated?(
                                                        <span className='list-icon green'>
                                                            <Icon icon={arrows_circle_check}/>  
                                                        </span>
                                                        ):(
                                                        <span className='list-icon'>
                                                            <Icon icon={arrows_exclamation}/>  
                                                        </span>
                                                        )}
                                                        At least 6 characters
                                                    </div>
                                                    <div className={lowerValidated?'validated':'not-validated'}>
                                                        {lowerValidated?(
                                                        <span className='list-icon green'>
                                                            <Icon icon={arrows_circle_check}/>  
                                                        </span>
                                                        ):(
                                                        <span className='list-icon'>
                                                            <Icon icon={arrows_exclamation}/>  
                                                        </span>
                                                        )}
                                                        At least one lowercase letter
                                                    </div>
                                                    <div className={upperValidated?'validated':'not-validated'}>
                                                        {upperValidated?(
                                                        <span className='list-icon green'>
                                                            <Icon icon={arrows_circle_check}/>  
                                                        </span>
                                                        ):(
                                                        <span className='list-icon'>
                                                            <Icon icon={arrows_exclamation}/>  
                                                        </span>
                                                        )}
                                                        At least one uppercase letter
                                                    </div>
                                                    <div className={numberValidated?'validated':'not-validated'}>
                                                        {numberValidated?(
                                                        <span className='list-icon green'>
                                                            <Icon icon={arrows_circle_check}/>  
                                                        </span>
                                                        ):(
                                                        <span className='list-icon'>
                                                            <Icon icon={arrows_exclamation}/>  
                                                        </span>
                                                        )}
                                                        At least one number
                                                    </div>
                                                    <div className={specialValidated?'validated':'not-validated'}>
                                                        {specialValidated?(
                                                        <span className='list-icon green'>
                                                            <Icon icon={arrows_circle_check}/>  
                                                        </span>
                                                        ):(
                                                        <span className='list-icon'>
                                                            <Icon icon={arrows_exclamation}/>  
                                                        </span>
                                                        )}
                                                        At least one special character:
                                                        <span aria-label="exclamation mark">!</span>
                                                        <span aria-label="at symbol">@</span>
                                                        <span aria-label="hashtag">#</span>
                                                        <span aria-label="dollar sign">$</span>
                                                        <span aria-label="percent">%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </p>
                                    </Form.Group>
                                    <Form.Group id='confirmpwd'>
                                        <Form.Label htmlFor="confirm_pwd">
                                            <div className='valid-icons'>
                                                confirm password:
                                                <div className={
                                                    validMatch 
                                                        ? "valid"
                                                        : "hide"
                                                    }
                                                >
                                                    <Check />
                                                </div>
                                                <div className={
                                                    validMatch || !matchPwd 
                                                        ? "hide" 
                                                        : "invalid"
                                                    }
                                                >
                                                    <X />
                                                </div>
                                            </div>
                                        </Form.Label>
                                        <div className='input-with-icon-div form-control'>
                                            <input
                                                className='custom-input'
                                                placeholder="confirm password"
                                                type= {type}
                                                id="confirm_pwd"
                                                onChange={(e) => setMatchPwd(e.target.value)}
                                                value={matchPwd}
                                                minlength="6"
                                                maxlength="16"
                                                required
                                                aria-invalid={validMatch ? "false" : "true"}
                                                aria-describedby="confirmnote"
                                                onFocus={() => setMatchFocus(true)}
                                                onBlur={() => setMatchFocus(false)}
                                            />
                                            {type==="password"?(
                                                <span className='icon-span' onClick={()=>setType("text")}>
                                                <Icon icon={basic_eye_closed} size={18}/>
                                                </span>
                                            ):(
                                                <span className='icon-span' onClick={()=>setType("password")}>
                                                <Icon icon={basic_eye} size={18}/>
                                                </span>
                                            )}
                                        </div>
                                    </Form.Group>
                                    <p
                                        id="confirmnote"
                                        className={
                                            matchFocus && !validMatch
                                                ? "instructions"
                                                : "offscreen"
                                        }
                                    >
                                        <div className='valid-icons'>
                                            <Info />
                                            <ul className='w-100'>
                                                <li>
                                                    Must match the first password input field.
                                                </li>
                                            </ul>
                                        </div>
                                    </p>
                                    <button
                                        className={
                                            !validName || !validEmail || !validPwd || !validMatch 
                                                ? 'btn-custom-disabled my-4'
                                                : 'btn-custom my-4'
                                        }
                                        
                                        disabled={
                                            !validName || !validEmail || !validPwd || !validMatch 
                                                ? true
                                                : false
                                        }
                                    >
                                        <span className='btn-custom_top'> sign up
                                        </span>
                                    </button>
                                </Form>
                                <p>
                                    Already registered?<br />
                                </p>
                                <span className="line m-0">
                                    <Link to="/login">Sign In</Link>
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
