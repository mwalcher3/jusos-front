import React from 'react'
import {global} from '../../pages/_app'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";
import motioncss from "../../styles/page-modules/motion.module.scss"

const Motions = ({data}) => {
    const dataAttributes= data.data.attributes
   
  return (
    <div className="container">
        <h1>{dataAttributes.title}</h1>
        <ReactMarkdown className="paragraph" rehypePlugins={[rehypeRaw]}>{dataAttributes.description}</ReactMarkdown>
        {dataAttributes.documents.data.map((item,index)=>{
            return(
                <Link key={index} href={`${global.host}${item.attributes.url}`}  target="_blank">
                  download hear
                </Link>
            )
        })
       }
    </div>
  )
}

export default Motions