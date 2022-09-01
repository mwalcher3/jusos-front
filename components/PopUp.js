import React from 'react'
import {global} from '../pages/_app'
import Image from 'next/image'
import popupcss from "../styles/component-modules/popup.module.scss"

const PopUp = ({data}) => {
  console.log(data)
  const [bulletPCount, setBulletPCount]= React.useState(-1)

  React.useEffect(()=>{
    var body= document.querySelector("#body")
    bulletPCount!=-1? 
    body.classList.add('burgeropen'):body.classList.remove('burgeropen')
  },[bulletPCount])


  return (
    <div className={popupcss.popupscontainer}>

      {data.map((item,index)=>{

        return(
          <div key={index}>
          <div 
          className={popupcss.icons}
          onClick={()=>
            {index == bulletPCount ? setBulletPCount(-1): setBulletPCount(index)}
          }>
    
            <Image
            src={`${global.host}${item.attributes.icon.data.attributes.url}`}
            alt= {item.attributes.icon.data.attributes.alternativeText}
            layout= "fill"
            objectFit="scale-down"
            priority
        />
          </div>

          <div onClick={()=>{if(bulletPCount!=-1){setBulletPCount(-1)}}} className={index==bulletPCount? popupcss.overlay: "none"}>
          <div   className={index==bulletPCount? popupcss.bulletPoints: "none"}>
            <button className={popupcss.close}></button>
            <h2>{item.attributes.title}</h2>
            <ul>
              {item.attributes.bulletPoints.map((item,index)=>{
                return(
                    <li key={index}>
                    {item.bulletPoint}
                    </li>
                )
              })}
              </ul>
          </div>
          </div>

          
        </div>
        )
      })}


    </div>
  )
}

export default PopUp