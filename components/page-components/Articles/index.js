import {global} from '../../../pages/_app'
import articlecss from "../../../styles/component-modules/article.module.scss"
import Image from 'next/image'
import Link from 'next/link'
import {useRef, useState, useEffect} from 'react'

const Articles = ({data}) => {

  const imageRefs= useRef([]);
  const scrollContainer= useRef();
  const [scroll, setScroll]= useState(scrollContainer.current)
  
  
  useEffect(()=>{
      const options={
        root: scroll,
        threshold: .3,
      }

      const observer  = new IntersectionObserver((entries) =>{
        entries.map((entry,i)=> {
          if(entry.isIntersecting) { 
          entry.target.classList.remove(articlecss.hidden)
          }
          else
          {
            entry.target.classList.add(articlecss.hidden)
          }
        }
        )
      },options)

     imageRefs.current.map((image,i) => {
        observer.observe(imageRefs.current[i])
      })
    },)  
     
    return (
      <div>
    <div className={articlecss.grid}  ref={scrollContainer}>
    <h1 className={articlecss.pagetitle}>Artikel</h1>

      {
          data.data.attributes.articles.data.map((item, i)=>{
            console.log(item);
            return(
          <Link key={item.id} href={`./artikel/${global.endpointSyntax(item.attributes.title)}`} passHref>
            <div  
            className={articlecss.articleboxes}
            ref={el => imageRefs.current[i] = el} >
                
              <div className={articlecss.images}>
                <Image
                    src={`${global.host}${item.attributes.image.data.attributes.url}`}
                    alt={`${global.host}${item.attributes.image.data.attributes.alternativeText}`}
                    layout='fill'
                    objectFit= 'cover'
                    priority
              />

                  </div>

                    <div className={articlecss.articletitle}>
                    {item.attributes.title}
                    </div>

                 <div className={articlecss.articledate}>
                   {item.attributes.date}
                 </div>
            </div>
            </Link>
              )
          })
      }


      </div>
      </div>
    )
}

export default Articles