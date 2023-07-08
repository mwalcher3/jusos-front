import React from 'react'
import {useRouter} from 'next/router'
import Head from 'next/head'

// font awsome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

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




