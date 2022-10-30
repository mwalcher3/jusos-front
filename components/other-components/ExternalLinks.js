import React from 'react'
import Link from "next/link"
import extcss from "../../styles/component-modules/external-links.module.scss"
import CopyToClipboard from './CopyToClipboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const ExternalLinks = ({data}) => {
  return (
    <Link href={data.URL}>
    <a target="_blank" className={extcss.externalLinks}>
   {/*<CopyToClipboard textToCopy={data.URL}/>*/}
      {data.displayedTitle}
      <FontAwesomeIcon icon={faArrowRight} />
      </a>
    </Link>
  )
}

export default ExternalLinks