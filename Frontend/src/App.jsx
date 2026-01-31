import { useState } from 'react'
import Register from './components/register.jsx'
import Login from './components/login.jsx'
import './App.css'

function App() {
  
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

export default App
