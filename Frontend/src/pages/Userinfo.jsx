import {Phone, Mail, SquareUserRound, Square} from 'lucide-react'
import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";

const UserInfo = () => {

    const navigate = useNavigate();

    const sessionToken = localStorage.getItem("sessionToken");
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [me, setMe] = useState(null);
    const [error, setError] = useState("");

    async function getUserInfo(){
        const response = await fetch(`${API_BASE_URL}/get-me`, {
            method: "GET",
            headers: { Authorization: `Bearer ${sessionToken}` },
        });

        if (!response.ok) throw new Error(await response.text());
            return response.json();
    }

    useEffect(() => {
        let mounted = true;

        getUserInfo()
        .then((data) => {
            if (mounted) setMe(data);
        })
        .catch((err) => {
            if (mounted) setError(err.message);
        });
        return () => {
        mounted = false;
        };
    }, []);
    
    useEffect(() => {
        console.log(me);
    }, [me]);


    return(
        <>
            <div className="flex flex-col gap-4 border rounded-2xl bg-gray-100 mx-auto max-w-160 p-4">
                    <p className="text-lg">User Details</p>
                     <div className="flex gap-2">
                        <SquareUserRound/>
                        <p> First name: {me?.[0].first_name}</p>
                    </div>
                     <div className="flex gap-2">
                        <SquareUserRound/>
                        <p> Last name: {me?.[0].last_name}</p>
                    </div>
                    <div className="flex gap-2">
                        <Mail/>
                        <p>Email adress: {me?.[0].email}</p>
                    </div>
                    <div className="flex gap-2">
                        <Phone/>
                        <p> Phone number: {me?.[0].phone_number}</p>
                    </div>

                    <button className="cursor-pointer bg-black border-3 border-red-400 rounded-2xl text-red-400 w-40 hover:scale-105 hover:bg-red-400 hover:text-black active:scale-95 transition duration-200" onClick={()=> navigate("/")}>Log out</button>
            </div>
        </>
    )
}
export default UserInfo;