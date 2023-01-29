import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import currentcss from '../../styles/page-modules/topics.current.module.scss'
import Carousel from "../other-components/Carousel"
import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";


const TopicsCurrent = ({ data }) => {
  const instagramData = data.data.attributes.instagramFeed
  const dataAttributes = data.data.attributes

  return (
    <div className={currentcss.maincontainer}>

      <h1 className="header">{dataAttributes.title}</h1>

      {instagramData.data ? instagramData.data.map((item, id) => {
          let imagesWidth = "350"
          let imagesHeight = "380"

        const patternHashtags= /(#)[\s\S]*?(\s|$)/g
        const patternAccounts= /(@)[\s\S]*?(\s|$)/g
        const patternGenderStar= /(\*)[\s\S]*?(\s|$)/g
          var captionAltered = item.caption.replace(patternHashtags, 
            function(p) {
              return `<span className=${currentcss.blue}>${p}</span>`
          }
        ).replace(patternAccounts, 
          function(p) {
            const endpoint= p.match(/[^@,]/g)
            return `<a target="_blank" href="https://www.instagram.com/${endpoint.join("")}" className=${currentcss.blue}>${p}</a>`
        }
        ).replace(patternGenderStar,
          function(p) {
            const x= p.replace(/\*/g, '')
            return `:${x} `
        }
        )

        

        if (item.media_type == "CAROUSEL_ALBUM") {
          const imageSource = [];

          item.children.data.map((item) => {
            imageSource.push(item.media_url)
          })

          if(imageSource.length == 2){
            imageSource.push(...imageSource)
          }


          let carouselSettings = {
            length: imageSource.length,
            onClick: true,
            automatic: false,
            dataSource: imageSource,
            imageAlt: "instagram image",
            width: imagesWidth,
            height: imagesHeight,
            dots: false,
            boxWidth: `${imagesWidth}px`,
            translationTime: '0.3s',
          }
      


          return (
            <div key={id} className={currentcss.boxes}>
              <section className={currentcss.mediacontainer}>
                <div className={currentcss.images}>
                    <Carousel settings={carouselSettings} />
                </div>
                <Link 
                  className={currentcss.viewOnInsta}
                  target="_blank" 
                  href={item.permalink}>
                  <div>{dataAttributes.instagramLinkTitle}</div>
                </Link>
               </section>
             
              <ReactMarkdown className={item.caption ? currentcss.textboxes : "none"} rehypePlugins={[rehypeRaw]}>
                  {captionAltered}
               </ReactMarkdown>


            </div>
          )
        }

        else{
          return(
          <div key={id} className={currentcss.boxes}>
            <section className={currentcss.mediacontainer}>

            {item.media_type=="VIDEO" ? 
            <video className={currentcss.videos} src={item.media_url}
               controls>       
            </video>
            :  
              <div className={currentcss.images}>
              {<Image
                src={item.media_url}
                alt="Instagram image"
                className="imageContain"
                fill
                priority />}
                </div>
            }
              <Link 
                className={currentcss.viewOnInsta}
                target="_blank" 
                href={item.permalink}>
                <div>{dataAttributes.instagramLinkTitle}</div>
              </Link>
            </section>
              <ReactMarkdown className={item.caption ? currentcss.textboxes : "none"} rehypePlugins={[rehypeRaw]}>
                {captionAltered}</ReactMarkdown>
            </div>
          )

        }

      }) :
        instagramData.error ?
          <><div> Instagram Error {instagramData.error.code} </div>
            <div> {instagramData.error.message} </div></> : ""}
    </div>
  )
}

export default TopicsCurrent