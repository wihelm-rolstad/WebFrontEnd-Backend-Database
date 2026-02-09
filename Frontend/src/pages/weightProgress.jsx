import { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2";
import {Info} from 'lucide-react'
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
            borderColor: "#bef264",
            backgroundColor: "rgba(132,204,22,0.8)",
            tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
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
                const response = await fetch("https://webfrontend-backend-database-354058670203.europe-west1.run.app/register-weight", {
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
                const response = await fetch("https://webfrontend-backend-database-354058670203.europe-west1.run.app/get-weights", {
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
            <div className="flex flex-col  min-w-0 border bg-white border-white p-4 rounded-2xl text-[var(--color-text)] shadow-lg">
                <h3 className="text-2xl text-[var(--color-text)] font-bold">Register your weight</h3>
                <div className="grid grid-cols-6 gap-0 mx-auto m-1 items-center w-full rounded">

                    <div className="col-span-3 gap-0">
                        <p>Weight</p>
                        <input 
                            className="w-50 border border-[var(--color-border)] p-2 rounded-lg bg-white"
                            type="number" step="0.1" min="0" max="500" 
                            placeholder = "Enter weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}>
                        </input>
                    </div>

                    <div className="col-span-1 gap-0">
                        <p>Unit</p>
                        <select 
                            className="w-14 bg-white border border-[var(--color-border)] rounded-lg h-10" 
                            onChange={(e) => setUnit(e.target.value)}>
                            <option>kg</option>
                            <option>lbs</option>
                        </select>
                    </div>

                    <div className="col-span-2 gap-0">
                        <p>Date</p>
                        <input 
                            className="bg-white border border-[var(--color-border)] rounded-lg h-10"
                            type="date" 
                            value={date} 
                            onChange={(e) => setDate(e.target.value) }>
                        </input>
                    </div>
                </div>

                <button 
                className="cursor-pointer bg-lime-300 w-full p-1 mx-auto rounded-lg hover:bg-black hover:text-white transition duration-200"
                onClick={handleRegisterWeight}>Register Weight</button>

                <p style={{color}} className="">{userFeedback}</p>
                
                <div className="w-full rounded-2xl p-2 h-64 mx-auto">
                    <Line data={data} options={options} />
                </div>

                <p className="flex gap-2 rounded p-2 mt-10"><Info/> Tip: Weigh yourself at the same time every day to ensure consistent and accurate results. </p>
                
            </div>
        </>
    )
}

export default weightProgress