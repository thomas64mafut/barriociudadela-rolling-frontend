import '../login/login.css';
import './register.css';
import { useRef, useState, useEffect } from "react";
import axios from '../../../api/axios';
import { Link } from "react-router-dom";
import { Form } from 'react-bootstrap';
import Check from '../../../assets/icons/dark/Check';
import X from '../../../assets/icons/dark/X';
import Info from '../../../assets/icons/light/Info';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,16}$/;
const REGISTER_URL = '/api/user/register';

const Register = () => {
    const userRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

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
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    useEffect(() => {
        setErrorMsg('');
    }, [username, email, password, matchPwd])

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
            const response = await axios.post(REGISTER_URL, { username, email, password });
            console.log(response?.data);

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
                setErrorMsg('Invalid e-mail');
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
                                                Username:
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
                                            onChange={(e) => setUsername(e.target.value)}
                                            value={username}
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
                                                <ul>
                                                    <li>
                                                        4 to 24 characters. <br />
                                                    </li>
                                                    <li>
                                                        Must begin with a letter. <br />
                                                    </li>
                                                    <li>
                                                        Letters, numbers, underscores, hyphens allowed.
                                                    </li>
                                                </ul>
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
                                            placeholder="Placeholder text"
                                            type="email"
                                            id="email"
                                            autoComplete="off"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
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
                                                Please enter a valid e-mail.<br />
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
                                        <Form.Control
                                            placeholder="Placeholder text"
                                            type="password"
                                            id="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            required
                                            aria-invalid={validPwd ? "false" : "true"}
                                            aria-describedby="pwdnote"
                                            onFocus={() => setPwdFocus(true)}
                                            onBlur={() => setPwdFocus(false)}
                                        />
                                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                            <div className="valid-icons flex-row ">
                                                <Info />
                                                <ul>
                                                    <li>
                                                        6 to 16 characters.<br />
                                                    </li>
                                                    <li>
                                                        Must include uppercase and lowercase letters, a number and a special character.<br />
                                                    </li>
                                                    <li>
                                                        <div className='flex-row '>
                                                            Allowed special characters:
                                                            <span aria-label="exclamation mark">!</span>
                                                            <span aria-label="at symbol">@</span>
                                                            <span aria-label="hashtag">#</span>
                                                            <span aria-label="dollar sign">$</span>
                                                            <span aria-label="percent">%</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </p>
                                    </Form.Group>
                                    <Form.Group id='confirmpwd'>
                                        <Form.Label htmlFor="confirm_pwd">
                                            <div className='valid-icons'>
                                                confirm password:
                                                {/* ver que esto no se muestre siempre  */}
                                                <div className={validMatch ? "valid" : "hide"}> 
                                                    <Check />
                                                </div>
                                                <div className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                                    <X />
                                                </div>
                                            </div>
                                        </Form.Label>
                                        <Form.Control
                                            placeholder="Placeholder text"
                                            type="password"
                                            id="confirm_pwd"
                                            onChange={(e) => setMatchPwd(e.target.value)}
                                            value={matchPwd}
                                            required
                                            aria-invalid={validMatch ? "false" : "true"}
                                            aria-describedby="confirmnote"
                                            onFocus={() => setMatchFocus(true)}
                                            onBlur={() => setMatchFocus(false)}
                                        />
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
                                            Must match the first password input field.
                                        </div>
                                    </p>
                                    <button
                                        className='btn-custom my-4'
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
                                    <Link to="/">Sign In</Link>
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
