import Link from 'next/link'
import layoutcss from '../styles/layout.module.scss'
import {useState, useEffect} from 'react'


const Navbar = () => {

    const [scrolled, setScrolled]= useState(false)

    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY>100){
                setScrolled(true)
            }
            else{
                setScrolled(false)
            }
        })
    })
        
    const menu=[{"label":"home","link":"./"},
   {"label":"articles","link":"./articles"},
   {"label":"calender","link":"./calender"}]
    
    return (
        <>
        <div className={layoutcss.nav}>

        <div className={layoutcss.logodiv}>
            <img src="Jusos_Logo_4c.svg_.png" alt="Jusos Logo" className={scrolled? layoutcss.logoscrolled: layoutcss.logo}></img>  
        </div>

         <div className={layoutcss.main}>
        <div> Jusos Heidelberg</div>
            {menu.map((item, index)=>{
                return(
                    <div className= {layoutcss.navlabel} key={index}>
                       <Link href={item.link}>
                          <div>{item.label}</div>
                        </Link>
                    </div>
            )
        })}

        <div> SPD </div>
        </div>


        </div>

        
        </>
    )
}

export default Navbar
