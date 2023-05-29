import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useRef, useEffect} from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Login = (props) => {

  const userRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState('');

  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const result = emailRegex.test(email);
    console.log(email);
    console.log(result);
    setValidEmail(result)
  },[email])

  const handleSubmit = (e) => {
    e.preventDefault();
   
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Handle successful login
        console.log(userCredential);
        navigate('/SearchMovies'); // Redirect to desired URL after successful login
      })
      .catch((error) => {
        // Handle login error
        console.log(error);
        setError(error.message); // Set the error message in the state
      });
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            id="password"
            name="password"
          />
          <button disabled={!validEmail? true:false}>Log In</button>
          {error && <p className="error-message">{"Invalid Username or Password"}</p>}
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