import React from 'react'
import Link from "next/link"
import extcss from "../../styles/component-modules/external-links.module.scss"
import CopyToClipboard from './CopyToClipboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const ExternalLinks = ({data}) => {


  return(
    <section className={extcss.externalLinkBox}>
    {data.map((item, index)=>{
      
   const [hover, setHover]= React.useState(false)
     return (
        <div key={index} className={extcss.externalLinks + " " + (hover==false? "" :extcss.externalLinksHover)}>
          {item.copyToClipboard!=false? <CopyToClipboard textToCopy={item.URL}/>: <div></div>}
        <Link 
              href={item.URL}
              target="_blank" 
              onMouseOver={() => { setHover(true) }}
              onMouseOut={() => { setHover(false) }}
          >
    
          {item.displayedTitle}
        {/* <FontAwesomeIcon icon={faArrowRight} />*/}
       </Link>
        </div>
    )
    })}
</section>
  )
  
}

export default ExternalLinks