import styles from './workoutTracker.module.css'
import { useState, useEffect } from 'react'
import WorkoutCard from './workoutCard.jsx'

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
                const response = await fetch("http://localhost:8080/register-workout",{
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
                const response = await fetch("http://localhost:8080/get-workouts", {
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
            <div className={styles.container}>
                <h3>Track Workouts</h3>
                <div className={styles.userInput}>

                    <p>Date</p>
                    <p>Workout Type</p>
                    <p>Duration</p>

                    <input className={styles.dateInput} value={date} type="date"
                    onChange={(e) => setDate(e.target.value)}></input>

                    <select className={styles.typeSelect}
                    onChange={(e) => setType(e.target.value)}>
                        <option>Strength</option>
                        <option>Cardio</option>
                    </select>

                    <input className={styles.durationInput} 
                    type="number" min="0" max="10000" step="5"
                    onChange={(e) => setDuration(e.target.value)}></input>

                    <textarea className={styles.notes} rows={5} placeholder="Add a note here..." 
                    onChange={(e) => setNote(e.target.value)}></textarea>

                    <button className={styles.trackButton} onClick={handeTrack}>Track</button>
                </div>

                <div className={styles.workoutsContainer}>
                    <p>Total Workouts: {numWorkouts}</p>
                <div className={styles.workoutInformation}>
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