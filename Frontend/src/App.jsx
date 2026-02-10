import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from './pages/register.jsx'
import Login from './pages/login.jsx'
import LoginMobile from './pages/LoginMobile.jsx'
import Dashboard from './pages/dashboard.jsx'
import Layout from './pages/Layout.jsx'
import UserInfo from './pages/Userinfo.jsx'
import Social from './pages/Social.jsx'
import './App.css'


function LoginRoute() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1045);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1045);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isMobile ? <LoginMobile /> : <Login />;
}




function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRoute/>} />
        <Route path="/register" element={<Register/> } />

        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard/>} />
          <Route path="userinfo" element={<UserInfo/>} />
          <Route path="social" element={<Social/>} />
        </Route>

        <Route path="/userinfo" element={<Navigate to="/app/userinfo" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
