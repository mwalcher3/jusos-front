import Header from './Header'
import Footer from './Footer'
import SideButtons from './SideButtons'


const Layout = ({children, menuData, links}) => {
    return (
        <>
        <Header menuData={menuData} links={links}/>
        <SideButtons/>
        <div>
            {children}
        </div>
        <Footer menuData={menuData} links={links}/>
        </>
    )
}

export default Layout



