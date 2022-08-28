import React from 'react'
import Image from 'next/image'
import currentcss from '../styles/component-modules/topics.current.module.scss'

const TopicsCurrent = ({data}) => {
  
  const dataAttributes= data.data.attributes
  return (
    <div className={currentcss.maincontainer}>

      <h1>{dataAttributes.title}</h1>

      {dataAttributes.topics.data.map((item, id)=>{
        return(
          <div key={id} className={currentcss.boxes}>
            <div className={currentcss.images}>
              <Image
                    src="/image-4.jpg" 
                    alt="Spaziergang"
                    layout="fill"
                    objectFit='cover'
                    priority
                  />
                  </div>
            <h2>{item.attributes.title}</h2>
            <p className={currentcss.textboxes}>
              {item.attributes.text}</p>
          </div>
        )
      })}
      </div>
  )
}

export default TopicsCurrent