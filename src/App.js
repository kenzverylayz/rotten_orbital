import React from "react";
import logo from './logo.svg';
import './App.css';
import { Login } from "./Pages/Login";
import { Register } from './Pages/Register';
import { ForgetPassword } from './Pages/ForgetPassword';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="App-logo-container">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      
    </div>
  );
}

export default App;


