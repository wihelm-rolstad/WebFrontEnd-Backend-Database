import './register.css';
import { useState } from "react";

const register = () =>{
    const [userEmail, setUserEmail] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userPassword, setUserPassword] = useState("");

    async function handleRegister(){
        console.log("userEmail:", userEmail);
        console.log("userPhoneNumber:", userPhoneNumber);
        console.log("userPassword:", userPassword);

        const payload = {
            email: userEmail,
            phoneNumber: userPhoneNumber,
            password: userPassword,
        };

        try{
            const response = await fetch("http://localhost:8080/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok){
                const error = await response.text();
                throw new Error(error);
            }

            const data = await response.text();
            console.log("Registration success:", data);
        } catch (err){
            console.error("Registration failed:", err.message)
        }    
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
        </>
    )
}

export default register;