import React from 'react'
import sidebuttoncss from '../styles/sidebutton.module.scss'
import Link from 'next/link'

const SideButtons = () => {

    const toggleTheme=()=>{
        console.log('clicked');
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
    <div className={sidebuttoncss.maincontainer}>
        <Link href="/">
        <button>Home</button>
        </Link>
        <button onClick={toggleTheme}>dark mode</button>
        <button>contact</button>
    </div>
  )
}

export default SideButtons 