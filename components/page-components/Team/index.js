import React from 'react'
import { global } from '../../../pages/_app'
import teamcss from "../../../styles/page-modules/team.module.scss"
import Image from 'next/image'
import Link from 'next/link'
import Sprecherkreis from '../../other-components/SprecherKreis'
import Introduction from '../../other-components/Introduction'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";

const Team = ({ data }) => {
  const dataAttributes = data.data.attributes
  const alternativeImage = dataAttributes.alternativeImage.data.attributes

  const sprecher = []
  const otherMembers = []

  dataAttributes.members.data.forEach((item) => {
    if (item.attributes.role == "Sprecher" | item.attributes.role == "Sprecherin") {
      sprecher.push(item)
    }
    else {
      otherMembers.push(item)
    }
  })


  return (
    <div className="container">
      <div className="mainimage">
        <Image
          src={`${global.host}${dataAttributes.image.data.attributes.url}`}
          alt={`${global.host}${dataAttributes.image.data.attributes.alternativeText}`}
          fill
          className="imageCover"
          style={{objectPosition: '50% 25%'}}
          quality={100}
          priority
        />
      </div>
      <h1 className="header">Sprecher*innenkreis</h1>


        <Introduction data={dataAttributes.introduction} />

      <Sprecherkreis data={sprecher} alternativeImage={alternativeImage} />

      <h2>Erweiterter Sprecher*innenkreis</h2>

      <section className={teamcss.othermembers}>
        {otherMembers.map((item, index) => {
          const previewImage = item.attributes.previewImage.data;

          return (
            <div className={teamcss.othermember} key={index}>
              <Link href={`/sprecher/${global.endpointSyntax(item.attributes.name)}`} passHref>
                <div className={teamcss.squareimages}>
                  {<Image
                    src={`${global.host}${previewImage != null ? previewImage.attributes.url : alternativeImage.url}`}
                    alt={`image of a person`}
                    fill
                    className="imageCover"
                    priority
                  />}
                </div>
                <section className={teamcss.name}>
                <h4>{item.attributes.name}</h4>
                <h4><ReactMarkdown rehypePlugins={[rehypeRaw]}>{item.attributes.otherRoles}</ReactMarkdown></h4>
              </section>
              </Link>
             
            </div>
          )
        })}
      </section>
    </div>
  )
}

export default Team