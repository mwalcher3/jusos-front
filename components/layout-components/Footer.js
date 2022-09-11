import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import footercss from '../../styles/layout-modules/footer.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'



const Footer = ({ menuData }) => {
  return (
    <div className={footercss.maincontainer}>
      <div className={footercss.content}>

        <div className={footercss.menu} >
          {menuData.menu.items.map((item, index) => {
            return (
              <div key={index} className={footercss.tab}>

                <div className={footercss.title}>
                  {item.title}
                </div>

                {item.children.map((itemChildren, index) => {
                  return (
                    <Link key={index} href={`/${itemChildren.url}`} passHref>
                      <div className={footercss.subtitle}>
                        {itemChildren.title}
                      </div>
                    </Link>
                  )
                })}
              </div>
            )
          })}
        </div>

        <div className="horizontalLine"></div>

        <div className={footercss.lowercontainer}>
          <div className={footercss.logocontainer}>

            <div className={footercss.logos + " " + footercss.heidelberglogo}>
              <Image
                src={`/Jusos_Heidelberg_Logo.png`}
                alt="jusos Heidelberg logo"
                layout='fill'
                //objectFit= 'cover'
                priority
              />
            </div>

            <Link href={"https://jusos.de/"} passHref>
              <div className={footercss.logos}>
                <Image
                  src={`/Jusos_Logo_4c.svg_.png`}
                  alt="jusos logo"
                  layout='fill'
                  objectFit='contain'
                  priority
                />
              </div>
            </Link>

            <Link href={"https://spd.de"} passHref>
              <div className={footercss.logos}>
                <Image
                  src={`/Spd_Logo.png`}
                  alt="spd logo"
                  layout='fill'
                  objectFit='contain'
                  priority
                />
              </div>
            </Link>


          </div>

          <div className={footercss.socialmedia}>
            <h4>Folge uns</h4>

            <div className={footercss.verticalLine}>
              <div className="verticalLine"></div>
            </div>

            <div className={footercss.socialmedialinks}>

              <Link href={"https://www.instagram.com/jusoshd/?hl=en"} passHref>
                <FontAwesomeIcon icon={faInstagram} />
              </Link>

              <Link href={"https://www.facebook.com/jusos.heidelberg/"} passHref>
                <FontAwesomeIcon icon={faFacebook} />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>

  )
}

export default Footer