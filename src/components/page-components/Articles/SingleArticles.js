import { global } from "@/jusos.config";

import Link from "next/link";
import SocialMediaIcons from "@components/other-components/SocialMediaIcons";
import articlecss from "@styles/page-modules/article.module.scss";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Image from "next/image";

const SingleArticles = ({ data }) => {
  if (data != null) {
    return (
      <>
        <div className={articlecss.content}>
          <h2>{data.attributes.title}</h2>
          <section className={articlecss.articletext}>
            {data.attributes.image.data != null ? (
              <Image
                src={`${global.host}${data.attributes.image.data.attributes.url}`}
                alt={data.attributes.image.data.attributes.alternativeText}
                className={articlecss.textimage}
                fill
                priority
              />
            ) : (
              <></>
            )}
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{data.attributes.text}</ReactMarkdown>
          </section>

          <div className={articlecss.socialMedia}>
            <SocialMediaIcons data={data.attributes.socialMediaLinks} />
          </div>
          <Link href="/artikel" passHref>
            <button className="moreButton">mehr Artikel</button>
          </Link>
        </div>
      </>
    );
  }
};

export default SingleArticles;
