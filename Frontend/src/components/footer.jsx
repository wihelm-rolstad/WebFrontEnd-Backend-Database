import {Github} from 'lucide-react'

const Footer = () => {
    return(
        <>
            <div className="flex w-full bg-[var(--color-accent)] text-white mt-20 h-40 items-center">
                <div className="flex flex-col p-4 max-w-5xl mx-auto justify-center items-center">
                        <a className="flex gap-1 hover:text-lime-300 hover:scale-110 transition duration-200 mx-auto" href="https://github.com/wihelm-rolstad/WebFrontEnd-Backend-Database">  <Github/> Check out the repo!</a>
                </div>
            </div>
        </>
    )
}
export default Footer;