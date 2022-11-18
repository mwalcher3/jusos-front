import Link from 'next/link'
import SocialMediaIcons from "../../other-components/SocialMediaIcons"
import articlecss from "../../../styles/page-modules/article.module.scss"
import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";

const SingleArticles = ({data}) => {
  if(data!=null){
    return (
      <>
         <div className={articlecss.content}>
          <h2>{data.attributes.title}</h2>
          <section className={articlecss.articletext}>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{data.attributes.article}</ReactMarkdown>
          </section>
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