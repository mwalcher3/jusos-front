import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import headercss from '../../styles/layout-modules/header.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { getFontOverrideCss } from 'next/dist/server/font-utils'


const Header = ({ menuData }) => {

    const intersectionRef = useRef();
    const [intersection, setIntersection] = useState(true)
    const [burgerOpen, setBurgerOpen] = useState(false)
    const [subMenuCount, setSubMenuCount] = useState(-1)
    const [hoveringCount, setHoveringCount] = useState(-1)

    useEffect(() => {
        const options = {
            threshold: .5,
        }

        const observer = new IntersectionObserver((entries, observer) => {
            entries.map((entry) => {
                entry.isIntersecting ? setIntersection(true) : setIntersection(false)
            })
        }, options)

        observer.observe(intersectionRef.current)
    }, [])

    //burger Icon

    const toggleBurger = () => {
        setBurgerOpen(!burgerOpen)
        setSubMenuCount(-1)
    }

    //burger Menu 

    React.useEffect(() => {

        var body = document.querySelector("#body")
        let scrollY
        function preventDefault(e) {
            e.preventDefault();
        }

        if (burgerOpen == true) {
            //remember the scrolling
            scrollY = window.scrollY;
            body.classList.add('burgeropen')
            body.addEventListener('pointermove', preventDefault);
        }
        else {
            window.scrollTo(0, scrollY);
            body.classList.remove('burgeropen')
            body.removeEventListener('pointermove', preventDefault);
        }

        //synchronize the height for IOS safari
        function syncHeight() {
            document.documentElement.style.setProperty(
                '--window-inner-height',
                `${window.innerHeight}px`
            );
        }

        window.addEventListener('resize', syncHeight);
    }, [burgerOpen])



    React.useEffect(() => {
        var body = document.querySelector("#body")
        const observer = new ResizeObserver((entries) => {
            const isMediumWidth = entries[0].contentRect.width > 768;
            if (isMediumWidth) {
                setBurgerOpen(false)
            }
        })
        observer.observe(body)
    })


    return (
        <>

            {/*Intersecting Element*/}
            <div ref={intersectionRef} className={headercss.intersectingelement}></div>
            <div className={headercss.nav + " " + (intersection ? "" : headercss.navscrolled)}>

                {/*Jusos Logo*/}
                <Link href={"/"} className={headercss.logodiv}>
                    <img src="/jusos_logo_ROT_HEIDELBERG_VERSION.png"
                        alt="Jusos Logo"
                        className={headercss.logo + " " + (intersection == false || burgerOpen ? headercss.logoscrolled : "")}>
                        </img>
                </Link>
        

                {/*Nav Bar*/}
                <div className={headercss.navmenu}>
                <div style={{'white-space':'nowrap'}}>
                    Jusos Heidelberg
                    </div>
                    {menuData.menu.items.map((item, index) => {
                        return (
                            <div key={index}>
                                <nobr>
                                    <div
                                        className={headercss.navlabel}
                                        onMouseOver={() => { setHoveringCount(index) }}
                                        onMouseOut={() => { setHoveringCount(-1) }}
                                        key={index}>

                                        {item.title}
                                        <div className={headercss.navlabelunderline + " " + (hoveringCount == index ? "" : headercss.navlabelunderlineclosed)}></div>
                                    </div>
                                </nobr>

                                <div
                                    onMouseOver={() => { setHoveringCount(index) }}
                                    onMouseOut={() => { setHoveringCount(-1) }}
                                    className={hoveringCount == index ? headercss.navsublabel : headercss.navsubclosed} >
                                    {item.children.map((itemChildren, index) => {
                                        if(itemChildren.hide_from_header!=true){
                                        return (
                                            <div key={index}>
                                            <Link href={`/${itemChildren.url}`} passHref>
                                                <div className={headercss.navsubitems}>
                                                    {itemChildren.title}
                                                </div>
                                            </Link>
                                            <div className='horizontalLine'></div>
                                            </div>
                                        )
                                        }
                                    })}
                                </div>
                            </div>
                        )
                    })}
                    <div>
                        <Link href="https://jusowerden.spd.de/eintritt-juso" target="_blank"> Mitglied werden </Link>
                    </div>
                    <Link href="https://jusowerden.spd.de/eintritt-juso" target="_blank">
                        <Image 
                            className={headercss.fistLogo}
                            src="/Piktogramm.png"
                            alt="Jusos Piktogramm"
                            height="30"
                            width="30"
                            priority/>
                    </Link>
                </div>



                {/*Burger Icon*/}
                <div className={headercss.burger + " " + (burgerOpen ? headercss.burgeropen : "")}
                    onClick={toggleBurger}>

                    <div className={headercss.burgermiddle + " " + (burgerOpen ? headercss.burgermiddleopen : "")}>
                    </div>
                </div>


            </div>

            {/*Burger Menu*/}

            <div className={burgerOpen ? headercss.burgerMenu : headercss.none}>
                <div className={headercss.burgerMenuContent}>
                    <h3>Jusos Heidelberg</h3>
                  
                    {menuData.menu.items.map((item, index) => {

                        return (
                            <>
                                <div
                                    key={index}
                                    className={headercss.burgerMenuTitles}
                                    onClick={() => { index == subMenuCount ? setSubMenuCount(-1) : setSubMenuCount(index) }}>
                                    {item.title}
                                </div>

                                <div
                                    className={index == subMenuCount ?
                                        headercss.burgerMenuSubtitles : headercss.burgerMenuSubtitlesHidden}>
                                    {item.children.map((itemChildren) => {
                                        if(itemChildren.hide_from_header!=true){
                                        return (
                                            <div key={itemChildren.title}>
                                                <Link href={`/${itemChildren.url}`} passHref>
                                                    <div onClick={() => { setBurgerOpen(false) }} className={headercss.burgerlinks}>
                                                        {itemChildren.title}
                                                    </div>
                                                </Link>
                                            </div>)
                                        }
                                    })}
                                </div>
                                <div className="horizontalLine"></div>
                            </>
                        )
                    })}
                <section className={headercss.burgerlower}>
       
                <h3>
                <Link href="https://jusowerden.spd.de/eintritt-juso" target="_blank"> 
                Mitglied werden <Image 
                    className={headercss.fistLogo}
                    src="/Piktogramm.png"
                    alt="Jusos Piktogramm"
                    height="30"
                    width="30"
                    priority/>
                </Link>
            </h3>
            <div>

            <h5>Folge uns</h5>
            <section className={headercss.burgersocialmedia}>

              <Link href={"https://www.instagram.com/jusoshd/?hl=en"} passHref>
                <FontAwesomeIcon icon={faInstagram} />
              </Link>

              <Link href={"https://www.facebook.com/jusos.heidelberg/"} passHref>
                <FontAwesomeIcon icon={faFacebook} />
              </Link>
            </section>
          </div>
          </section>
                        
                </div>
            </div>
        </>
    )
}

export default Header



