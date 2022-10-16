import React from 'react'
import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {global} from '../../pages/_app'
import intcss from "../../styles/component-modules/internal-links.module.scss"

const InternalLinks = ({data}) => {
  return (
    <section className={intcss.internalLinkBox}>
            {data.map((item, index)=>{
            const image= item.image.data.attributes

            return(
              <section key={index} className={intcss.internalLinks}>
            <Link  href={item.URL}>
              <div>
                <div className={intcss.images}>
                {<Image
                      src={`${global.host}${image.url}`}
                      alt={image.alternativeText}
                      layout="fill"
                      objectFit="cover"
                      priority
                />}
              </div>
              <div className={intcss.textarrow}>
              <h4>{item.displayedText}</h4>
              <FontAwesomeIcon icon={faArrowRight} />
                </div>
                <p>{item.description}</p>
                </div>
              </Link>
                </section>
            )
          })}
          </section>
    )
}

export default InternalLinks