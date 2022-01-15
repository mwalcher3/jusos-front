import Link from 'next/link'
import layoutcss from '../styles/layout.module.css'


const navbar = () => {
    return (
        <>
        <div className={layoutcss.nav}>
        <img src="Hamburger_icon.svg.png" alt="Burger-icon" className={layoutcss.burger}></img>            
        <div>
            <h2 className={layoutcss.title1}>Jusos Heidelberg</h2>
        </div>
            <div className={layoutcss.container}>
                
                <Link href= "/"><a className={layoutcss.a}>Home</a></Link>
                <Link href="/articles"><a className={layoutcss.a}>Articles</a></Link>
                <div>Calender </div>
         </div>

            <div>
            <Link href="https://www.spd.de/"><h2 className={layoutcss.title2}>SPD</h2></Link>
            </div>
        </div>
        
        </>
    )
}

export default navbar
