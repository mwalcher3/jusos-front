import React, { useState } from 'react'
import { global } from './_app'
import Description from '../components/other-components/Description'
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

  // fetch internalLinks Data
  const internalLinksData = await fetch(`${global.fetchURI}/home-page?populate[internalLinks][populate][0]=image`);
  const internalLinksJson = await internalLinksData.json()


  // there is only one deep relation on home-page
  const pageJsonFull = JSON.parse(
    JSON.stringify(pageJson, (key, value) => {
      switch (key) {
        case "internalLinks": return internalLinksJson.data.attributes.internalLinks
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
      pageData: pageJsonFull
    },
    revalidate: 30,
  }
}

export default function Home({ menuData, pageData }) {
  const attributes = pageData.data.attributes

  return (
    <div>
      <Layout menuData={menuData}>
        <Slideshow data={attributes.slideShowImages} />
        <Description data={attributes.aboutUs} />
        {<Slider data={attributes.sliders} />}
        <InternalLinks data={attributes.internalLinks}/>
        <section className="externalLinksBox">
          {attributes.Links.map((item, index)=>{
            return(
              <ExternalLinks key={index} data={item}/>
            )
          })}
        </section>
       
      </Layout>

    </div>

  )
}


