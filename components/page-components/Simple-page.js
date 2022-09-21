import React from 'react'
import Link from "next/link"
import simplecss from "../../styles/component-modules/simple-page.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'


const SimplePage = ({data}) => {
  console.log(data);

  return (
    <div className={simplecss.container}>
      <div className={simplecss.mainheader}>  
        <h1>{data.data.attributes.title}</h1>
        <div className={simplecss.horizontalline}></div>
      </div>

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
                  <p className={item.border==true? simplecss.paragraphBorder: ""}>{item.paragraph}</p>
                 </div>
                )

                case "component.links": 
                return(
                  <Link  key={index} href={item.URL}>
                    <a target="_blank" className={simplecss.externalLinks}>
                      {item.displayedTitle}
                      <FontAwesomeIcon icon={faArrowRight} />
                      </a>
                    </Link>
                )

                case "component.list":
                  return(
                  <div>hello</div>
                  )
          }
        })
      }
      <div className="lastupdated">{data.data.attributes.updatedAt}</div> 
    </div>
  )
}

export default SimplePage



