import styles from './dashboard.module.css'
import WeightProgress from './weightProgress.jsx'
import WorkoutTracker from './workoutTracker.jsx'

const dashboard = () => {
    return(
        <>
            <div className={styles.dashboardContainer}>
                <WeightProgress/>
                <WorkoutTracker/>
            </div>
        </>
    )
}

export default dashboard