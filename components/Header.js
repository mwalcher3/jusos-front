import React, {useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import headercss from '../styles/header.module.scss'


  const Header = ({menuData, links})  =>{

    const intersectionRef= useRef();
    const [intersection, setIntersection]= useState(true)
    const [burgerOpen, setBurgerOpen] = useState(false)
    const [subMenuCount, setSubMenuCount] =useState(-1)
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
            <img src="/Jusos_Logo_4c.svg_.png"
            alt="Jusos Logo"
            className={headercss.logo + " " + (intersection==false || burgerOpen? headercss.logoscrolled: "") }></img> 

        </div>
        

        {/*Nav Bar*/}
        <div className={headercss.navmenu}>
        <div> Jusos Heidelberg</div> 
            
            {menuData.menu.items.map((item, index)=>{
                return(
                    <div key={index}>

                    <nobr>
                    <div
                    className= {headercss.navlabel} 
                    onMouseOver= {()=>{setHoveringCount(index)}}
                    onMouseOut= {()=>{setHoveringCount(-1)}} 
                    key={index}>
                    
                   {item.title}
                   <div className={headercss.navlabelunderline+ " "+ (hoveringCount==index? "": headercss.navlabelunderlineclosed)}></div>
                    </div>
                    </nobr>

                    <div  
                    onMouseOver= {()=>{setHoveringCount(index)}}
                    onMouseOut= {()=>{setHoveringCount(-1)}} 
                    className={hoveringCount== index?  headercss.navsublabel  : headercss.navsubclosed } >
                    {item.children.map((itemChildren, index)=>{
                        return(
                            <>
                            <Link href={`./${links[itemChildren.url]}`}>
                                <div key={index} className={headercss.navsubitems}>
                                {itemChildren.title}
                            </div>
                            </Link>
                            <div className='horizontalLine'></div>
                            </>
                        )
                    })}
                    </div>
                    </div>
            )
        })}
              <div> SPD </div>
        </div>



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
                <h2>Men??</h2>
                <button className={headercss.donationButton}>Spenden</button>
           {menuData.menu.items.map((item, index)=>{
              
               return(
                   <>
                         <div className="horizontalLine"></div>
                   <div
                        key= {index} 
                        className={headercss.burgerMenuTitles } 
                        onClick={()=> 
                        {index == subMenuCount ? setSubMenuCount(-1): setSubMenuCount(index)}}>
                        {item.title}
                    </div>
                
                  <div 
                        className={index == subMenuCount ? 
                        headercss.burgerMenuSubtitles: headercss.burgerMenuSubtitlesHidden}>
                        {item.children.map((itemChildren)=>{

                        return (
                        <div key={itemChildren.title}>
                          <Link href={`./${links[itemChildren.url]}`}>
                              <div className={headercss.burgerlinks}>
                          {itemChildren.title}
                          </div>
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

