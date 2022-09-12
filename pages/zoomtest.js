import React, {useEffect} from 'react'
//import ZoomMtgEmbedded from '@zoomus/websdk/embedded'
import dynamic from 'next/dynamic'
//const ZoomMtgEmbedded= dynamic(()=>{return import('@zoomus/websdk/embedded')}, {ssr:false})
import Script from 'next/script'
import Link from 'next/link'
import {useRouter} from 'next/router'

export const getStaticProps= async ()=>{

     const data=await fetch("http://localhost:3000/api/zoomJWT");
     const json= await data.json()
  
    return {
      props: {
        data: json
      },
    }
  }
  

const Zoom = ({data}) => {
  console.log(data);
  
    const meetingSDKElement= React.useRef()

    useEffect(()=>{
      const client = ZoomMtgEmbedded.createClient()

      client.init({
          debug: true,
          zoomAppRoot: meetingSDKElement.current,
          language: 'en-US',
          customize: {
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
            ],
            toolbar: {
              buttons: [
                {
                  text: 'Custom Button',
                  className: 'CustomButton',
                  onClick: () => {
                    console.log('custom button')
                  }
                }
              ]
            }
          }
        });

        client.join({
          sdkKey: 'lMwMhrMcB0xGf902dO3qWUX23FF0vbuKeA8a',
          signature: data.signature,
          meetingNumber: 83246480647,
          password: 'gyRp6P',
          userName: "Melisande Walcher"
      })

    },[])
   
  
  return (
    <>
          <Script src="https://source.zoom.us/2.2.0/lib/vendor/react.min.js" strategy="beforeInteractive" /> 
      <Script src="https://source.zoom.us/2.2.0/lib/vendor/react-dom.min.js" strategy="beforeInteractive" />
      <Script src="https://source.zoom.us/2.2.0/lib/vendor/redux.min.js" strategy="beforeInteractive" />
      <Script src="https://source.zoom.us/2.2.0/lib/vendor/redux-thunk.min.js" strategy="beforeInteractive" />
      <Script src="https://source.zoom.us/2.2.0/lib/vendor/lodash.min.js" strategy="beforeInteractive" />
       <Script src="https://source.zoom.us/2.2.0/zoom-meeting-embedded-2.2.0.min.js" strategy="beforeInteractive" />

  <div ref={meetingSDKElement}></div>


  <button>
  <Link href={`https://zoom.us/oauth/authorize?response_type=code&client_id=zbBC5vKTQj22yNSqw67DA&redirect_uri=http://localhost:3000`}>
    authorize access to your zoom account
  </Link>
  </button>
    </>
  )
}

export default Zoom