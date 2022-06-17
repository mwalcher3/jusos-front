import Header from './Header'
import Footer from './Footer'


const Layout = ({children, menuData, linkObject}) => {
    return (
        <>
        <Header menuData={menuData} linkObject={linkObject}/>
        <div>
            {children}
        </div>
        <Footer menuData={menuData} linkObject={linkObject}/>
        </>
    )
}

export default Layout



