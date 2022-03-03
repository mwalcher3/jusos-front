import articlecss from "../../styles/article.module.scss"
import Link from 'next/link'
import { useEffect, useRef} from "react"


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

   /* const options={
      threshold: 0,
    }

    const callbackFunction=(entries)=>{
      entries.forEach((entry)=>{
        console.log(entry)
      })
    }

    useEffect(()=>{

      const observer= new IntersectionObserver(callbackFunction,options)

        observer.observe(articleRef.current)
    
    },[])*/
  

    
    return (
      <>
  <div className={articlecss.grid} >
  <h1 className={articlecss.pagetitle}>Artikel</h1>

      {
          article.data.map((item)=>{
              return(
            <div key={item.id} className={articlecss.articleboxes}>
            {articleimages.map((image, index)=>{
              if(item.id==image.id){
                 return(
                 <img src={`/articles/${image.url}`}
                 key={image.id}alt="image" 
                 className={articlecss.images}/>
              )}
              })}
                <Link href= {`./articles/${item.id}`}>
                    <div className={articlecss.articletitle}>
                    {item.attributes.Title}
                    </div>
                 </Link>
                 <div className={articlecss.articledate}>
                   {item.attributes.date}
                 </div>
            </div>
              )
          })
      }

      </div>
      </>
    )
}

export default Articles