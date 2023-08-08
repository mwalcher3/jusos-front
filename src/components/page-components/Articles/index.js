import { global } from "jusos.config";

import moment from "moment";
import "moment/locale/de";

import ArticleReel from "@components/other-components/ArticleReel";

const Articles = async ({ data }) => {
  // fetch list of articles listed on article page
  const articleListData = await fetch(`${global.fetchURI}/article-page?populate=*`, {
    next: { tags: ["/article-page"] },
  });
  const articleIDList = (await articleListData.json()).data.attributes.articles.data.map(
    (article) => article.id
  );
  // fetch articles
  const articleJson = await Promise.all(
    articleIDList.map(
      async (id) =>
        (
          await (
            await fetch(`${global.fetchURI}/articles/${id}?populate=*`, {
              next: { tags: [`/articles/${id}`] },
            })
          ).json()
        ).data
    )
  );

  const sortedArticles = articleJson.sort(
    (a, b) =>
      new moment(b.attributes.date).format("YYYYMMDD") -
      new moment(a.attributes.date).format("YYYYMMDD")
  );
  return <ArticleReel pageData={data} articles={sortedArticles} />;
};

export default Articles;
