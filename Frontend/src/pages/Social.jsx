import FancyInput from '../components/elements/FancyInput'
import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'

const Social = () => {
 
    const [searchValue, setSearchValue] = useState("")

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
                        <div className="border rounded-lg h-20 bg-gray-300">

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