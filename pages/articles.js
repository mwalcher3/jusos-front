import articlecss from "../styles/article.module.css"
import {useState} from "react"


export const getStaticProps= async ()=>{
    const res= await fetch(`https://jusos-content.herokuapp.com/api/articles`)
    const json= await res.json()
    
    return {
      props: {article: json,
      }
    }
  }

const articles = ({article}) => {
    console.log(article)
    const [active, setActive]= useState(-1)
    
    return (
        <div>
            {article.data.map((item,index)=>{
                return(
                    <div key= {item.id} className={active== index? articlecss.content2: articlecss.content}>
                        <h2><a className={active== index? articlecss.title2: articlecss.title} onClick={()=>{active == index? setActive(-1): setActive(index)}} >
                                 {item.attributes.Title}</a></h2>
                        <div><p className={active== index? articlecss.text2: articlecss.text }> {item.attributes.article}</p></div>
                    </div>
                )
            })}
        </div>
    )
}

export default articles