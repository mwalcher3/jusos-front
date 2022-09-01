import React from 'react'
import {global} from '../pages/_app'
import Image from 'next/image'
import PopUp from './PopUp'
import generalcss from '../styles/component-modules/topics.general.module.scss'


const TopicsGeneral = ({data}) => {
  console.log(data);
    const dataAttributes= data.data.attributes

  return (
    <div className={generalcss.maincontainer}>
      <div className={generalcss.image}>
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
      <PopUp data={data.popups}/>
        </div>
  )
}

export default TopicsGeneral