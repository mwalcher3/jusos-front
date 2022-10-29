import Link from 'next/link'
import SocialMediaIcons from "../../other-components/SocialMediaIcons"
import articlecss from "../../../styles/component-modules/article.module.scss"

const SingleArticles = ({data}) => {
  console.log(data);

  if(data!=null){
    return (
      <>
         <div className={articlecss.content}>
          <h2>{data.attributes.title}</h2>
          <p>{data.attributes.article}</p>
          <div className={articlecss.socialMedia}>
            <SocialMediaIcons data={data.attributes.socialMediaLinks}/>
          </div>
          <Link href='/artikel' passHref>
          <button className={articlecss.moreArticles}>mehr Artikel</button>
          </Link>
      
    </div>
      </>
    )
  }

}
  
  export default SingleArticles