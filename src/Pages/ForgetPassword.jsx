import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useRef, useEffect} from "react";
import {faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import{ FontAwesomeIcon }from "@fortawesome/react-fontawesome";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ForgetPassword = (props) => {

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState('');
  const [emailFocus, setEmailFocus] = useState('');

  useEffect(() => {
    userRef.current.focus();
  },[])

  useEffect(() => {
    const result = emailRegex.test(email);
    console.log(email);
    console.log(result);
    setValidEmail(result)
  },[email])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="forget-page-container">
      <h2>Password Reset</h2>
      <div className="auth-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">
              Email
            {validEmail && (
              <span className='valid'>
                <FontAwesomeIcon
                      icon={faCheck}
                    />
                  </span>
            )}
            </label>
           
          <input
            type="email"
            id="email"
            ref={userRef}
            autoComplete= "off"
            onChange={(e) => {
              setEmail(e.target.value)
              console.log(email);
            }}
            required
            placeholder="youremail@gmail.com"
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby= "uidnote"
            onFocus= {() => setEmailFocus(true)}
            onBlur= {() => setEmailFocus(false)}
          />

          <p id = "uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                    {emailFocus && email && !validEmail && (
          <>
          <FontAwesomeIcon icon={faInfoCircle} />
              Enter a valid Email Address.<br />
              </>
              )}
          </p>
          <button className="reset-email-button" disabled={!validEmail ? true : false} onClick={() => alert('Email sent! Check your email')}>Send reset email</button>
          </form>
        </div>
        <Link to="/login" className="link-btn">
            Back to Login
        </Link>
    </div>
  );
};