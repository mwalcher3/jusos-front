import React from 'react'
import {useRouter} from 'next/router'
import Head from 'next/head'

// font awsome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import '../styles/globals.scss'
import '../styles/color.mode.scss'
import '../styles/globalelements.scss'
import Script from 'next/script'

function MyApp({ Component, pageProps}) {

  const router = useRouter();

  if(router.query.code) {
    fetch(`api/zoomJWT`,{
      method:"POST",
      body: router.query.code
    })
  }

  return(
    <>
    <Head>
        <title>Jusos Heidelberg</title>
      </Head>
  <Script src="/javascript/initialColorMode.js" strategy="beforeInteractive" />
  <Component {...pageProps} />
  </>
  
  )
}

export default MyApp

// variables and functions used globaly


export const global= {
  fetchURI: "https://content.jusoshd.uber.space/api",
  host:"https://content.jusoshd.uber.space",
  endpointSyntax: (item)=>{
    item= item.toLowerCase()

   
    const endpointAltered= 
    item.replace(/ /g, "_").replace(/\*/g, "").replace(/"/g, "").replace(/:/g, "")

    return endpointAltered
  },

}


