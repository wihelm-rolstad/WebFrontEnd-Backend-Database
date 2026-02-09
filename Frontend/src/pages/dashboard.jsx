import WeightProgress from './weightProgress.jsx'
import WorkoutTracker from './workoutTracker.jsx'
import FriendUpdates from './FriendUpdates.jsx'

const dashboard = () => {
    return(
        <>
            <div className="flex flex-col flex-wrap mx-auto gap-10 p-2 rounded-3xl max-w-7xl items-center justify-center">
                <div className="px-10 w-full flex bg-white h-20 shadow-lg rounded-2xl items-center">
                    <p>Welcome back</p>
                </div>
                <div className="flex flex-row gap-10">
                <WeightProgress/>
                <WorkoutTracker/>
                </div>
                <FriendUpdates/>
            </div>
        </>
    )
}

export default dashboard
