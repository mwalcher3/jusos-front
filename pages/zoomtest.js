import React, { useEffect } from 'react'
import Script from 'next/script'
import Link from 'next/link'
import KJUR from 'jsrsasign'
import zoomcss from "../styles/page-modules/zoom.module.scss"


const meetingId=  5011974152
export const getStaticProps = async () => {

  // https://www.npmjs.com/package/jsrsasign
  function generateSignature(sdkKey, sdkSecret, meetingNumber, role) {

    const iat = Math.round((new Date().getTime() - 30000) / 1000)
    const exp = iat + 60 * 60 * 2
    const oHeader = { alg: 'HS256', typ: 'JWT' }

    const oPayload = {
      sdkKey: sdkKey,
      mn: meetingNumber,
      role: role,
      iat: iat,
      exp: exp,
      appKey: sdkKey,
      tokenExp: iat + 60 * 60 * 2
    }

    ///users/{userId}/meetings

    const sHeader = JSON.stringify(oHeader)
    const sPayload = JSON.stringify(oPayload)
    const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret)
    return sdkJWT
  }

  const generatedSignature = generateSignature(process.env.ZOOM_SDK_KEY, process.env.ZOOM_SDK_SECRET, meetingId, 0)

  const json = { signature: generatedSignature }

  return {
    props: {
      data: json
    },
  }
}


const Zoom = ({ data }) => {

  const meetingSDKElement = React.useRef()

  useEffect(() => {
    const client = ZoomMtgEmbedded.createClient()

    client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement.current,
      language: 'de-DE',
      customize: {
        video: {
          popper: {
            disableDraggable: true
          },
          isResizable: true,
          viewSizes: {
            default: {
              width: 500,
              height: 500
            },
          },
        },
    
     /* customize: {
        video: {
          popper: {
            disableDraggable: true
          },
          isResizable: true,
          viewSizes: {
            default: {
              width: 500,
              height: 500
            },
          }
        },
        meetingInfo: [
          'topic',
          'host',
          'mn',
          'pwd',
          'telPwd',
          'invite',
          'participant',
          'dc',
          'enctype',
        ],*/
      }
    });

    client.join({
      sdkKey: 'lMwMhrMcB0xGf902dO3qWUX23FF0vbuKeA8a',
      signature: data.signature,
      meetingNumber: meetingId,
      password: '8BDfms',
      userName: `${process.env.USER}`
    })

  }, [data.signature])

  return (
    <>
      <Script src="https://source.zoom.us/2.7.0/lib/vendor/react.min.js" strategy="beforeInteractive" />
      <Script src="https://source.zoom.us/2.7.0/lib/vendor/react-dom.min.js" strategy="beforeInteractive" />
      <Script src="https://source.zoom.us/2.7.0/lib/vendor/redux.min.js" strategy="beforeInteractive" />
      <Script src="https://source.zoom.us/2.7.0/lib/vendor/redux-thunk.min.js" strategy="beforeInteractive" />
      <Script src="https://source.zoom.us/2.7.0/lib/vendor/lodash.min.js" strategy="beforeInteractive" />
     <Script src="https://source.zoom.us/2.7.0/zoom-meeting-embedded-2.7.0.min.js" strategy="beforeInteractive"/>

      <div ref={meetingSDKElement} className={zoomcss.meetingSDKElement}></div>


      {/*<button>
        <Link href={`https://zoom.us/oauth/authorize?response_type=code&client_id=zbBC5vKTQj22yNSqw67DA&redirect_uri=http://localhost:3000`}>
          authorize access to your zoom account
        </Link>
  </button>*/}
    </>
  )
}

export default Zoom