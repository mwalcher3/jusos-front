import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head><meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1"/>
       </Head>
      <body id="body">
      <div className="wrapper" id="wrapper">
    
          <Main />
        <NextScript />
        </div>
      </body>

    </Html>
  )
}