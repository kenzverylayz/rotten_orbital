import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const ForgetPassword = (props) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="forget-page-container">
      <h2>Password Reset</h2>
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
          <button type="submit">Send reset email</button>
        </form>
        </div>
        <Link to="/login" className="link-btn">
            Back to Login
        </Link>
    </div>
  );
};