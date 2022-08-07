import React from 'react'
import sidebuttoncss from '../styles/sidebutton.module.scss'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faEnvelope, faSun, faMoon} from '@fortawesome/free-solid-svg-icons'


const SideButtons = () => {


    const toggleTheme=()=>{
        var colorTheme= localStorage.getItem('color-mode')
        var wrapper= document.querySelector("#wrapper")

        localStorage.setItem('color-mode', colorTheme==='light'? 'dark': 'light')

        if(colorTheme== 'light'){
         wrapper.classList.add('dark');
        }
        else{
         wrapper.classList.remove('dark')
        }
    }

  return (
    <div className={sidebuttoncss.maincontainer}>
        <Link href="/" passHref>
        <button>
          <FontAwesomeIcon icon={faHouse}/>
          </button>
        </Link>
        
        <button onClick={toggleTheme}>
        <FontAwesomeIcon className={sidebuttoncss.iconsun} icon={faSun} />
        <FontAwesomeIcon className={sidebuttoncss.iconmoon} icon={faMoon} />
        </button>

        <Link href="/kontakt" passHref>
        <button><FontAwesomeIcon icon={faEnvelope} /></button>
        </Link>
    </div>
  )
}

export default SideButtons 