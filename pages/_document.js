import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>    
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1"/>
      <meta name="keywords" content="jusos, heidelberg, sozialistisch, spd Heidelberg, Jungsozialisten"/>
      <meta name="description" content="Wir Jusos sind die Jungsozialist*innen in der SPD Heidelberg. Wir sind ein sozialistischer, feministischer, antifaschistischer und internationalistischer Richtungsverband. Bei uns engagieren sich junge Menschen zwischen 14 und 35 Jahren und setzen sich für eine gerechtere Gesellschaft ein."/>
      <link rel="manifest" href="/manifest/manifest.json"/>
      <link rel="icon" type="image/png" href="/jusosFavicon.png"/>
       </Head>
      <body id="body">
    
          <Main />
        <NextScript />
      </body>

    </Html>
  )
}