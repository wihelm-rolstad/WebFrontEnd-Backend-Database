import{Dumbbell, Timer} from 'lucide-react'

const workoutCard = ({date, type, duration, note}) => {

    return(
        <>
            <div className="bg-gray-100 rounded-lg p-2 border border-gray-200 flex flex-col gap-2">
                <p className="flex gap-2 font-bold w-full"> <Dumbbell className="border p-0.5 rounded bg-pink-300"/> {type} </p>
                <p className="flex gap-2"> <Timer/> {duration} m</p>
                <p className="ml-0" >Date: {date}</p>
            </div>
        </>
    )
}

export default workoutCard;