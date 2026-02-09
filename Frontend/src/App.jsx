import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from './pages/register.jsx'
import Login from './pages/login.jsx'
import Dashboard from './pages/dashboard.jsx'
import Layout from './pages/Layout.jsx'
import UserInfo from './pages/Userinfo.jsx'
import './App.css'

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/> } />

        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard/>} />
          <Route path="userinfo" element={<UserInfo/>} />
        </Route>

        <Route path="/userinfo" element={<Navigate to="/app/userinfo" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
