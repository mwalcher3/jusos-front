import Nav from './Navbar'


const Layout = ({children}) => {
    return (
        <>
        <Nav/>
        <div>
            {children}
        </div>
        </>
    )
}

export default Layout
