import {global} from '../../pages/_app'
import articlecss from "../../styles/component-modules/article.module.scss"
import Image from 'next/image'
import Link from 'next/link'
import {useRef, useState, useEffect} from 'react'

const Articles = ({data}) => {

  const articleimages= [
    {url:'Feierbad21.jpg', id: 5}, 
    {url:'Landesparteitag21Menstruationsfreistellung.jpeg', id:1},
    {url:'OBWahlen_Semesterferien.jpg', id: 2},
    {url:'Sharepic_HD_solidarisch_VOL2.png', id: 4},
    {url:'SemesterOpening.jpg', id: 3}]

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
            const image = articleimages[i]
            return(
              <Link key={item.id} href= {`/artikel/${global.endpointSyntax(item.attributes.title)}`} passHref>
            <div  
            className={articlecss.articleboxes}
            ref={el => imageRefs.current[i] = el} >
                
              <div className={articlecss.images}>
                  <Image
                    src={`/articles/${image.url}`}
                    alt="article image"
                    key={image.id}
                    layout='fill'
                    objectFit= 'cover'
                    priority
                  />

                  </div>

                    <div className={articlecss.articletitle}>
                    {item.attributes.Title}
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