import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1"/>
      <link rel="manifest" href="/manifest/manifest.json"/>
      <link rel="icon" type="image/png" href="/Jusos_Heidelberg_Logo.png"/>
       </Head>
      <body id="body">
    
          <Main />
        <NextScript />
      </body>

    </Html>
  )
}