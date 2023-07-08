import {global} from 'jusos.config'

import React from 'react'
import Image from "next/image"
import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";
import textblockcss from '@styles/component-modules/text-block.module.scss'

const TextBlocks = ({data}) => {
  return (
    <div> 
    <h3>{data.title}</h3>
    <div className={data.border? textblockcss.paragraphBorder: ""}>
      <div className={data.image? "pimage": "none"}>
      {data.image ==null ? <div></div>: 
       <Image
            src={`${global.host}${data.image.image.data[0].attributes.url}`}
            alt={data.image.image.data[0].attributes.alternativeText}
            fill
            className="imageCover"
            priority
       />}
      </div>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{data.paragraph}</ReactMarkdown>
  </div>
    </div>
  )
}

export default TextBlocks