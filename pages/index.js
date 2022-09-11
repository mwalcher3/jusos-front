import React, { useState } from 'react'
import { global } from './_app'
import Description from '../components/Description'
import Slider from '../components/Slider'
import Layout from '../components/layout-components/Layout'
import Slideshow from '../components/Slideshow'

import fs from "fs"
import path from "path"


export const getStaticProps = async () => {

  // fetch page data proper
  const endpoint = "/home-page"
  const pageData = await fetch(`${global.fetchURI}${endpoint}?populate=*`);
  const pageJson = await pageData.json()

  // there are no deep relations on home-page
  const pageJsonFull = pageJson

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
      pageData: pageJsonFull
    },
    revalidate: 30,
  }
}

export default function Home({ menuData, pageData  }) {

  const attributes = pageData.data.attributes

  return (
    <div>
      <Layout menuData={menuData}>
        <Slideshow data={attributes.slideShowImages} />
        <Description data={attributes.aboutUs} />
        {<Slider data={attributes.sliders} />}
      </Layout>

    </div>

  )
}


