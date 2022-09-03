import React from 'react'
import {global} from '../../pages/_app'
import teamcss from "../../styles/component-modules/team.module.scss"
import Image from 'next/image'
import Sprecherkreis from '../SprecherKreis'

const Team = ({data}) => {
    const dataAttributes= data.data.attributes
    const alternativeImage= dataAttributes.alternativeImageMembers.data.attributes

    const sprecher= []
    const otherMembers= []

    data.memData.forEach((item)=>{
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
        <p className={teamcss.description}>{dataAttributes.description}</p>

        <Sprecherkreis data={sprecher} alternativeImage={alternativeImage}/>

        <section className={teamcss.othermembers}>
          {otherMembers.map((item, index)=>{
            console.log(item);
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
      
    </div>
  )
}

export default Team