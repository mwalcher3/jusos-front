import React from 'react'
import '../styles/globals.scss'
import '../styles/color.mode.scss'
import Layout from '../components/Layout'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {


  return(
    <>
  <Layout>
  <Script src="/javascript/initialColorMode.js" strategy="beforeInteractive" />
  <Component {...pageProps} />
  </Layout>
  </>
  
  )
}

export default MyApp
