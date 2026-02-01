import './weightProgress.css'
import { useState } from 'react'


const weightProgress = () =>{
    const today = new Date().toISOString().split("T")[0];
    const[date, setDate] = useState(today)

    const[weight, setWeight] = useState("")//int 
    const[weights, setWeights] = useState([]); // array
    const[unit, setUnit] = useState("")//use for later

    const[color, setColor] = useState("red")
    const[userFeedback, setUserFeedback] = useState("");

    async function handleRegisterWeight(){
        if(weight === "" || weight < 20){
            setColor("red")
            setUserFeedback("Weight is not entered")
        } else {
            console.log("Registering weight...")
            setColor("green")
            setUserFeedback("Registering weight")
            setWeight("")

            const session_token = localStorage.getItem("sessionToken");
            console.log("Session-token:", session_token)
            const payload = {
                sessionToken: session_token,
                weight: weight,
                date: date,
            }

            try{
                const response = await fetch("http://localhost:8080/register-weight", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                })

                if (!response.ok){
                const error = await response.text();
                throw new Error(error);
                }

                const data = await response.json(); 
                if(data.status === "ok"){
                    console.log("weight is being stored")
                    loadWeight();
                } else {
                    console.log("weight not registered something failed")
                }

            } catch (err){
                console.error("Login failed:", err.message)
            }
        }
    }

    async function loadWeight(){
        const token = localStorage.getItem("sessionToken")
         try{
                const response = await fetch("http://localhost:8080/get-weights", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}`},
                })

                if (!response.ok){
                const error = await response.text();
                throw new Error(error);
                }

                const data = await response.json();
                setWeights(data);
                console.log(data);

            } catch (err){
                console.error("Fetching weight failed: ", err.message)
            }
    }

    return(
        <>
            <div id="container">
                <h3>Register your weight</h3>
                <div id="user-input-container">

                <p>Weight</p>
                <p>Unit</p>
                <p>Date</p>

                <input 
                    id="weight-input" 
                    type="number" step="0.1" min="0" max="500" 
                    placeholder = "Enter weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}>
                </input>

                <select 
                    id="unit-select" 
                    onChange={(e) => setUnit(e.target.value)}>
                    <option>kg</option>
                    <option>lbs</option>
                </select>

                <input 
                    id="date-input" 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value) }>
                </input>

                <button 
                id="register-button"
                onClick={handleRegisterWeight}>Register Weight</button>

                <p style={{color}} id="user-feedback">{userFeedback}</p>
                
                </div>

                <div id="weight-diagram">
                    <h3>Diagram...</h3>
                </div>

                <p id="tip">Tip: Weigh yourself at the same time every day to ensure consistent and accurate results. </p>
            </div>
        </>
    )
}

export default weightProgress