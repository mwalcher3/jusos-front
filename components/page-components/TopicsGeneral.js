import React from 'react'
import {global} from '../../pages/_app'
import Image from 'next/image'
import Link from 'next/link'
import MeetingTypes from '../other-components/MeetingTypes'
import generalcss from '../../styles/page-modules/topics.general.module.scss'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile} from '@fortawesome/free-solid-svg-icons'


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
          quality={100}
          priority
      />
      </section>
      <h1 class="header">{dataAttributes.titleTopics}</h1>

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
      {<Link className={generalcss.schwerinerManifest} href={`${global.host}${dataAttributes.schwerinerManifest.data.attributes.url}`}  target="_blank">
                  <h3>Schweriner Manifest</h3>
                  <FontAwesomeIcon icon={faFile} />
      </Link>}

      <h1>{dataAttributes.titleMeetingTypes}</h1>

      <MeetingTypes data={dataAttributes.meetingTypes.data} />

      <div className="lastupdated">{dataAttributes.updatedAt}</div> 
    </div>
  )
}

export default TopicsGeneral





