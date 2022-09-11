import React from 'react'
import { useRouter } from 'next/router'
import { global } from './_app'

import artikel from '../components/Articles/index'
import singleArticles from '../components/Articles/SingleArticles'
import Layout from '../components/layout-components/Layout'
import SimplePage from '../components/Simple-page'
import kontakt from '../components/Contact'
import aktuelles from '../components/TopicsCurrent'
import schwerpunkte from '../components/TopicsGeneral'
import team from "../components/Team/index"
import singleMember from "../components/Team/SingleMember"
import kalender from "../components/Calendar"

import fs from "fs"
import path from "path"
import qs from "qs"

// menuData: main menu
// data: page props
// links: footer links

const Slugs = ({ menuData, pageData }) => {

  const router = useRouter();
  const { slug = [] } = router.query;

  const object = {
    artikel: artikel,
    kontakt: kontakt,
    aktuelles: aktuelles,
    schwerpunkte: schwerpunkte,
    team: team,
    dummy: SimplePage,
  }

  const subPagesObject = {
    team: singleMember,
    artikel: singleArticles
  }

  var ComponentName = object[slug[0]]
  var SubComponentName = subPagesObject[slug[0]]

  if (object[slug[0]] == null) {
    if (pageData) {
      return (
        <Layout menuData={menuData}>
          <SimplePage data={pageData} />
        </Layout>
      )
    }
  }
  else {

    if (slug[1]) {
      if (pageData) {
        return (
          <Layout menuData={menuData}>
            <SubComponentName data={pageData.data} />
          </Layout>
        )
      }
      else { return { notFound: true } }
    }

    if (pageData) {
      return (
        <Layout menuData={menuData}>
          <ComponentName data={pageData} />
        </Layout>
      )
    }
  }
}


export default Slugs

export async function getStaticPaths() {

  // the paths (slugs) of pages
  const paths = []
  // the rewrite map from paths to URL endpoints
  const pathsToUrls = {}

  // single page types are listed in menu
  const menuData = await fetch(`${global.fetchURI}/menus/menu?nested`);
  const menuDataJson = await menuData.json();

  // console.log(JSON.stringify(menuDataJson))

  const endpointsToFetch = []
  JSON.stringify(menuDataJson, (key, value) => {
    if (key == "url" && value != "" && !endpointsToFetch.includes(value)) endpointsToFetch.push(value)
    return (value)
  })

  for (let endpoint of endpointsToFetch) {
    const data = await fetch(`${global.fetchURI}${endpoint}?fields[0]=slug`);
    const json = await data.json()
    const slug = [global.endpointSyntax(json.data.attributes.slug)]
    paths.push(slug)
    pathsToUrls[slug] = endpoint
  }

  // (some) collection content types appear as children on specific pages 
  // their full props can be fetched via the collection API endpoint

  const collections = [
    {
      "parentEndpoint": "/article-page", "childrenField": "articles",
      "collectionEndpoint": "/articles", "slugField": "title"
    },
    {
      "parentEndpoint": "/team-page", "childrenField": "members",
      "collectionEndpoint": "/members", "slugField": "name"
    }
  ]

  for (let collection of collections) {
    const query = qs.stringify({
      fields: [`slug`],
      populate: {
        [collection.childrenField]: {
          fields: [`${collection.slugField}`, `id`]
        }
      }
    })

    // const qquery = "fields[0]=slug&populate[articles][fields][0]=title&populate[articles][fields][1]=id"

    const data = await fetch(`${global.fetchURI}${collection.parentEndpoint}?${query}`)
    const json = await data.json()
    // console.log(JSON.stringify(json))
    const slug = json.data.attributes.slug
    const kids = json.data.attributes[collection.childrenField].data
    for (let child of kids) {
      const alias = global.endpointSyntax(child.attributes[collection.slugField])
      const id = child.id
      const childSlug = [`${slug}`, `${alias}`]
      paths.push(childSlug)
      pathsToUrls[childSlug] = `${collection.collectionEndpoint}/${id}`
    }
  }

  // write path to URL lookup table to file cache...
  fs.writeFile(
    path.join(process.cwd(), 'staticstore/pathsToUrls.db'),
    JSON.stringify(pathsToUrls), (err) => { }
  )

  // ... and return fetched slugs as static paths
  const params =
    paths.map((path) => {
      return {
        params: { slug: path }
      }
    })

  return {
    paths: [
      ...params,
    ],
    fallback: 'blocking'
  }
}

export const getStaticProps = async (context) => {

  //note that it is not possible to pass down data from getStaticPaths to 
  // getStaticProps or create a global function to fetch the data

  // we recover the path to URL lookup table from the file
  const pathsToUrls = JSON.parse(fs.readFileSync(
    path.join(process.cwd(), 'staticstore/pathsToUrls.db'), (err) => { }
  ))
  // and also record its inverse
  const urlsToPaths = {}
  JSON.stringify(pathsToUrls, (key, value) => {
    if (key) { urlsToPaths[value] = key }
    return value
  })

  // fetch page data proper
  const endpoint = pathsToUrls[context.params.slug]
  const pageData = await fetch(`${global.fetchURI}${endpoint}?populate=*`);
  const pageJson = await pageData.json()

  // fetch data of subsidiary (or "deep") relations, and external sources...

  // fetch popupData
  const popupData = await fetch(`${global.fetchURI}/popups?populate=*`);
  const popupJson = await popupData.json()

  // fetch memberData
  const memberData = await fetch(`${global.fetchURI}/members?populate=*`);
  const memberJson = await memberData.json()

  // fetch data from instagram api
  const instagramToken = process.env.INSTAGRAM_TOKEN
  const instagramData = await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp,caption,children{media_url}&access_token=${instagramToken}`);
  const instagramJson = await instagramData.json()
  // const instaData = instagramJson.data

  // ... and rewrite pageJson accordingly

  const pageJsonFull = JSON.parse(
    JSON.stringify(pageJson, (key, value) => {
      switch (key) {
        case "popups": {
          // const popupData = await fetch(`${global.fetchURI}/popups?populate=*`);
          // const popupJson = await popupData.json()
          return popupJson
        }
        case "members": return memberJson
        case "instagramFeed": return instagramJson
        default: return value
      }
    }
    ))

  // fetch menu data
  const menuData = await fetch(`${global.fetchURI}/menus/menu?nested`);
  const menuJson = await menuData.json();
  // and replace url endpoint with corresponding slug
  const menuJsonFull = JSON.parse(
    JSON.stringify(menuJson, (key, value) => {
      if (key == "url" && value != "") return urlsToPaths[value]
      return value
    })
  )

  // slugs.forEach((item, index) => {
  //   links[endpointsToFetch[index]] = item;
  // })

  //push the data of the nested pages into the rewrite object

  //first array with the article data
  // slug1[0].forEach((item) => {
  //   rewrite[[`artikel`, `${global.endpointSyntax(item.attributes.Title)}`]] = item;
  // })

  //second data with the team data
  // slug1[1].forEach((item) => {
  //   rewrite[[`team`, `${global.endpointSyntax(item.attributes.Title)}`]] = item;
  // })


  // const displayedSlug = context.params.slug;
  // const data = rewrite[displayedSlug];

  //return 404 page if the displayedSlug does not refer a any data,
  //this is because fallback is set to 'blocking' in the getStaticPaths function

  if (!pageData) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      menuData: menuJsonFull,
      pageData: pageJsonFull
    },
    revalidate: 30,
  }
}

