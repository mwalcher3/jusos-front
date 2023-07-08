import { global } from "@/jusos.config";

import moment from "moment";
import "moment/locale/de";

import ArticleReel from "@components/other-components/ArticleReel";

const Articles = async ({ data }) => {
  // fetch articleData
  const articleData = await fetch(
    `${global.fetchURI}/articles?populate=*&pagination[start]=0&pagination[limit]=100000`
  );
  const articleJson = await articleData.json();

  const sortedArticles = articleJson.data.sort(
    (a, b) =>
      new moment(b.attributes.date).format("YYYYMMDD") -
      new moment(a.attributes.date).format("YYYYMMDD")
  );

  return <ArticleReel pageData={data} articles={sortedArticles} />;
};

export default Articles;
