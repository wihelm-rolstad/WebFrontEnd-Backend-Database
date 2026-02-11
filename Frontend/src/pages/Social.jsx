import FancyInput from '../components/elements/FancyInput'
import { useState, useEffect} from 'react'
import { Search } from 'lucide-react'
import {getUsers} from '../hooks/getUsers'
import UserCard from '../components/elements/UserCard'
const Social = () => {
 
    const [searchValue, setSearchValue] = useState("")

    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
    let mounted = true;
        getUsers()
        .then((data) => { if (mounted) setAllUsers(data); })
        .catch((err) => console.error("Fetching users failed:", err.message));
        return () => { mounted = false; };
    }, []);

    return(
        <>
            <div className="flex flex-col gap-6">  
                <div className="bg-white p-4 rounded-2xl max-w-5xl w-full min-w-100 mx-auto">
                    <h1>Link up with your friends</h1>
                </div>

                <div className="flex flex-row  max-w-5xl w-full min-w-100 mx-auto gap-6">
                    <div className="flex flex-col gap-5 bg-white p-4 rounded-2xl w-[60%] min-w-100">
                            <p>Find friends</p>
                                <FancyInput
                                    Icon={Search}
                                    desc="Search"
                                    placeholder="Your friend's name"
                                    type="text"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />
                        <div className="flex flex-col gap-2 border rounded-lg h-80 bg-gray-300 p-2">
                            {allUsers.map((u, i) => (
                                <UserCard
                                    key={u.user_id ?? i}
                                    email={u.email}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl w-[40%] min-w-100">
                            <p>Friends</p>
                         <div className="border rounded-lg h-42 bg-gray-300">

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Social;