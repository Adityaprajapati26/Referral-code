import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import {Form, Route, Routes } from "react-router-dom"
import Home from './Components/Home';
import Signup from './Components/Signup';
import Navbar from "./Routes/Navbar"
import RequireAuth from './Components/RequireAuth';
function App() {
  useEffect(() => {
    document.title = 'Refferal';
  });
  return (
    <div className="App">
      <Navbar/>
     {/* <Login/> */}
     <Routes>
      <Route path="/" element={<RequireAuth><Home/></RequireAuth>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
  </Routes>
    </div>
  );
}

export default App;
