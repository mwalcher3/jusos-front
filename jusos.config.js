export const global = {
  // the location of strapi api
  fetchURI:
    process.env.HOST == "local"
      ? "http://localhost:1337/api"
      : "https://content.jusoshd.uber.space/api",
  // the location of other assets 
  host:
    process.env.HOST == "local" ? "http://localhost:1337" : "https://content.jusoshd.uber.space",
  endpointSyntax: (item) => {
    item = item.toLowerCase();

    const endpointAltered = item
      .replace(/ /g, "_")
      .replace(/\*/g, "")
      .replace(/"/g, "")
      .replace(/:/g, "");

    return endpointAltered;
  },
};

import artikel from "@components/page-components/Articles/index";
import SimplePage from "@components/page-components/Simple-page";
import kontakt from "@components/page-components/Contact";
import aktuelles from "@components/page-components/TopicsCurrent";
import schwerpunkte from "@components/page-components/TopicsGeneral";
import sprecher from "@components/page-components/Team/index";
import termine from "@components/page-components/Calendar";
import anträge from "@components/page-components/Motions";
import unsereArbeit from "@components/page-components/Organization";

// the map from [category] slugs to page components ("templates")
export const singleComponents = {
  artikel: artikel,
  kontakt: kontakt,
  aktuelles: aktuelles,
  schwerpunkte: schwerpunkte,
  sprecher: sprecher,
  dummy: SimplePage,
  termine: termine,
  anträge: anträge,
  unsere_arbeit: unsereArbeit,
};

import singleMember from "@components/page-components/Team/SingleMember";
import singleArticles from "@components/page-components/Articles/SingleArticles";

// map from collection type to page component
export const collectionComponents = {
  sprecher: singleMember,
  artikel: singleArticles,
};

// parameterization of collection component types and fetch endpoints

export const collections = [
  {
    parentEndpoint: "/article-page",
    childrenField: "articles",
    collectionEndpoint: "/articles",
    slugField: "title",
  },

  {
    parentEndpoint: "/team-page",
    childrenField: "members",
    collectionEndpoint: "/members",
    slugField: "name",
  },
];
