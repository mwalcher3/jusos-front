import React from 'react'
import {global} from '../../pages/_app'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import motioncss from "../../styles/page-modules/motion.module.scss"

const Motions = ({data}) => {
    const dataAttributes= data.data.attributes
   
  return (
    <div className="container">
        <h1 className='header'>{dataAttributes.title}</h1>
        <ReactMarkdown className="paragraph" rehypePlugins={[rehypeRaw]}>{dataAttributes.description}</ReactMarkdown>
        {dataAttributes.motion_types.data.map((item,index)=>{
      
            return(
              <section key={index} className={motioncss.typescontainer}>
                <h2>{item.attributes.title}</h2>

                <ul>
                {item.attributes.motion.map((motion, index)=>{
                  return(
                    <li key={index}>
                      <Link 
                      className={motioncss.documentsbox} 
                      href={`${global.host}${motion.document.data.attributes.url}`}  
                      target="_blank">
                          <h3>{motion.title} <FontAwesomeIcon icon={faFile} /></h3>
                    </Link>
                   </li>
                  )
                })}
                </ul>

                <div className="horizontalLine"></div>
             </section>    
            )
        })
      }
    </div>
  )
}



export default Motions