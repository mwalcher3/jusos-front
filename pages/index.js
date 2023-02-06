import React, { useState } from 'react'
import { global } from './_app'
import Introduction from '../components/other-components/Introduction'
import Slider from '../components/other-components/Slider'
import Slideshow from '../components/other-components/Slideshow'
import ExternalLinks from '../components/other-components/ExternalLinks'
import InternalLinks from '../components/other-components/InternalLinks'
import Layout from '../components/layout-components/Layout'

import fs from "fs"
import path from "path"



export const getStaticProps = async () => {

  // fetch page data proper
  const endpoint = "/home-page"
  const pageData = await fetch(`${global.fetchURI}${endpoint}?populate=*`);
  const pageJson = await pageData.json()

  // fetch slider and internalLinks data seperately, because the slider data cannot be put in the JSON stringify
  const extraData = await fetch(`${global.fetchURI}/home-page?populate[internalLinks][populate][0]=image&populate[slider][populate][0]=articles&populate[slider][populate][1]=calendar_entries&populate[slider][populate][2]=topics&populate[slider][populate][3]=meeting_types&populate[slider][populate][4]=quotes`);
  const extraJson = await extraData.json()

  const token= process.env.INSTAGRAM_TOKEN
  const instagramData = await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,username,timestamp,caption,children{media_url}&limit=1&access_token=${token}`);
  const instagramJson = await instagramData.json()


  // there is only one deep relation on home-page
  const pageJsonFull = JSON.parse(
    JSON.stringify(pageJson, (key, value) => {
      switch (key) {
        case "sliderInstagram": return instagramJson
        default: return value
      }
    }
    ))

  // we retrieve path to URL lookup table from file generated
  // by getStaticPaths method of [..slug].js
  // NOTE: this file is written/updated at build time _before_ the home page
  const pathsToUrls = JSON.parse(fs.readFileSync(
    path.join(process.cwd(), 'staticstore/pathsToUrls.db'), (err) => { }
  ))
  // and also record its inverse
  const urlsToPaths = {}
  JSON.stringify(pathsToUrls, (key, value) => {
    if (key) { urlsToPaths[value] = key }
    return value
  })

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

  return {
    props: {
      menuData: menuJsonFull,
      pageData: pageJsonFull,
      extraData: extraJson
    },
    revalidate: 30,
  }
}

export default function Home({ menuData, pageData, extraData }) {
  const attributes = pageData.data.attributes
  const extraAttributes = extraData.data.attributes

  return (
    <div>
      <Layout menuData={menuData}>
        <Slideshow data={attributes.slideShowImages} smallScreenData={attributes.slideShowSmallScreens}/>
        <Introduction data={attributes.introduction} />
        <Slider data={extraAttributes.slider} instaData={attributes.slider.sliderInstagram}/>
        <InternalLinks data={extraAttributes.internalLinks}/>
        <ExternalLinks data={attributes.externalLinks}/>
      </Layout>

    </div>

  )
}


