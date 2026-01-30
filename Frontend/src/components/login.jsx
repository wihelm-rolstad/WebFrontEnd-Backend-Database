import './login.css';
import { useState } from "react";

const login = () =>{
    const [userEmail, setUserEmail] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userPassword, setUserPassword] = useState("");

    function handleRegister(){
        console.log("userEmail:", userEmail);
        console.log("userPhoneNumber:", userPhoneNumber);
        console.log("userPassword:", userPassword);
    }


    return(
        <>
        <h1>Register.</h1>
            <div id="user-inputs">
                <input type="email" 
                placeholder="your email adress" 
                onChange={(e) => setUserEmail(e.target.value)}></input>

                <input type="tel" 
                name="phone" 
                placeholder="phone number" 
                onChange={(e) => setUserPhoneNumber(e.target.value)}></input>

                <input type="password" 
                placeholder="password"
                onChange={(e) => setUserPassword(e.target.value)}></input>
            </div>
        <button type="submit" id="register-button" onClick={handleRegister}>Register</button>
        <p>Already have an account? Login</p>
        </>
    )
}

export default login;