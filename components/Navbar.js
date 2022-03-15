import Link from 'next/link'
import layoutcss from '../styles/layout.module.scss'
import {useEffect, useRef, useState} from 'react'

const Navbar = () => {
    const intersectionRef= useRef();
    const [intersection, setIntersection]= useState(false)
    const [burgerIsOpen, setBurgerIsOpen] = useState("")

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

   const burgerClick= ()=>{
       if (burgerIsOpen){
           setBurgerIsOpen("");
       }
       else{
           setBurgerIsOpen([layoutcss.burgeropen, layoutcss.burgermiddleopen]);
       }
   }

    return (
        <>
        <div className={layoutcss.nav}>

        <div className={layoutcss.logodiv}>
            <img src="Jusos_Logo_4c.svg_.png"
            alt="Jusos Logo"
            className={intersection? layoutcss.logo: layoutcss.logoscrolled}></img>  
        </div>

        <div  className={layoutcss.extraarticle}>
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

        <div className={layoutcss.burger+" "+ burgerIsOpen[0]} onClick={burgerClick}>
            <div className={layoutcss.burgermiddle  +" "+ burgerIsOpen[1]}></div>
        </div>

        </div>

        <div ref={intersectionRef}className={layoutcss.intersectingelement}></div>
        </>
    )
}

export default Navbar
