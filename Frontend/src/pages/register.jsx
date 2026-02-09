import { useState } from "react";
import { useNavigate } from "react-router-dom";

const register = () =>{
    const [userEmail, setUserEmail] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const navigate = useNavigate();

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
            const response = await fetch("https://webfrontend-backend-database-354058670203.europe-west1.run.app/register", {
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
        <div className="flex flex-col gap-2 p-2 mx-auto text-[var(--color-text)] items-center mt-40">
            <h1 className="text-3xl">Register.</h1>
            <div className="flex flex-col gap-2 w-140 mx-auto p-2 items-center text-black">
                <input className="bg-white rounded p-1"
                type="email" 
                placeholder="your email adress" 
                onChange={(e) => setUserEmail(e.target.value)}></input>

                <input className="bg-white rounded p-1"
                type="tel" 
                name="phone" 
                placeholder="phone number" 
                onChange={(e) => setUserPhoneNumber(e.target.value)}></input>

                <input className="bg-white rounded p-1"
                type="password" 
                placeholder="password"
                onChange={(e) => setUserPassword(e.target.value)}></input>
            </div>
            <button type="submit" className="bg-white border border-white mx-auto text-black p-1 rounded w-40 hover:bg-black hover:text-white hover:scale-110 transition duration-200" onClick={handleRegister}>Register</button>
            <p className="cursor-pointer" onClick={() => navigate("/")}>Already have an account? Log in</p>
            </div>
        </>
    )
}

export default register;