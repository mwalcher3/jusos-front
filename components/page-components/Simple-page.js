import React from 'react'
import simplecss from "../../styles/page-modules/simple-page.module.scss"
import SocialMediaIcons from "../other-components/SocialMediaIcons"
import InternalLinks from "../other-components/InternalLinks"
import ExternalLinks from "../other-components/ExternalLinks"
import TextBlocks from "../other-components/TextBlocks"
import MainImage from "../other-components/MainImage"
import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";



const SimplePage = ({data}) => {
  const dataAttributes= data.data.attributes

  return (
    <div className={simplecss.container}>
        <MainImage largeImage={dataAttributes.mainImage} smallImage={dataAttributes.mainImageSmallScreens}/>
      {dataAttributes.slug=="geschichte" && dataAttributes.mainImage.data!=null? 
      <span className="mainImageCaption">{dataAttributes.mainImage.data.attributes.alternativeText}{dataAttributes.mainImage.data.attributes.caption}
      </span>:<></>}
  
      <h1 className="header">{data.data.attributes.title}</h1>

      {
        data.data.attributes.structure.map((item, index)=>{
          switch(item.__component){
              case "component.sub-title":
                return(
                  <h2 key={index}>{item.subTitle}</h2>
                )

              case 'component.text-block':
                  return(<TextBlocks key={index} data={item}/>)

                case "component.external-link-box":
                  return(<ExternalLinks key={index} data={item.externalLinks}/>)

                case "component.internal-link-box": 
                return(<InternalLinks key={index} data={item.internalLinks}/>)
    

                case "component.list":
                  return(
                  <ul key={index}>
                    {
                      item.bulletPoints.map((item, index)=>{
                        return(
                          <li key={index}><ReactMarkdown rehypePlugins={[rehypeRaw]}>{item.bulletPoint}</ReactMarkdown></li>
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
    </div>
  )
}

export default SimplePage



