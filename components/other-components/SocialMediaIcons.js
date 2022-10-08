import React from 'react'
import Link from "next/link"
import socialiconscss from "../../styles/component-modules/social-icons.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook, faYoutube, faTwitter, faSpotify, faTiktok} from '@fortawesome/free-brands-svg-icons'

const SocialMediaIcons = ({data}) => {
    const lookUp={
        "Instagram": faInstagram,
        "Facebook": faFacebook,
        "Twitter": faTwitter,
        "Youtube": faYoutube,
        "Spotify": faSpotify,
        "Tiktok": faTiktok
     }

  return (
    <div className={socialiconscss.maincontainer}>
        {data.map((item, index)=>{

            return(
                <div  key={index}>
                    <Link href={item.URL} passHref>
                    <a target="_blank" >
                        <FontAwesomeIcon icon={lookUp[item.type]} />
                      </a>
                     </Link>
                </div>
            )
        })}

    </div>
  )
}

export default SocialMediaIcons