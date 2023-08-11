import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import footercss from "../../styles/layout-modules/footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faTiktok } from "@fortawesome/free-brands-svg-icons";

const Footer = ({ menuData }) => {
  return (
    <div className={footercss.maincontainer}>
      <div className={footercss.content}>
        <div className={footercss.logocontainer}>
          <Link target="_blank" href={"https://jusos.de/"} passHref>
            <div className={footercss.logos}>
              <Image
                src={`/logos/Jusos_Logo_4c.svg_.png`}
                alt="jusos logo"
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          </Link>

          <Link target="_blank" href={"https://spd-heidelberg.de"} passHref>
            <div className={footercss.logos}>
              <Image
                src={`/logos/LogoSPDHD.png`}
                alt="spd logo"
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          </Link>

          <Link target="_blank" href={"https://www.spd.de/"} passHref>
            <div className={footercss.logos}>
              <Image
                src={`/logos/Spd_Logo.png`}
                alt="jusos Heidelberg logo"
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          </Link>
        </div>

        <div className={footercss.menu}>
          {menuData.data.attributes.items.data.map((item, index) => {
            return (
              <div key={index} className={footercss.tab}>
                <div className={footercss.title}>{item.attributes.title}</div>

                {item.attributes.children.data.map((child, index) => {
                  const itemChildren = child.attributes
                  return (
                    <Link key={index} href={`/${itemChildren.url}`} passHref>
                      <div className={footercss.subtitle}>{itemChildren.title}</div>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className={footercss.socialmedia}>
          <h4>Folge uns</h4>

          <div className={footercss.verticalLine}>
            <div className="verticalLine"></div>
          </div>

          <div className={footercss.socialmedialinks}>
            <Link target="_blank" href={"https://www.instagram.com/jusoshd/?hl=en"} passHref>
              <FontAwesomeIcon icon={faInstagram} />
            </Link>

            <Link target="_blank" href={"https://www.facebook.com/jusos.heidelberg/"} passHref>
              <FontAwesomeIcon icon={faFacebook} />
            </Link>

            <Link target="_blank" href={"https://www.tiktok.com/@jusosheidelberg"} passHref>
              <FontAwesomeIcon icon={faTiktok} />
            </Link>
          </div>
        </div>
        <div className={footercss.horizontalLine}></div>
      </div>
    </div>
  );
};

export default Footer;
