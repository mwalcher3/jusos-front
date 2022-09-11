import React from 'react'
import Image from "next/image"
import Link from "next/link"
import {global} from '../../pages/_app'
import skcss from "../../styles/component-modules/sprecherkreis.module.scss"

const SprecherKreis = ({data, alternativeImage}) => {
  return (
    <ul className={skcss.circlecontainer}>
        {data.map((item, index)=>{
            const previewImage= item.attributes.previewImage.data;
            return(
                <li className={skcss.memberboxes} key={index}>

                  <Link href={`/team/${global.endpointSyntax(item.attributes.name)}`} passHref>
                    <div className={skcss.roundimages}>
                    <Image
                        src={`${global.host}${previewImage!=null? previewImage.attributes.url: alternativeImage.url}`}
                        alt={`${global.host}${previewImage!=null? previewImage.attributes.alternativeText: alternativeImage.alternativeText}`}
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                    </div>
                    </Link>

                    <div className={skcss.name}>
                    {item.attributes.Name}
                    </div>
                </li>
            )
        })}
    </ul>
  )
}

export default SprecherKreis