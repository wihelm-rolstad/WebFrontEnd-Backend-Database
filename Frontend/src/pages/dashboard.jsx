import WeightProgress from './weightProgress.jsx'
import WorkoutTracker from './workoutTracker.jsx'
import FriendUpdates from './FriendUpdates.jsx'

const dashboard = () => {
    return(
        <>
            <div className="flex w-full max-w-5xl flex-col gap-6 p-2 mx-auto rounded-3xl">
                <div className="px-10 w-full flex bg-white h-20 shadow-lg rounded-2xl items-center">
                    <p>Welcome back</p>
                </div>
                <div className="flex w-full flex-wrap gap-6">
                    <WeightProgress className="flex-1 min-w-[400px]" />
                    <WorkoutTracker className="flex-1 min-w-[400px]" />
                </div>
                <FriendUpdates/>
            </div>
        </>
    )
}

export default dashboard
