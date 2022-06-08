import Header from './Header'


const Layout = ({children, menuData}) => {
    return (
        <>
        <Header menuData={menuData}/>
        <div>
            {children}
        </div>
        </>
    )
}

export default Layout
