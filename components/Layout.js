import Nav from './Navbar'
import layoutcss from '../styles/layout.module.css'


const Layout = ({children}) => {
    return (
        <>
        <Nav/>
        <img src="Jusos_Logo_4c.svg_.png" alt="Jusos Logo" className={layoutcss.logo}></img>
        <div>

            {children}
        </div>
        </>
    )
}

export default Layout
