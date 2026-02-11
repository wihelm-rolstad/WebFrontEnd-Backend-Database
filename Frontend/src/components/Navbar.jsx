import {CircleUserRound, Sun} from 'lucide-react'
import { useNavigate } from "react-router-dom";



const Navbar = () => {

    const navigate = useNavigate();

    return(
        <>
            <div className="sticky flex flex-col top-0 h-16  bg-[var(--color-accent)] items-center py-4 mb-10 text-white">
                <div className=" min-w-100 max-w-5xl w-full flex flex-row px-4 gap-10  mx-auto items-center font-semibold">
                    <h1 className="cursor-default text-2xl">Lift Log</h1>
                    <button className="ml-auto hover:scale-110 hover:text-lime-300 cursor-pointer transition duration-200" onClick={()=> navigate("/app")}>Home</button>
                    <button className="hover:scale-110 hover:text-lime-300 cursor-pointer transition duration-200" onClick={()=> navigate("/app/social")}>Social</button>
                    <Sun className="cursor-pointer hover:scale-110 hover:text-lime-300 transition duration-200"/>
                    <CircleUserRound className="hover:scale-110 cursor-pointer hover:text-lime-300 transition duration-200" onClick={() => navigate("/app/userinfo")}/>
                </div>
            </div>
        </>
    )
}
export default Navbar;
