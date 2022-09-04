import articlecss from "../../styles/component-modules/article.module.scss"

const SingleArticles = ({data}) => {

    return (
      <>
         <div className={articlecss.content}>
          <h2>{data.attributes.Title}</h2>
          <p>{data.attributes.article}</p>
    </div>
      </>
    )
  }
  
  export default SingleArticles