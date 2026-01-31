import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/register.jsx'
import Login from './components/login.jsx'
import Dashboard from './components/dashboard.jsx'
import './App.css'

function AuthPage() {
  
  const [active, setActive] = useState("a");

  return (
    <>
      {active === "b" && (
        <div>
          <Register/>
          <p style={{cursor: "pointer"}} onClick={() => setActive("a")}>Already have an account? Log in.</p>
        </div>
      )}

      {active === "a" && (
        <div>
          <Login/>
          <p style={{cursor: "pointer"}} onClick={() => setActive("b")}>Don't have an account? Register.</p>
        </div>
      )}
    </>
  )
}

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
