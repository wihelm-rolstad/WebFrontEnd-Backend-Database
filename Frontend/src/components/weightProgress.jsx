import styles from './weightProgress.module.css'
import { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);


const weightProgress = () =>{

    const today = new Date().toISOString().split("T")[0];
    const[date, setDate] = useState(today)

    const[weight, setWeight] = useState("")//int 
    const[weights, setWeights] = useState([]); // array
    const[unit, setUnit] = useState("")//use for later

    const[color, setColor] = useState("red")
    const[userFeedback, setUserFeedback] = useState("");

    useEffect(() => {
        loadWeight();
    }, []);


    const sorted = [...weights].sort((a, b) => new Date(a.recorded_at) - new Date(b.recorded_at));
    const labels = sorted.map(w => w.recorded_at);
    const data = {
        labels,
        datasets: [
            {
            label: "Weight",
            data: sorted.map(w => w.weight),
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59,130,246,0.2)",
            tension: 0.3,
            },
        ],
    };

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

            } catch (err){
                console.error("Fetching weight failed: ", err.message)
            }
    }

    return(
        <>
            <div className={styles.container}>
                <h3>Register your weight</h3>
                <div className={styles.userInputContainer}>
                <p>Weight</p>
                <p>Unit</p>
                <p>Date</p>

                <input 
                    className={styles.weightInput}
                    type="number" step="0.1" min="0" max="500" 
                    placeholder = "Enter weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}>
                </input>

                <select 
                    className={styles.unitSelect} 
                    onChange={(e) => setUnit(e.target.value)}>
                    <option>kg</option>
                    <option>lbs</option>
                </select>

                <input 
                    className={styles.dateInput}
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value) }>
                </input>

                <button 
                className={styles.registerButton}
                onClick={handleRegisterWeight}>Register Weight</button>

                <p style={{color}} className={styles.userFeedback} >{userFeedback}</p>
                
                </div>

                <div className={styles.weightDiagram}>
                    <Line data={data} />
                </div>

                <p className={styles.tip}>Tip: Weigh yourself at the same time every day to ensure consistent and accurate results. </p>
            </div>
        </>
    )
}

export default weightProgress