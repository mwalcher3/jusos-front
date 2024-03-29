import {global} from '../../../pages/_app'
import articlecss from "../../../styles/page-modules/article.module.scss"
import moment from 'moment';
import 'moment/locale/de';
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
    
    const sortedArticles  =  data.data.attributes.articles.data.sort((a,b) => new moment(b.attributes.date).format('YYYYMMDD') - new moment(a.attributes.date).format('YYYYMMDD') )

    return (
      <div ref={scrollContainer}>
      <h1 className="header">{data.data.attributes.title}</h1>
    <div className={articlecss.grid}  >

      {
          sortedArticles.map((item, i)=>{
              moment.locale('de')
              let m= moment(item.attributes.date, moment.ISO_8601)
              let formatedDate= m.format("DD MMMM YYYY") 

              return(
                <Link key={item.id} href={`./artikel/${global.endpointSyntax(item.attributes.title)}`} passHref>
                  <div  
                  className={articlecss.articleboxes}
                  ref={el => imageRefs.current[i] = el} >
                    {item.attributes.image.data!=null? 
                      <div className={articlecss.images}> 
                    <Image
                        src={`${global.host}${item.attributes.image.data.attributes.url}`}
                        alt={`${global.host}${item.attributes.image.data.attributes.alternativeText}`}
                        className="imageCover"
                        fill
                        priority
                  />
                    
      
                  </div>
                  :<div></div>
                  }
                          <div className={articlecss.articletitle + " " + (item.attributes.image.data!=null? " " : articlecss.articletitlenoimage)}>
                          {item.attributes.title}
                          </div>
      
                       <div className={articlecss.articledate}>
                         {formatedDate}
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