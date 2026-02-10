import { useState } from 'react'
import { handleLogin } from '../hooks/handleLogin'
import { useNavigate } from 'react-router-dom'
import FancyInput from '../components/elements/FancyInput'
import { Mail, Lock, LogIn} from 'lucide-react'

const login = () => {
    const [email, setEmailAdress] = useState("")
    const [password, setPassword] = useState("")

    const [userFeedback, setUserFeedback] = useState("");

    const navigate = useNavigate();

    return(
        <>
        <div className="flex">
            <div className="fixed top-50 left-50">
                <p className="text-2xl font-bold bg-gradient-to-br from-lime-400 to-emerald-600 bg-clip-text text-transparent">APPLICATION NAME</p>
                <p>Description here</p>
            </div>


            <div className="fixed right-0 h-full w-[30%] flex flex-col items-center gap-2 p-2 py-60 bg-gradient-to-br from-lime-400 to-emerald-600 text-white">
                <h1 className="font-bold text-3xl">Log In</h1>
                <div className="flex flex-col gap-2">
                    <FancyInput
                        desc="Email"
                        Icon={Mail}
                        placeholder="your email address"
                        value={email}
                        type="text"
                        onChange={(e) => setEmailAdress(e.target.value)}
                    />
                    <FancyInput
                        desc="Password"
                        type="password"
                        Icon={Lock}
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    <p className="text-white mx-auto">{userFeedback}</p>
                    <button className="flex gap-1 items-center justify-center cursor-pointer bg-white text-black rounded border border-black hover:bg-black hover:border-white hover:text-white hover:scale-110 transition duration-200" onClick={() => handleLogin({email, password, setUserFeedback, navigate})}> Log in <LogIn size={16}/> </button>
                    <p className="cursor-pointer hover:scale-110 transition duration-200" onClick={() => navigate("/register")}> Dont have an account? Register</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default login