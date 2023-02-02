import React from "react";
import Image from "next/image";
import Link from "next/link";
import currentcss from "../../styles/page-modules/topics.current.module.scss";
import Carousel from "../other-components/Carousel";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import moment from 'moment';
import 'moment/locale/de';
import {useEffect} from "react";

const TopicsCurrent = ({ data }) => {
  const instagramData = data.data.attributes.instagramFeed;
  const dataAttributes = data.data.attributes;

  useEffect(() => {
    instagramData.data.map((item,id) => {
      if ( item.media_type == "CAROUSEL_ALBUM") { 
        const first = item.children.data[0];
        let album = document.getElementById("album"+first.id)
        let firstImg = document.getElementById(first.id+"0")
        let desiredHeight = firstImg.naturalHeight;
        album.style.height = desiredHeight+"px";
        let albumLength = item.children.data.length;
        if(albumLength ==2) { albumLength = 2*albumLength }
        for (let i = 0; i < albumLength; i++) { 
          document.getElementById(first.id + i).style.height=desiredHeight+"px";
        }
      }
      else if(item.media_type == "IMAGE"){
        const singleImage= document.getElementById("singleImage"+id)
        console.log(singleImage);
        console.log(singleImage.naturalHeight);
        singleImage.style.height=singleImage.naturalHeight+"px"
      }
    })
  },[])

  return (
    <div className={currentcss.maincontainer}>
      <h1 className="header">{dataAttributes.title}</h1>

      {instagramData.data ? (
        instagramData.data.map((item, id) => {
          let imagesWidth = "375";
          let imagesHeight = "380";

          moment.locale('de')
          let m= moment(item.timestamp, moment.ISO_8601)
          let formatedTimestamp= m.format("DD. MMMM YYYY, H U[h]r") 

          const patternHashtags = /(#)[\s\S]*?(\s|$)/g;
          const patternAccounts = /(@)[\s\S]*?(\s|$)/g;
          const patternGenderStar = /(\*)[\s\S]*?(\s|$)/g;
          var captionAltered = item.caption
            .replace(patternHashtags, function (p) {
              return `<span className=${currentcss.blue}>${p}</span>`;
            })
            .replace(patternAccounts, function (p) {
              const endpoint = p.match(/[^@,]/g);
              return `<a target="_blank" href="https://www.instagram.com/${endpoint.join(
                ""
              )}" className=${currentcss.blue}>${p}</a>`;
            })
            .replace(patternGenderStar, function (p) {
              const x = p.replace(/\*/g, "");
              return `:${x} `;
            });

          if (item.media_type == "CAROUSEL_ALBUM") {
            const imageSource = [];
            const albumId = item.children.data[0].id 

            item.children.data.map((item) => {
              imageSource.push(item.media_url);
            });

            if (imageSource.length == 2) {
              imageSource.push(...imageSource);
            }

            let carouselSettings = {
              length: imageSource.length,
              onClick: true,
              automatic: false,
              dataSource: imageSource,
              imageAlt: "instagram image",
              firstId: albumId,
              width: imagesWidth,
              height: imagesHeight,
              dots: false,
              boxWidth: `${imagesWidth}px`,
              translationTime: "0.3s",
            };

            return (
              <div key={id} className={currentcss.boxes}>
                <section className={currentcss.mediacontainer}>
                  <div className={currentcss.images} id={"album"+albumId}>
                    <Carousel settings={carouselSettings} />
                  </div>
                  <Link
                    className={currentcss.viewOnInsta}
                    target="_blank"
                    href={item.permalink}
                  >
                    <div>{dataAttributes.instagramLinkTitle}</div>
                  </Link>
                </section>

                <section className={item.caption ? currentcss.textboxes : "none"}>
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                >
                  {captionAltered}
                </ReactMarkdown>
                {formatedTimestamp}
                </section>
              </div>
            );
          } else {
            return (
              <div key={id} className={currentcss.boxes}>
                <section className={currentcss.mediacontainer}>
                  {item.media_type == "VIDEO" ? (
                    <video
                      className={currentcss.videos}
                      src={item.media_url}
                      controls
                    ></video>
                  ) : (
                    <div className={currentcss.images}>
                      {
                        <Image
                          id={"singleImage"+id}
                          src={item.media_url}
                          alt="Instagram image"
                          height= {50}
                          width={375}
                          priority
                        />
                      }                   
                    </div>
                  )}
                  <Link
                    className={currentcss.viewOnInsta}
                    target="_blank"
                    href={item.permalink}
                  >
                    <div>{dataAttributes.instagramLinkTitle}</div>
                  </Link>
                </section>

                <section  className={item.caption ? currentcss.textboxes : "none"}>
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                >
                  {captionAltered}
                </ReactMarkdown>
                {formatedTimestamp}
                </section>
              </div>
            );
          }
        })
      ) : instagramData.error ? (
        <>
          <div> Instagram Error {instagramData.error.code} </div>
          <div> {instagramData.error.message} </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default TopicsCurrent;
