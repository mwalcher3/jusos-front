import React from 'react'
import Link from "next/link"
import Image from "next/image"
import {global} from '../../pages/_app'
import simplecss from "../../styles/component-modules/simple-page.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import SocialMediaIcons from "../other-components/SocialMediaIcons"


const SimplePage = ({data}) => {
  console.log(data);
  const dataAttributes= data.data.attributes

  return (
    <div className={simplecss.container}>
       {dataAttributes.mainImage.data!= null?
        <section className="mainimage">
        <Image
          src={`${global.host}${dataAttributes.mainImage.data.attributes.url}`}
          alt={dataAttributes.mainImage.data.attributes.alternativeText}
          layout="fill"
          objectFit="cover"
          objectPosition="50% left"
          priority
      />
      </section> : <div></div>}
      
      <section className={simplecss.mainheader}>  
        <h1>{data.data.attributes.title}</h1>
        <div className={simplecss.horizontalline}></div>
      </section>

      {
        data.data.attributes.structure.map((item, index)=>{
          switch(item.__component){
              case "component.sub-title":
                return(
                  <h2 key={index}>{item.subTitle}</h2>
                )

              case 'component.text-block':
                  return(
                    <div key={index}>
                    <h3>{item.title}</h3>
                    <div className={item.border==true? simplecss.paragraphBorder: ""}>
                      <div className={item.image? simplecss.pimage: "none"}>
                      { item.image? <Image
                            src={`${global.host}${item.image.image.data[0].attributes.url}`}
                            alt={item.image.image.data[0].attributes.alternativeText}
                            layout="fill"
                            objectFit="cover"
                            priority
                    />: ""}
                      </div>
                      <p>
                      {item.paragraph}
                      </p>
                      </div>
                    </div>
                  )


                case "component.links": 
                return(
                  <Link key={index} href={item.URL}>
                    <a target="_blank" className={simplecss.externalLinks}>
                      {item.displayedTitle}
                      <FontAwesomeIcon icon={faArrowRight} />
                      </a>
                    </Link>
                )

                case "component.internal-links": 
                const image= item.image.image.data[0].attributes


                return(
                  <section key={index} className={simplecss.internalLinkBox}>
                  <Link  href={item.URL}>
                    <div>
                      <div className={simplecss.images}>
                      {<Image
                            src={`${global.host}${image.url}`}
                            alt={image.alternativeText}
                            layout="fill"
                            objectFit="cover"
                            priority
                      />}
                    </div>
                    <div className={simplecss.textarrow}>
                    <h4>{item.displayedText}</h4>
                    <FontAwesomeIcon icon={faArrowRight} />
                      </div>
                      </div>
                   </Link>
                   </section>
                )
    

                case "component.list":
                  return(
                  <ul key={index}>
                    {
                      item.bulletPoints.map((item, index)=>{
                        return(
                          <li key={index}>{item.bulletPoint}</li>
                        )
                      })
                    }
                  </ul>
                  )

                  case "component.social-media-links-box":
                    return(
                      <div key={index}>
                        <h3>{item.title}</h3>
                      <SocialMediaIcons data={item.socialMediaLink}/>
                      </div>
                    )
          }
        })
      }
      <div className="lastupdated">{data.data.attributes.updatedAt}</div> 
    </div>
  )
}

export default SimplePage



