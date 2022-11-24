import React from 'react';
import smembercss from "../../../styles/page-modules/singlemember.module.scss"
import Image from 'next/image'
import { global } from '../../../pages/_app'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";


const SingleMember = ({ data }) => {

  if(data!=null){
  return (
  
    <div className={smembercss.maincontainer}>

       <div className={smembercss.image}>
        <Image
          src={`${global.host}${data.attributes.previewImage.data.attributes.url}`}
          alt={`${global.host}${data.attributes.previewImage.data.alternativeText}`}
          fill
          className="imageCover"
          priority
        />
      </div>
      <h1>{data.attributes.name}</h1>

      <section className={smembercss.roles}>
        <div className={data.attributes.role == "Sprecher" ? "displayBlock" : "none"}>{data.attributes.role}</div>
        <div>{data.attributes.otherRoles}</div>
      </section>


      <ReactMarkdown className="paragraph" rehypePlugins={[rehypeRaw]}>{data.attributes.description}</ReactMarkdown>

      <div className="lastupdated">{data.attributes.updatedAt}</div>
    </div>
  )
  }
  else{
    return(
      <h1>hello</h1>
    )
  }
}

export default SingleMember