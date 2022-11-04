import React from 'react'
import Link from "next/link"
import extcss from "../../styles/component-modules/external-links.module.scss"
import CopyToClipboard from './CopyToClipboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const ExternalLinks = ({data}) => {
  const [hover, setHover]= React.useState(false)

  return (
    <div className={extcss.externalLinks + " " + (hover==false? "" :extcss.externalLinksHover)}>
      {<CopyToClipboard textToCopy={data.URL}/>}
    <Link href={data.URL}>
    <a target="_blank" 
    onMouseOver={() => { setHover(true) }}
    onMouseOut={() => { setHover(false) }}
    >
      {data.displayedTitle}
      <FontAwesomeIcon icon={faArrowRight} />
      </a>
    </Link>
    </div>
  )
}

export default ExternalLinks