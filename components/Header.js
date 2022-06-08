import React, {useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import layoutcss from '../styles/header.module.scss'


  const Header = ({menuData})  =>{

    const intersectionRef= useRef();
    const [intersection, setIntersection]= useState(true)
    const [burgerOpen, setBurgerOpen] = useState(false)
    const [subMenuCount, setSubMenuCount] = useState(-1)


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

   //dark mode

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

   //burger Icon

   const toggleBurger= () =>{
       setBurgerOpen(!burgerOpen)
       setSubMenuCount(-1)
   }


   //burger Menu 

   React.useEffect(()=>{
    var body= document.querySelector("#body")
    if(burgerOpen==true){
        body.classList.add('burgeropen')
    }
    else{
        body.classList.remove('burgeropen')
    }
}, [burgerOpen])

React.useEffect(()=>{
    var body= document.querySelector("#body")
    const observer= new ResizeObserver((entries)=>{
        const isMediumWidth= entries[0].contentRect.width > 768;

        if(isMediumWidth){
            setBurgerOpen(false)
        }
    })

    observer.observe(body)
})



 
    return (
        <>
        
        {/*Intersecting Element*/}
        <div ref={intersectionRef}className={layoutcss.intersectingelement}></div>
        <div className={layoutcss.nav}>

        {/*Jusos Logo*/}
        <div className={layoutcss.logodiv}>
            <img src="Jusos_Logo_4c.svg_.png"
            alt="Jusos Logo"
            className={layoutcss.logo + " " + (intersection==false || burgerOpen? layoutcss.logoscrolled: "") }></img> 

        </div>

        {/*Nav Bar*/}

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

        {/*Toggle dark mode*/}

       <button onClick={toggleTheme}>
           dark/light
       </button>

       {/*Burger Icon*/}
        <div className={layoutcss.burger+" "+ (burgerOpen? layoutcss.burgeropen : "")} 
        onClick={toggleBurger}>

            <div className={layoutcss.burgermiddle  +" "+ (burgerOpen? layoutcss.burgermiddleopen:"")}>
            </div>
        </div>


        </div>

        {/*Burger Menu*/}

        <div className={burgerOpen? layoutcss.burgerMenu: layoutcss.none}>
            <div className={layoutcss.burgerMenuContent}>
                <h2>Menü</h2>
                <button className={layoutcss.donationButton}>Spenden</button>
           {menuData.menu.items.map((item, index)=>{
              
               return(
                   <>
                         <div className={layoutcss.horizontalLine}></div>
                   <div
                        key= {index} 
                        className={layoutcss.burgerMenuTitles } 
                        onClick={()=> 
                        {index == subMenuCount ? setSubMenuCount(-1): setSubMenuCount(index)}}>
                        {item.title}
                    </div>
                
                  <div 
                        className={index == subMenuCount ? 
                        layoutcss.burgerMenuSubtitles: layoutcss.burgerMenuSubtitlesHidden}>
                        {item.children.map((itemChildren)=>{
                        return (<div key={itemChildren.id} >{itemChildren.title}</div>)
                        })}  
                    </div>
                   
                   </>
               )
                })}
        </div>
        </div>
        </>
    )
}

export default Header

