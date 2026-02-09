
const workoutCard = ({date, type, duration, note}) => {
    return(
        <>
            <div className="bg-[var(--color-accent)] rounded-lg p-2">
                <p className="font-bold">{type} </p>
                <p>Duration: {duration} m</p>
                <p>Date: {date}</p>
                <p className="">Note: {note}</p>
            </div>
        </>
    )
}

export default workoutCard;