import './weightProgress.css'
import { useState } from 'react'


const weightProgress = () =>{
    const today = new Date().toISOString().split("T")[0];
    const[date, setDate] = useState(today)

    const[weight, setWeight] = useState("")

    const[unit, setUnit] = useState("")

    const[color, setColor] = useState("red")
    const[userFeedback, setUserFeedback] = useState("");

    async function handleRegisterWeight(){
        if (weight != "" && weight > 20){
            console.log("Registering weight...")
            setColor("green")
            setUserFeedback("Weight registered")
            setWeight("")

        } else {
            setColor("red")
            setUserFeedback("Weight is not entered")
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