import articlecss from "../../styles/article.module.scss"
import Image from 'next/image'
import Link from 'next/link'
import {useRef, useState, useEffect} from 'react'


export const getStaticProps= async ()=>{
    const res= await fetch(`https://jusos-content.herokuapp.com/api/articles`)
    const json= await res.json()

    
    return {
      props: {article: json,
      }
    }
  }

const Articles = ({article}) => {

  const articleimages= [
    {url:'Feierbad21.jpg', id: 5}, 
    {url:'Landesparteitag21Menstruationsfreistellung.jpeg', id:1},
    {url:'OBWahlen_Semesterferien.jpg', id: 2},
    {url:'Sharepic_HD_solidarisch_VOL2.png', id: 4},
    {url:'SemesterOpening.jpg', id: 3}]

  const imageRefs= useRef([]);
  const scrollContainer= useRef();
  const [scroll, setScroll]= useState(scrollContainer.current)
  
  
//  const initialIntersections = Array(articleimages.length).fill(false)
//  const [intersections, setIntersections] =useState(initialIntersections)

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
          article.data.map((item, i)=>{
            const image = articleimages[i]
            return(
            <div key={item.id} 
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
               {<Link href= {`./articles/${item.id}`}>
                    <div className={articlecss.articletitle}>
                    {item.attributes.Title}
                    </div>
            </Link>}
                 <div className={articlecss.articledate}>
                   {item.attributes.date}
                 </div>
            </div>
              )
          })
      }


      </div>
      </div>
    )
}

export default Articles