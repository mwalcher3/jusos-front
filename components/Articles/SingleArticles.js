import articlecss from "../../styles/article.module.scss"

const SingleArticles = ({singleArticle}) => {
  console.log(singleArticle);
    return (
      <>
         <div className={articlecss.content}>
          <h2>{singleArticle.attributes.Title}</h2>
          <p>{singleArticle.attributes.article}</p>
    </div>
      </>
    )
  }
  
  export default SingleArticles