"use client"


import React from 'react'
import Link from "next/link"
import extcss from "@styles/component-modules/external-links.module.scss"
import CopyToClipboard from '@components/other-components/CopyToClipboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const ExternalLinks = ({data}) => {
  const [hover, setHover]= React.useState(-1)

  return(
    <section className={extcss.externalLinkBox}>
    {data.map((item, index)=>{
      
     return (
        <div key={index} className={extcss.externalLinks + " " + (hover!=index? "" :extcss.externalLinksHover)}>
          {item.copyToClipboard!=false? <CopyToClipboard textToCopy={item.URL}/>: <></>}
        <Link 
              href={item.URL}
              target="_blank" 
              onMouseOver={() => { setHover(index) }}
              onMouseOut={() => { setHover(-1) }}
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