import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import { HamburgerMenu } from './components/HamburgerMenu/HamburgerMenu'

import Login from "./pages/Login.jsx";import Homepage from './pages/HomePage'
import CreateSessionTest from "./pages/CreateSessionTest.jsx";

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <CreateSessionTest user={user} /> 
      )}
    </>
  );
}

