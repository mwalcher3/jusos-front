import Nav from './Header'


const Layout = ({children, menuData}) => {
    return (
        <>
        <Nav menuData={menuData}/>
        <div>
            {children}
        </div>
        </>
    )
}

export default Layout
