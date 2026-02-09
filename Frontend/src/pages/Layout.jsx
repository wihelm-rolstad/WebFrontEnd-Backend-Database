import {Outlet, Link} from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/footer.jsx'

export default function Layout(){
    return(
        <>
        <Navbar/>

        <main>
            <Outlet/>
        </main>

        <Footer/>
        </>
    );
}