import Link from 'next/link'
import articlecss from "../../../styles/component-modules/article.module.scss"

const SingleArticles = ({data}) => {

    return (
      <>
         <div className={articlecss.content}>
          <h2>{data.attributes.title}</h2>
          <p>{data.attributes.article}</p>

          <Link href='/artikel'>
          <button >mehr Artikel</button>
          </Link>
      
    </div>
      </>
    )
  }
  
  export default SingleArticles