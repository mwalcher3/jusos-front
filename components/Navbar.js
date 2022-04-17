import React, {useEffect, useContext, useRef, useState} from 'react'
import Link from 'next/link'
import layoutcss from '../styles/layout.module.scss'
import useToggle from '../hooks/useToggle'

const Navbar = () => {
    const intersectionRef= useRef();
    const [intersection, setIntersection]= useState(false)
    const [value, toggleValue] = useToggle(false)


    const menu=[{"label":"home","link":"./"},
   {"label":"artikel","link":"./articles"},
   {"label":"kalender","link":"./calender"},
   {"label": "sprecher", "link": "./sprecher"}]

   useEffect(()=>{
    const options={
        threshold: .5,
    }

    const observer= new IntersectionObserver((entries, observer)=>{
        entries.map((entry)=>{

            if(entry.isIntersecting){
                setIntersection(true);
            }
            else if(entry.isIntersecting==false){
                setIntersection(false);
            }
        })
    }, options)
 
    observer.observe(intersectionRef.current)
   },[])

   const toggleTheme=()=>{
       var colorTheme= localStorage.getItem('color-mode')
       localStorage.setItem('color-mode', colorTheme==='light'? 'dark': 'light')
       var wrapper= document.querySelector("#wrapper")
       if(colorTheme== 'light'){
        wrapper.classList.add('dark')
       }
       else{
        wrapper.classList.remove('dark')
       }
   }

 
    return (
        <>
        <div className={layoutcss.nav}>

        <div className={layoutcss.logodiv}>
            <img src="Jusos_Logo_4c.svg_.png"
            alt="Jusos Logo"
            className={layoutcss.logo + " " + (intersection? "":layoutcss.logoscrolled)}></img>  
        </div>

        <div  className={layoutcss.navlabel+ " "+ layoutcss.extraarticle}>
            <Link href={menu[1].link}>
                <div>
            {menu[1].label}
            </div>
            </Link>
        </div>

         <div className={layoutcss.navmenu}>
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

       <button onClick={toggleTheme}>
           dark/light
       </button>

        <div className={layoutcss.burger+" "+ (value? layoutcss.burgeropen : "")} 
        onClick={toggleValue}>

            <div className={layoutcss.burgermiddle  +" "+ (value? layoutcss.burgermiddleopen:"")}>
            </div>
        </div>


        </div>

        <div ref={intersectionRef}className={layoutcss.intersectingelement}></div>
        </>
    )
}

export default Navbar
