import React from 'react'
import {global} from '../pages/_app'
import Image from 'next/image'
import PopUp from './PopUp'
import generalcss from '../styles/component-modules/topics.general.module.scss'


const TopicsGeneral = ({data}) => {

  const [textOpen, setTextOpen] = React.useState(-1)
    const dataAttributes= data.data.attributes

  return (
    <div className="container">
      <div className="mainimage">
        <Image
          src={`${global.host}${dataAttributes.mainImage.data.attributes.url}`}
          alt={dataAttributes.mainImage.data.attributes.alternativeText}
          layout="fill"
          objectFit="cover"
          objectPosition="50% left"
          priority
      />
      </div>
      <h1>{dataAttributes.title}</h1>
      <p>{dataAttributes.description}</p>
      <PopUp data={dataAttributes.popups.data}/>

      <div >
        {dataAttributes.topics.data.map((item, index)=>{
          return(
            <div key={index} className={generalcss.topicstext}>
              <h2>{item.attributes.title}</h2>
              <span className={generalcss.plus}></span>
              <p className={textOpen==index? generalcss.paragraphs: "none"}>{item.attributes.text}</p>
              <div className="horizontalLine"></div>
              </div>
          )
        })}
      </div>
      <p className="lastupdated">{dataAttributes.updatedAt}</p> 
    </div>
  )
}

export default TopicsGeneral