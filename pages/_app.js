import React from 'react'
import '../styles/globals.scss'
import '../styles/color.mode.scss'
import '../styles/globalelements.scss'
import Script from 'next/script'

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
    // replaceAll(' ','_' );
  },
}


function MyApp({ Component, pageProps}) {

  return(
    <>
  <Script src="/javascript/initialColorMode.js" strategy="beforeInteractive" />
  <Component {...pageProps} />
  </>
  
  )
}



export default MyApp


