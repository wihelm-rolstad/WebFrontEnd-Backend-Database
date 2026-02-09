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
            const response = await fetch("https://webfrontend-backend-database-354058670203.europe-west1.run.app/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok){
                const error = await response.text();
                throw new Error(error);
            }

            const data = await response.json(); //gets status and token if status === ok
            if (data.status === "ok"){
                localStorage.setItem("sessionToken", data.token);
                console.log("login success with token: " + data.token);
                setUserFeedback("login success");
                setTimeout(()=> navigate("/app"), 500);
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
        <div className="mx-auto rounded w-140 flex flex-col items-center gap-2 p-4 mt-50">
            <h1 className="text-[var(--color-text)] font-bold text-3xl">Log In</h1>
            <div className="flex flex-col gap-2">
                <input className="bg-white p-1 rounded " type="text" placeholder="your email adress" onChange={(e) => setEmailAdress(e.target.value)}/>
                <input className="bg-white p-1 rounded " type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <p className="text-white mx-auto">{userFeedback}</p>
                <button className="cursor-pointer bg-white text-black rounded border border-black hover:bg-black hover:border-white hover:text-white hover:scale-110 transition duration-200" onClick={handleLogin}> Log in</button>
                <p className="cursor-pointer" onClick={() => navigate("/register")}> Dont have an account? Register</p>
            </div>
        </div>
        </>
    )
}

export default login