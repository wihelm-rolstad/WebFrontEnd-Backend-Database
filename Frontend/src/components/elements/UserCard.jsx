import{User, Send} from 'lucide-react'

const UserCard = ({email}) => {
    return(
        <>
            <div className="flex gap-1 rounded-lg bg-gradient-to-br from-lime-300 to-emerald-600 p-2 items-center">
                <User/>
                <p>{email}</p>
                <button className="flex items-center gap-2 ml-auto cursor-pointer p-1 rounded bg-white hover:scale-105 active:scale-95 transition duration-200 "> Send request <Send size={16}/> </button>
            </div>
        </>
    )
}

export default UserCard;