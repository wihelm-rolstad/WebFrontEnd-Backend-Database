import './login.css'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

const login = () => {
    const [email, setEmailAdress] = useState("")
    const [password, setPassword] = useState("")

    const [userFeedback, setUserFeedback] = useState("");

    const navigate = useNavigate();

    async function handleLogin(){

        console.log("login gets handeled")

        const payload = {
            email: email,
            password: password,
        };

        try{
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok){
                const error = await response.text();
                throw new Error(error);
            }

            const data = await response.text();
            if (data === "ok"){
                console.log("login success")
                setUserFeedback("login success")
                setTimeout(()=>
                navigate("/dashboard"), 1000);
            } else {
                console.log("login failed")
                setUserFeedback("login failed")
            }
        } catch (err){
            console.error("Login failed:", err.message)
        }    
    }

    return(
        <>
            <h1>Log In</h1>
            <div id="user-inputs">
                <input type="text" placeholder="your email adress" onChange={(e) => setEmailAdress(e.target.value)}></input>
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}></input>
                <p id="user-feedback">{userFeedback}</p>
                <button id="login-button" onClick={handleLogin}> Log in</button>
            </div>
        </>
    )
}

export default login