import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {useRef, useEffect} from "react";
import {faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import{ FontAwesomeIcon }from "@fortawesome/react-fontawesome";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase";


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const Register = (props) => {

    const userRef = useRef();
    const errRef = useRef();
   
    const [name, setName]= useState('');

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
   
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = emailRegex.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    },[email])

    useEffect(() => {
        const result = passwordRegex.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(result);
        const match = password == confirmPassword;
        setValidConfirmPassword(match);
    }, [password, confirmPassword])

    useEffect(() => {
        setErrMsg('');
    } ,[email, password, confirmPassword])

    const handleSubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
        })
            .catch((error) => {
            console.log(error);
        });
        console.log(email,password);
        setSuccess(true);
    }

    return (
        <>
        {success ? (<section>
            <div className = "SuccessPackage">
            <div className = "Success">Sign up successful!</div>
            <p>
                <Link to="/login" className="successlogin-btn">Log In</Link>
            </p>
            </div>
        </section>) : (
        <div className="signup-page-container">
            <div className="auth-form-container">
                <p ref={errRef} className ={errMsg ? "errmsg" : "offscreen"} aria-live = "assertive">{errMsg}</p>
                <h2>Register</h2>
            <form className = "register-form" onSubmit={handleSubmit}>
                <label htmlFor="Name"> Full Name</label>
                <input 
                    type="text"
                    id ="full name"
                    ref = {userRef}
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="Email">
                    Email
                {validEmail && (
                    <span className="valid">
                    <FontAwesomeIcon
                      icon={faCheck}
                    />
                  </span>
                )}
                </label>

                <input 
                    type="email"
                    id="email"
                    ref= {userRef}
                    autoComplete= "off"
                    onChange={(e) => {
                        setEmail(e.target.value);
                        console.log(email); // Check the value in the console
                    }}
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby= "uidnote"
                    onFocus= {() => setEmailFocus(true)}
                    onBlur= {() => setEmailFocus(false)}
                />

                <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                    {emailFocus && email && !validEmail && (
                <>
                <FontAwesomeIcon icon={faInfoCircle} />
                Enter a valid Email Address.<br />
                </>
                )}
                </p>

                <label htmlFor="Password">
                Password
                {validPassword && (
                    <span className="valid">
                        <FontAwesomeIcon
                            icon={faCheck}/>
                    </span>
                )}
                </label>


                <input 
                    type = "password"
                    id = "password"
                    onChange= {(e) => setPassword(e.target.value)}
                    required
                    aria-invalid={validPassword ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                />

                <p id = "pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"} >
                    {passwordFocus && password && !validPassword && (
                    <>
                    <FontAwesomeIcon icon = {faInfoCircle} />
                    8 to 24 characters. <br />
                    Must include uppercase and lowercase letters, a number and a special character. <br />
                    Allowed special characters:
                    <span aria-label="exclamation mark">!</span>
                    <span aria-label="at symbol">@</span>
                    <span aria-label="hashtag">#</span>
                    <span aria-label="dollar sign">$</span>
                    <span aria-label="percent">%</span>
                    </>
                    )}
                </p>

                <label htmlFor="ConfirmPassword">
                Confirm Password
                {validConfirmPassword && confirmPassword && (
                <span className="valid">
                    <FontAwesomeIcon
                        icon={faCheck}/>
                </span>
                )}
                </label>

                <input
                    type ="password"
                    id ="confirm_password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    aria-invalid ={validConfirmPassword ? "false": "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setConfirmPasswordFocus(true)}
                    onBlur={() => setConfirmPasswordFocus(false)}
                />
                <p id="confirmnote" className={confirmPasswordFocus && !validConfirmPassword ? "instructions" : "offscreen"}>
                    {confirmPasswordFocus && confirmPassword && !validConfirmPassword && (
                    <>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                    </>
                    )}
                </p>
                <button className="signup-button" disabled={!validEmail || !validPassword || !validConfirmPassword ? true : false}>Sign Up</button>  
            </form>
            </div>
            <Link to="/login" className="link-btn">Already have an account? Login here.</Link>
        </div>
        )}
        </>
        )
    }