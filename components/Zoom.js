import React, {useEffect} from 'react'
//import ZoomMtgEmbedded from '@zoomus/websdk/embedded'
import dynamic from 'next/dynamic'
//const ZoomMtgEmbedded= dynamic(()=>{return import('@zoomus/websdk/embedded')}, {ssr:false})
import Script from 'next/script'



const Zoom = () => {

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

        /*client.join({
          apiKey: yourKey,
          signature: yourSignature,
          meetingNumber: yourMeet,
          password: yourPass,
          userName: yourName
      })*/

    },[])
   
  
  return (
    <>

   {/* <link
          type="text/css"
          rel="stylesheet"
          href="https://source.zoom.us/2.2.0/css/bootstrap.css"
        /> 
        <link
          type="text/css"
          rel="stylesheet"
          href="https://source.zoom.us/2.2.0/css/react-select.css"
  />*/}
          <Script src="https://source.zoom.us/2.2.0/lib/vendor/react.min.js" strategy="beforeInteractive" /> 
      <Script src="https://source.zoom.us/2.2.0/lib/vendor/react-dom.min.js" strategy="beforeInteractive" />
      <Script src="https://source.zoom.us/2.2.0/lib/vendor/redux.min.js" strategy="beforeInteractive" />
      <Script src="https://source.zoom.us/2.2.0/lib/vendor/redux-thunk.min.js" strategy="beforeInteractive" />
      <Script src="https://source.zoom.us/2.2.0/lib/vendor/lodash.min.js" strategy="beforeInteractive" />
       <Script src="https://source.zoom.us/2.2.0/zoom-meeting-embedded-2.2.0.min.js" strategy="beforeInteractive" />

  <div ref={meetingSDKElement}></div>
    </>
  )
}

export default Zoom