import styles from './workoutCard.module.css'

const workoutCard = ({date, type, duration, note}) => {
    return(
        <>
            <div className={styles.container}>
                <p>{type} </p>
                <p>{duration} m</p>
                <p>{date}</p>
                <p className={styles.note}>{note}</p>
            </div>
        </>
    )
}

export default workoutCard;