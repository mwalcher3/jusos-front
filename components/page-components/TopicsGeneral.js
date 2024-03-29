import React from 'react'
import {global} from '../../pages/_app'
import Image from 'next/image'
import Link from 'next/link'
import generalcss from '../../styles/page-modules/topics.general.module.scss'
import MainImage from "../other-components/MainImage"
import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile} from '@fortawesome/free-solid-svg-icons'


const TopicsGeneral = ({data}) => {

  const [accordionCount, setAccordionCount] = React.useState(-1)
  const dataAttributes= data.data.attributes

  const sortedTopics= dataAttributes.topics.data.sort((a, b) => a.id - b.id);

  return (
    <div className="container">
      <MainImage largeImage={dataAttributes.mainImage} smallImage={dataAttributes.mainImageSmallScreens}/>
      
      <h1 className="header">{dataAttributes.titleTopics}</h1>

      <section className={generalcss.accordioncontainer}>
        {sortedTopics.map((item, index)=>{
          return(
            <div key={index}>
              <div className={generalcss.accordionbanner}>
                <h2>{item.attributes.title}</h2>

                <span onClick={()=> {index==accordionCount? setAccordionCount(-1): setAccordionCount(index)}} className={generalcss.more}>
                    <div className={generalcss.plushorizontal}></div>
                    <div className={accordionCount==index? generalcss.minus: generalcss.plusvertical}></div>
                </span>
              </div>

              <section className={accordionCount==index? generalcss.paragraphs: generalcss.paragraphsclosed}>
              {<div className={item.attributes.image.data? "pimage": "none"}>
              {item.attributes.image.data == null ? <div></div>: 
              <Image
                    src={`${global.host}${item.attributes.image.data.attributes.url}`}
                    alt={item.attributes.image.data.attributes.alternativeText}
                    fill
                    className="imageCover"
                    priority
              />}
          </div>}

              <ReactMarkdown  rehypePlugins={[rehypeRaw]}>{item.attributes.text}</ReactMarkdown>
              </section>
              <div className="horizontalLine"></div>
              </div>
          )
        })}
      </section>
      
      <section>
      <ReactMarkdown  rehypePlugins={[rehypeRaw]}>{dataAttributes.schwerinerManifestText}</ReactMarkdown>
      {<Link className={generalcss.schwerinerManifest} href={`${global.host}${dataAttributes.schwerinerManifest.data.attributes.url}`}  target="_blank">
                  <h3>Schweriner Manifest</h3>

                  <FontAwesomeIcon icon={faFile} />
      </Link>}
      </section>
    </div>
  )
}

export default TopicsGeneral





