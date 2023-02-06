import React from 'react'
import {global} from '../../pages/_app'
import Image from 'next/image'

const MainImage = ({largeImage, smallImage}) => {
  return (
    <>
    <div>
    {largeImage.data!= null?
    <section className="mainimage">
    <Image
        src={`${global.host}${largeImage.data.attributes.url}`}
        alt={largeImage.data.attributes.alternativeText}
        className="imageCover"
        fill
        priority
    />
    </section>:<>
    {smallImage.data!= null?
  <section className="mainimage">
    <Image
      src={`${global.host}${smallImage.data.attributes.url}`}
      alt={smallImage.data.attributes.alternativeText}
      fill
      className="imageCover"
      priority
  />
  </section>: <></>}
    
    </>}
    {smallImage.data!= null?
  <section className="mainimage mainimagesmallscreens">
    <Image
      src={`${global.host}${smallImage.data.attributes.url}`}
      alt={smallImage.data.attributes.alternativeText}
      fill
      className="imageCover"
      priority
  />
  </section>: 
  <>
   {largeImage.data!= null?
  <section className="mainimage mainimagesmallscreens">
        <Image
        src={`${global.host}${largeImage.data.attributes.url}`}
        alt={largeImage.data.attributes.alternativeText}
        fill
        className="imageCover"
        priority
         />
  </section>:<></>
    }</>}
  </div>
  </>
  )
}

export default MainImage