import {CircleUserRound} from 'lucide-react'
import { useNavigate } from "react-router-dom";


const Navbar = () => {

    const navigate = useNavigate();

    return(
        <>
            <div className="sticky flex flex-row top-0 h-16 bg-[var(--color-accent)] items-center px-8 py-4 mb-10 gap-20">
                <h1 className="cursor-default">APPLICATION NAME</h1>
                <button className="ml-auto hover:scale-110 cursor-pointer transition duration-200" onClick={()=> navigate("/app")}>Home</button>
                <CircleUserRound className=" hover:scale-110 cursor-pointer transition duration-200" onClick={() => navigate("/app/userinfo")}/>
            </div>
        </>
    )
}
export default Navbar;
