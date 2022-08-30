import React from 'react'
import Image from 'next/image'
import currentcss from '../styles/component-modules/topics.current.module.scss'
import Carousel from "./Carousel"

const TopicsCurrent = ({data}) => {
  console.log(data)

  const instagramData= data.instaData
  const dataAttributes= data.data.attributes

  

  return (
    <div className={currentcss.maincontainer}>

      <h1>{dataAttributes.title}</h1>

      {instagramData.map((item, id)=>{

        if(item.media_type=="CAROUSEL_ALBUM"){
          const imageSource= [];

          item.children.data.map((item)=>{
            imageSource.push(item.media_url)
          })

          let carouselData= {
            length: item.children.data.length,
            onClick: true,
            automatic: false,
            dataSource: imageSource,
            imageAlt: "instagram image",
            dots: false
           }

           return(
            <div key={id} className={currentcss.boxes}>
              <div className={currentcss.images}>

  
                {<Carousel carouselData={carouselData}/>}
  
                {/*<Image
                      src={item.media_url} 
                      alt="Spaziergang"
                      layout="fill"
                      objectFit='cover'
                      priority
           />*/}
  
                    </div>
  
              <h2>this is a title</h2>
              <p className={item.caption? currentcss.textboxes: "none"}>
                {item.caption}</p>
            </div>
          )
        }


       
      })}
      </div>
  )
}

export default TopicsCurrent