import {Github} from 'lucide-react'

const Footer = () => {
    return(
        <>
            <div className="sticky bottom-0 w-full h-30 flex bg-[var(--color-accent)] mt-20 items-center mt-20">
                <div className="flex flex-col p-4 max-w-160 mx-auto">
                    
                        <a className="flex gap-1 hover:text-blue-500 hover:scale-110 transition duration-200" href="https://github.com/wihelm-rolstad/WebFrontEnd-Backend-Database">  <Github/> Check out the repo!</a>
                </div>
            </div>
        </>
    )
}
export default Footer;