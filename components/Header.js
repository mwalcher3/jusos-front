import React, {useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import headercss from '../styles/header.module.scss'


  const Header = ({menuData, linkObject})  =>{

    const intersectionRef= useRef();
    const [intersection, setIntersection]= useState(true)
    const [burgerOpen, setBurgerOpen] = useState(false)
    const [clickCount, setClickCount] = useState(-1)
    const [hoveringCount, setHoveringCount] = useState(-1)


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

   //nav bar

    const isOpen =(index)=>{
        if(index==clickCount || index==hoveringCount){
            return true
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
        <div ref={intersectionRef}className={headercss.intersectingelement}></div>
        <div className={headercss.nav+ " " +(intersection? "" : headercss.navscrolled)}>

        {/*Jusos Logo*/}
        <div className={headercss.logodiv}>
            <img src="Jusos_Logo_4c.svg_.png"
            alt="Jusos Logo"
            className={headercss.logo + " " + (intersection==false || burgerOpen? headercss.logoscrolled: "") }></img> 

        </div>
        

        {/*Nav Bar*/}
        { <div> Jusos Heidelberg</div> }
        <div className={headercss.navmenu}>
            
            {menuData.menu.items.map((item, index)=>{
                return(
                    <div key={index}>
                    <div
                    className= {headercss.navlabel} 
                    onClick={()=>{
                        index== clickCount? setClickCount(-1) :setClickCount(index)
                    }}
                    onMouseOver= {()=>{setHoveringCount(index)}}
                    onMouseOut= {()=>{setHoveringCount(-1)}} 
                    key={index}>
                    
                   {item.title}
                   <div className={headercss.navlabelunderline+ " "+ (isOpen(index)? "": headercss.navlabelunderlineclosed)}></div>
                    </div>

                    <div  
                    onMouseOver= {()=>{setHoveringCount(index)}}
                    onMouseOut= {()=>{setHoveringCount(-1)}} 
                    className={isOpen(index)?  headercss.navsublabel +" "+(index==hoveringCount? headercss.navsubhover:"") : headercss.navsubclosed } >
                    {item.children.map((itemChildren, index)=>{
                        return(
                            <>
                            <div key={index} className={headercss.navsubitems}>{itemChildren.title}</div>
                            <div className={headercss.horizontalLine}></div>
                            </>
                        )
                    })}
                    </div>
                    </div>
            )
        })}
        </div>

        <div> SPD </div>


        {/*Toggle dark mode*/}

       <button onClick={toggleTheme}>
           dark/light
       </button>

       {/*Burger Icon*/}
        <div className={headercss.burger+" "+ (burgerOpen? headercss.burgeropen : "")} 
        onClick={toggleBurger}>

            <div className={headercss.burgermiddle  +" "+ (burgerOpen? headercss.burgermiddleopen:"")}>
            </div>
        </div>


        </div>

        {/*Burger Menu*/}

        <div className={burgerOpen? headercss.burgerMenu: headercss.none}>
            <div className={headercss.burgerMenuContent}>
                <h2>Menü</h2>
                <button className={headercss.donationButton}>Spenden</button>
           {menuData.menu.items.map((item, index)=>{
              
               return(
                   <>
                         <div className={headercss.horizontalLine}></div>
                   <div
                        key= {index} 
                        className={headercss.burgerMenuTitles } 
                        onClick={()=> 
                        {index == clickCount ? setClickCount(-1): setClickCount(index)}}>
                        {item.title}
                    </div>
                
                  <div 
                        className={index == clickCount ? 
                        headercss.burgerMenuSubtitles: headercss.burgerMenuSubtitlesHidden}>
                        {item.children.map((itemChildren)=>{

                        return (
                        <div key={itemChildren.title}>
                          <Link href={`./${linkObject[itemChildren.url]}`}>
                            {itemChildren.title}
                           </Link>
                            </div>)
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

