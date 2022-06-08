import articlecss from "../../styles/article.module.scss"

const SingleArticles = ({singleArticle}) => {
  console.log(singleArticle);
    return (
      <>
         <div className={articlecss.content}>
          <h2>{singleArticle.data.attributes.Title}</h2>
          <p>{singleArticle.data.attributes.article}</p>
    </div>
      </>
    )
  }
  
  export default SingleArticles