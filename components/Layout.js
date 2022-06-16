import Header from './Header'


const Layout = ({children, menuData, linkObject}) => {
    return (
        <>
        <Header menuData={menuData} linkObject={linkObject}/>
        <div>
            {children}
        </div>
        </>
    )
}

export default Layout



