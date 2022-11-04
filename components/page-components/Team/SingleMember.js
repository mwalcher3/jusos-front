import React from 'react';
import smembercss from "../../../styles/page-modules/singlemember.module.scss"
import Image from 'next/image'
import { global } from '../../../pages/_app'

const SingleMember = ({ data }) => {

  if(data!=null){
  return (
  
    <div className={smembercss.maincontainer}>

       <div className={smembercss.image}>
        <Image
          src={`${global.host}${data.attributes.previewImage.data.attributes.url}`}
          alt={`${global.host}${data.attributes.previewImage.data.alternativeText}`}
          layout="fill"
          objectFit="cover"
          objectPosition="50% 5%"
          priority
        />
      </div>
      <h1>{data.attributes.name}</h1>

      <section className={smembercss.roles}>
        <div className={data.attributes.role == "Sprecher" ? "displayBlock" : "none"}>{data.attributes.role}</div>
        <div>{data.attributes.otherRoles}</div>
      </section>


      <p>{data.attributes.description}</p>

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