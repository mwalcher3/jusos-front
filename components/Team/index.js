import React from 'react'
import {global} from '../../pages/_app'
import teamcss from "../../styles/component-modules/team.module.scss"
import Image from 'next/image'
import Sprecherkreis from '../SprecherKreis'

const Team = ({data}) => {
  console.log(data);
    const dataAttributes= data.data.attributes


    const sprecher= ["hello"]
    const otherMembers= ["hello"]

    data.memData.forEach((item)=>{
        if (item.attributes.Rolle=="Sprecher"){
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
          src={`${global.host}${dataAttributes.image.data.attributes.url}`}
          alt={`${global.host}${dataAttributes.image.data.attributes.alternativeText}`}
          layout="fill"
          objectFit="cover"
          objectPosition="50% 5%"
          priority
      />
        </div>

        <Sprecherkreis data={sprecher}/>
    </div>
  )
}

export default Team