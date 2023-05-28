import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useRef, useEffect} from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Login = (props) => {

  const userRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState('');

  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const result = emailRegex.test(email);
    console.log(email);
    console.log(result);
    setValidEmail(result)
  },[email])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    //logic for login goes here
    navigate('/SearchMovies'); // Replace '/new-page' with the desired URL
  };

  return (
    <div className="login-page-container">
      <h2>Login</h2>
      <div className="auth-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="password"
            id="password"
            name="password"
          />
          <button disabled={!validEmail? true:false}>Log In</button>
        </form>
      </div>
      <div className="links-container">
        <Link to="/register" className="link-btn">
          Don't have an account? Register here.
        </Link>
        <Link to="/forgetPassword" className="link-btn">
          Forgot your password?
        </Link>
      </div>
    </div>
  );
};