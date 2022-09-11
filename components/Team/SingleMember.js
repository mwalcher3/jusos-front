import React, { useEffect, useRef, useState } from 'react';
import smembercss from "../../styles/component-modules/singlemember.module.scss"
import Image from 'next/image'
import { global } from '../../pages/_app'
import CopyToClipboard from '../CopyToClipboard';

const SingleMember = ({ data }) => {

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
      <h1>{data.attributes.Title}</h1>

      <section className={smembercss.roles}>
        <div className={data.attributes.role == "Sprecher" ? "displayBlock" : "none"}>{data.attributes.role}</div>
        <div>{data.attributes.otherRoles}</div>
      </section>


      <p>{data.attributes.description}</p>

      <h2>Kontakt:</h2>
      {/* <CopyToClipboard textToCopy={data.attributes.email}/> */}

      <div className="lastupdated">{data.attributes.updatedAt}</div>
    </div>
  )
}

export default SingleMember