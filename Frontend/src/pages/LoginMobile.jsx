import { useState } from 'react'
import { handleLogin } from '../hooks/handleLogin'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Activity} from 'lucide-react'
import FancyInput from '../components/elements/FancyInput'

const LoginMobile = () => {
    const [email, setEmailAdress] = useState("")
    const [password, setPassword] = useState("")
    const [userFeedback, setUserFeedback] = useState("");
    const navigate = useNavigate();

    return(
        <>
            <div className="border border-gray-200 bg-white rounded-2xl mx-auto w-80 mt-40 p-4 flex flex-col gap-2 items-center shadow-lg">

                <div className="flex flex-col gap-2 items-center w-60">
                    <Activity className="p-1 rounded-lg h-14 w-14 bg-gradient-to-br from-lime-300 to-emerald-500 text-white " strokeWidth={1.5}/>
                    <h1 className="text-2xl font-semibold">Welcome to NAME</h1>
                    <p>Enter your credentials to login</p>
                </div>
                
                <div className="flex flex-col gap-2">

                    <FancyInput
                        Icon={Mail}
                        desc="Email"
                        type="text"
                        placeholder="your email address"
                        value={email}
                        onChange={(e) => setEmailAdress(e.target.value)}
                    />

                    <FancyInput
                        Icon={Lock}
                        desc="Password"
                        placeholder="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <p className=" mx-auto">{userFeedback}</p>
                    <button className="cursor-pointer bg-white text-black rounded border border-black hover:bg-black hover:border-white hover:text-white hover:scale-110 transition duration-200" onClick={() => handleLogin({email, password, setUserFeedback, navigate})}> Log in</button>
                    <p className="cursor-pointer" onClick={() => navigate("/register")}> Dont have an account? Register</p>
                </div>
            </div>
        </>
    )
}

export default LoginMobile;