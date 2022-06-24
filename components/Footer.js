import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import footercss from '../styles/footer.module.scss'

const Footer = ({menuData, links}) => {
  return (
    <div className={footercss.maincontainer}>
      <div className={footercss.content}>

      <div className={footercss.menu} >
      {menuData.menu.items.map((item, index)=>{
        return(
          <div key={index} className={footercss.tab}>

        <div className={footercss.title}>
          {item.title}
        </div>

       {item.children.map((itemChildren, index)=>{
          return (
            <>
            <Link  href={`./${links[itemChildren.url]}`}>
          <div key={index} className={footercss.subtitle}>
            {itemChildren.title}
            </div>
            </Link>
            </>
          )
        })}
        </div>
        )
      })}
      </div>

      <div className="horizontalLine"></div>

      
     <div 
        className={footercss.logocontainer}>

        <div className={footercss.logos + " " + footercss.heidelberglogo}>
       <Image
         src={`/Jusos_Heidelberg_Logo.png`}
         alt="jusos Heidelberg logo"
         layout='fill'
         //objectFit= 'cover'
         priority
        />
        </div>

        <Link href={"https://jusos.de/"}>
        <div className={footercss.logos}>
        <Image
         src={`/Jusos_Logo_4c.svg_.png`}
         alt="jusos logo"
         layout='fill'
         objectFit= 'contain'
         priority
        />
        </div>
        </Link>

        <Link href={"https://spd.de"}>
        <div className={footercss.logos}>
        <Image
         src={`/Spd_Logo.png`}
         alt="spd logo"
         layout='fill'
         objectFit= 'contain'
         priority
        />
        </div>
        </Link>
  

    </div>

    <div className={footercss.followus}>Folge uns</div>


    </div>
    </div>
    
  )
}

export default Footer