import React from 'react'
import {global} from '../../pages/_app'
import Image from 'next/image'
import Link from 'next/link'
import MeetingTypes from '../other-components/MeetingTypes'
import generalcss from '../../styles/page-modules/topics.general.module.scss'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";


const TopicsGeneral = ({data}) => {

  const [accordionCount, setAccordionCount] = React.useState(-1)
  const dataAttributes= data.data.attributes

  return (
    <div className="container">
      <section className="mainimage">
        <Image
          src={`${global.host}${dataAttributes.mainImage.data.attributes.url}`}
          alt={dataAttributes.mainImage.data.attributes.alternativeText}
          className="imageCover"
          fill
          priority
      />
      </section>
      <h1>{dataAttributes.title}</h1>
     {/* <PopUp data={dataAttributes.popups.data}/>*/}

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

              <ReactMarkdown className={accordionCount==index? generalcss.paragraphs: generalcss.paragraphsclosed} rehypePlugins={[rehypeRaw]}>{item.attributes.text}</ReactMarkdown>
              <div className="horizontalLine"></div>
              </div>
          )
        })}
      </section>
      {<Link href={`${global.host}${dataAttributes.schweringerManifest.data.attributes.url}`}  target="_blank">
                  download hear
      </Link>}

      <h1>Unsere Formate</h1>

      <MeetingTypes data={dataAttributes.meetingTypes.data} />

      <div className="lastupdated">{dataAttributes.updatedAt}</div> 
    </div>
  )
}

export default TopicsGeneral





