import { useState, useEffect } from 'react'
import WorkoutCard from '../components/elements/workoutCard.jsx'

const workoutTracker = () => {

    const[totalWorkouts, setTotalWorkouts] = useState([])
    const numWorkouts = totalWorkouts.length

    const today = new Date().toISOString().split("T")[0];
    const[date, setDate] = useState(today)
    const[type, setType] = useState("Strength")
    const[duration, setDuration] = useState("")
    const[note, setNote] = useState("")

    useEffect(() => {
        loadWorkouts();
    }, []);

    
    async function handeTrack(){
        if( type === "" || duration <= 0 || date == ""){
            console.log("not all parameters are defined")
            console.log(date, type, duration, note)
        }
        else{
            const sessionToken = localStorage.getItem("sessionToken")
            const payload = {
                sessionToken: sessionToken,
                date: date,
                type: type,
                duration: duration,
                note: note
            }

            try{
                const response = await fetch("https://webfrontend-backend-database-354058670203.europe-west1.run.app/register-workout",{
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
                    setTotalWorkouts(data.rows);
                    console.log("stored and fetched data", data)
                } else {
                    console.log("storing workout failed")
                }

            } catch (err){
                console.error("registering workout failed", err.message)
            }
        } 
    }

    async function loadWorkouts(){
        const token = localStorage.getItem("sessionToken")
         try{
                const response = await fetch("https://webfrontend-backend-database-354058670203.europe-west1.run.app/get-workouts", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}`},
                })

                if (!response.ok){
                const error = await response.text();
                throw new Error(error);
                }

                const data = await response.json(); 
                if(data.status === "ok"){
                    setTotalWorkouts(data.rows);
                    console.log("stored and fetched data", data)
                } else {
                    console.log("storing workout failed")
                }

            } catch (err){
                console.error("Fetching workouts failed: ", err.message)
            }
    }
 

    return(
        <>
            <div className="border border-white bg-white rounded-2xl p-4 text-[var(--color-text)] shadow-lg">
                <h3 className="text-2xl font-bold">Track Workouts</h3>
                <div className="grid grid-cols-6 gap-4 w-full">

                        <div className="col-span-3 flex flex-col gap-0">
                            <p>Date</p>
                            <input className="bg-white border border-[var(--color-border)] rounded text-black p-1" value={date} type="date"
                            onChange={(e) => setDate(e.target.value)}></input>
                        </div>

                        <div className="col-span-2 flex flex-col gap-0">
                            <p>Workout Type</p>
                            <select className="bg-white border border-[var(--color-border)] p-1 rounded text-black"
                            onChange={(e) => setType(e.target.value)}>
                                <option>Strength</option>
                                <option>Cardio</option>
                            </select>
                        </div>

                        <div className="col-span-1 flex flex-col gap-0">
                            <p>Duration</p>
                            <input className="bg-white border border-[var(--color-border)] p-1 rounded text-black"
                            type="number" min="0" max="10000" step="5"
                            onChange={(e) => setDuration(e.target.value)}></input>
                        </div>

                        <div className="col-span-6 flex flex-col gap-0">
                            <p>Note</p>
                            <textarea className="bg-white border border-[var(--color-border)] rounded text-black p-1" rows={5} placeholder="Add a note here..." 
                            onChange={(e) => setNote(e.target.value)}></textarea>
                        </div>
                    <button className="cursor-pointer col-span-6 bg-lime-300 mb-5 rounded-lg text-black p-1 hover:bg-black hover:text-white transition duration-200" onClick={handeTrack}>Track Workout</button>
                </div>

                <div className="relative overflow-auto border border-black rounded p-4 h-70 text-[var(--color-text)]">
                    <p className="sticky absolute top-0 bg-lime-300 rounded-2xl px-4 w-fit">Total Workouts: {numWorkouts}</p>
                    <div className="flex flex-col gap-2 p-2">
                        {totalWorkouts.map((workout, i) => (
                        <WorkoutCard
                            key={workout.workout_id ?? i}
                            date={workout.workout_date}
                            type={workout.workout_type}
                            duration={workout.workout_duration}
                            note={workout.workout_note}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}

export default workoutTracker