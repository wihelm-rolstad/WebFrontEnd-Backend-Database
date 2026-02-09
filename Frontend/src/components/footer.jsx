import {Github} from 'lucide-react'

const Footer = () => {
    return(
        <>
            <div className="h-30 flex bg-[var(--color-accent)] mt-20">
                <div className="flex flex-col p-4 max-w-160 mx-auto">
                    <div className="flex gap-2">
                        <Github/>
                        <a className="hover:text-blue-500 hover:scale-110 transition duration-200" href="https://github.com/wihelm-rolstad/WebFrontEnd-Backend-Database"> Check out the repo!</a>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer;