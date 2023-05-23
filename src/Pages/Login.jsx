import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
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
          <button type="submit">Log In</button>
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
