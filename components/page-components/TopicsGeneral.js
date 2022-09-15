import React from 'react'
import {global} from '../../pages/_app'
import Image from 'next/image'
import PopUp from '../other-components/PopUp'
import generalcss from '../../styles/component-modules/topics.general.module.scss'


const TopicsGeneral = ({data}) => {

  const [accordionCount, setAccordionCount] = React.useState(-1)
    const dataAttributes= data.data.attributes

  return (
    <div className="container">
      <section className="mainimage">
        <Image
          src={`${global.host}${dataAttributes.mainImage.data.attributes.url}`}
          alt={dataAttributes.mainImage.data.attributes.alternativeText}
          layout="fill"
          objectFit="cover"
          objectPosition="50% left"
          priority
      />
      </section>
      <h1>{dataAttributes.title}</h1>
      <PopUp data={dataAttributes.popups.data}/>

      <section className={generalcss.accordioncontainer}>
        {dataAttributes.topics.data.map((item, index)=>{
          return(
            <div key={index}>
              <div className={generalcss.accordionbanner}>
                <h2>{item.attributes.title}</h2>

                <span onClick={()=> {index==accordionCount? setAccordionCount(-1): setAccordionCount(index)}} className={generalcss.more}>
                    <div className={generalcss.plushorizontal}></div>
                    <div className={accordionCount==index? generalcss.minus: generalcss.plusvertical}></div>
                </span>
              </div>

              <p className={accordionCount==index? generalcss.paragraphs: generalcss.paragraphsclosed}>{item.attributes.text}</p>
              <div className="horizontalLine"></div>
              </div>
          )
        })}
      </section>

      <div className="lastupdated">{dataAttributes.updatedAt}</div> 
    </div>
  )
}

export default TopicsGeneral