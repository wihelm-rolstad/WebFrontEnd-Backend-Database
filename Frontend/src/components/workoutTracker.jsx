import styles from './workoutTracker.module.css'
import { useState } from 'react'

const workoutTracker = () => {

    const[totalWorkouts, setTotalWorkouts] = useState([])
    const numWorkouts = totalWorkouts.length

    const[date, setDate] = useState("")
    const[type, setType] = useState("")
    const[duration, setDuration] = useState("")
    const[note, setNote] = useState("")

    async function handeTrack(){
        console.log(date, type, duration, note)
        console.log(type)
    }


    return(
        <>
            <div className={styles.container}>
                <h3>Track Workouts</h3>
                <div className={styles.userInput}>

                    <p>Date</p>
                    <p>Workout Type</p>
                    <p>Duration</p>

                    <input className={styles.dateInput} type="date"
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

                <div className={styles.workoutInformation}>
                    <p>Total workouts: {numWorkouts}</p> 
                    <p>Total duration:</p>

                    <div className={styles.workoutsContainer}>
                        ...
                    </div>

                </div>
            </div>

        </>
    )
}

export default workoutTracker