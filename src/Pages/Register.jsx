import React, { useState } from "react";
import { Link } from 'react-router-dom';

export const Register = (props) => {
    
    const[email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName]= useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

     const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="signup-page-container">
            <div className="auth-form-container">
                <h2>Register</h2>
            <form className = "register-form"onSubmit={handleSubmit}>
                <label htmlFor="Name"> Full Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)}name = "name" id = "name" placeholder="full name" />
                <label htmlFor = "Email">Email</label>
                <input value = {email} onChange={(e) => setEmail(e.target.value)}type='Email' placeholder='youremail@gmail.com' id = 'Email' name = 'Email'/>
                <label htmlFor = "Password">Password</label>
                <input value = {pass} onChange={(e) => setPass(e.target.value)}type='Password' placeholder='password' id = 'Password' name = 'Passsword'/>
                <label htmlFor = "ConfirmPassword">Confirm Password</label>
                <input value = {confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}type='password' placeholder='confirm password' id = 'confirm password' name = 'confirm passsword'/>
                <button type = "submit" >Sign Up</button>
            </form>
            </div>
            <Link to="/login" className="link-btn">Already have an account? Login here.</Link>
        </div>
    )
}