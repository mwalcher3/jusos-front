import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { global } from './_app'

import artikel from '../components/page-components/Articles/index'
import singleArticles from '../components/page-components/Articles/SingleArticles'
import Layout from '../components/layout-components/Layout'
import SimplePage from '../components/page-components/Simple-page'
import kontakt from '../components/page-components/Contact'
import aktuelles from '../components/page-components/TopicsCurrent'
import schwerpunkte from '../components/page-components/TopicsGeneral'
import team from "../components/page-components/Team/index"
import singleMember from "../components/page-components/Team/SingleMember"
import kalender from "../components/page-components/Calendar"
import anträge from "../components/page-components/Motions"
import zoom from "../components/page-components/Zoom"

import fs from "fs"
import path from "path"
import qs from "qs"
import KJUR from 'jsrsasign'

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
    kalender: kalender,
    anträge: anträge,
    zoom: zoom,
  }

  const subPagesObject = {
    team: singleMember,
    artikel: singleArticles
  }

  var ComponentName = object[slug[0]]
  var SubComponentName = subPagesObject[slug[0]]

  if (object[slug[0]] == null) {
    if(pageData.data!= null){
      return (
        <Layout menuData={menuData}>
          <SimplePage data={pageData} />
        </Layout>
      )
    }
  }
  else {
    if (slug[1]) {
      if(pageData){
        return (
          <Layout menuData={menuData}>
            <SubComponentName data={pageData.data} />
          </Layout>
        )
      }
    }

    if(pageData){
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
  const meetingTypesData = await fetch(`${global.fetchURI}/meeting-types?populate=*`);
  const meetingTypesJson = await meetingTypesData.json()

  // fetch memberData
  const memberData = await fetch(`${global.fetchURI}/members?populate=*`);
  const memberJson = await memberData.json()

  // fetch articleData
  const articleData = await fetch(`${global.fetchURI}/articles?populate=*`);
  const articleJson = await articleData.json()

   // fetch calendar entries data
   const calendarData = await fetch(`${global.fetchURI}/calendar-entries?populate=*`);
   const calendarJson = await calendarData.json()
  
  // fetch data from instagram api
  const token= process.env.INSTAGRAM_TOKEN
  const instagramData = await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp,caption,children{media_url}&access_token=${token}`);
  const instagramJson = await instagramData.json()
  // const instaData = instagramJson.data


  //generate json web token for zoom sdk
   // https://www.npmjs.com/package/jsrsasign

   

   function generateSignature(sdkKey, sdkSecret, meetingNumber, role) {

    const iat = Math.round((new Date().getTime() - 30000) / 1000)
    const exp = iat + 60 * 60 * 2
    const oHeader = { alg: 'HS256', typ: 'JWT' }

    const oPayload = {
      sdkKey: sdkKey,
      mn: meetingNumber,
      role: role,
      iat: iat,
      exp: exp,
      appKey: sdkKey,
      tokenExp: iat + 60 * 60 * 2
    }

    ///users/{userId}/meetings

    const sHeader = JSON.stringify(oHeader)
    const sPayload = JSON.stringify(oPayload)
    const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret)
    return sdkJWT
  }
  const meetingId=  5011974152

  const generatedSignature = generateSignature(process.env.ZOOM_SDK_KEY, process.env.ZOOM_SDK_SECRET, meetingId, 0)
  const zoomJson = { signature : generatedSignature } 

  // ... and rewrite pageJson accordingly

  const pageJsonFull = JSON.parse(
    JSON.stringify(pageJson, (key, value) => {
      switch (key) {
        case "meetingTypes": {
          // const popupData = await fetch(`${global.fetchURI}/popups?populate=*`);
          // const popupJson = await popupData.json()
          return meetingTypesJson
        }

        /* case "field name in stratpi in wich the json will be pushedd" :return extra json fetched */
        case "members": return memberJson
        case "instagramFeed": return instagramJson
        case "zoomMeeting": return  zoomJson
        case "articles": return articleJson
        case "calendar_entries" : return calendarJson
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
