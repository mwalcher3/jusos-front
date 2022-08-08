import React from 'react'

// font awsome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import '../styles/globals.scss'
import '../styles/color.mode.scss'
import '../styles/globalelements.scss'
import Script from 'next/script'

function MyApp({ Component, pageProps}) {

  return(
    <>
  <Script src="/javascript/initialColorMode.js" strategy="beforeInteractive" />
  <Component {...pageProps} />
  </>
  
  )
}

export default MyApp




// variables and functions used globaly


export const global= {
  fetchURI: "https://jusos-content.herokuapp.com/api",
  endpointSyntax: (item)=>{
    const chars={
      ' ': '_',
      'ä': 'ae',
      'ö': 'oe',
      'ü': 'ue'
    };
    return item.toLowerCase()
    //.replaceAll(' ','_' );
  },

}


