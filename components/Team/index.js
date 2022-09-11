import React from 'react'
import {global} from '../../pages/_app'
import teamcss from "../../styles/component-modules/team.module.scss"
import Image from 'next/image'
import Link from "next/link"
import Sprecherkreis from '../SprecherKreis'

const Team = ({data}) => {

    const dataAttributes= data.data.attributes
    const alternativeImage= dataAttributes.alternativeImage.data.attributes

    const sprecher= []
    const otherMembers= []

    dataAttributes.members.data.forEach((item)=>{
        if (item.attributes.role=="Sprecher"){
            sprecher.push(item)
        }
        else{
            otherMembers.push(item)
        }
    })


  return (
    <div className="container">
        <div className="mainimage">
        <Image
          src={`${global.host}${dataAttributes.image.data.attributes.formats.large.url}`}
          alt={`${global.host}${dataAttributes.image.data.attributes.alternativeText}`}
          layout="fill"
          objectFit="cover"
          objectPosition="50% 5%"
          priority
      />
        </div>
        <h1>{dataAttributes.title}</h1>

        <h2>Sprecher*innenkreis</h2>
        <p className={teamcss.description}>{dataAttributes.sprecherDescription}</p>

        <Sprecherkreis data={sprecher} alternativeImage={alternativeImage}/>

        <h2>Zusaezliche Positionen</h2>

        <ul className={teamcss.description}>
          {dataAttributes.otherRolesDescription.map((item, index)=>{
            return(
              <li key={index}>
                <span>
                  {item.Title}
                </span>
                  {` ${item.Paragraph}`}
              </li>
            )
          })}
        </ul>

        <section className={teamcss.othermembers}>
          {otherMembers.map((item, index)=>{
            const previewImage= item.attributes.previewImage.data;

             return(
              <div key={index}>
            <div className={teamcss.squareimages}>
                {<Image
                src={`${global.host}${previewImage!=null?previewImage.attributes.url : alternativeImage.url}`}
                alt={`image of a person`}
                layout="fill"
                objectFit="cover"
                priority
              />}
          </div>
         <h4>{item.attributes.Name}</h4>
         </div>
          )
          })}
          </section>
      <div className="lastupdated">{dataAttributes.updatedAt}</div>
    </div>
  )
}

export default Team