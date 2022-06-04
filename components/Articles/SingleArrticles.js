import articlecss from "../../styles/article.module.scss"

const SingleArrticles = ({data}) => {
    return (
      <div>
          <div className={articlecss.content}>
          <h2>{data.data.attributes.Title}</h2>
          <p>{data.data.attributes.article}</p>
          </div>
      </div>
    )
  }
  
  export default SingleArrticles