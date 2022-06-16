import React from 'react'
import '../styles/globals.scss'
import '../styles/color.mode.scss'
import Script from 'next/script'


export const global= {
  fetchURI: "https://jusos-content.herokuapp.com/api"
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


