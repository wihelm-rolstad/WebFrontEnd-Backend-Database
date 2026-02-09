import {Phone, Mail} from 'lucide-react'
const UserInfo = () => {

    const userEmail = "someEmail@gmail.com"
    const userPhoneNumber = "+47 47 47 47 47"
    return(
        <>
            <div className="flex flex-col gap-4 border rounded-2xl bg-gray-100 mx-auto max-w-160 p-4">
                    <p className="text-lg">User Details</p>
                    <div className="flex gap-2">
                        <Mail/>
                        <p>Email adress: {userEmail} </p>
                    </div>
                    <div className="flex gap-2">
                        <Phone/>
                        <p> Phone number: {userPhoneNumber} </p>
                    </div>
            </div>
        </>
    )
}
export default UserInfo;