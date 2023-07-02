import React from "react";
import logo from './Pages/logo.svg';
import './App.css';
import { Login } from "./Pages/Login";
import { Register } from './Pages/Register';
import { ForgetPassword } from './Pages/ForgetPassword';
import { Route, Routes } from "react-router-dom";
import { SearchMovies } from './Pages/SearchMovies';
import { CommentSection } from "./Pages/CommentSection";
import PrivateRoute from "./PrivateRoute";

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
        <Route exact path='/CommentSection' element={<CommentSection/>}/>
        <Route exact path='/SearchMovies' element={<SearchMovies/>}/>
      </Routes>
    </div>
  );
}

export default App;
