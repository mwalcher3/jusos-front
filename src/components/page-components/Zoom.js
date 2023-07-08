"use client";

import React, { useEffect } from "react";
import Script from "next/script";
import zoomcss from "@styles/page-modules/zoom.module.scss";
import KJUR from "jsrsasign";

function generateSignature(sdkKey, sdkSecret, meetingNumber, role) {
  const iat = Math.round((new Date().getTime() - 30000) / 1000);
  const exp = iat + 60 * 60 * 2;
  const oHeader = { alg: "HS256", typ: "JWT" };

  const oPayload = {
    sdkKey: sdkKey,
    mn: meetingNumber,
    role: role,
    iat: iat,
    exp: exp,
    appKey: sdkKey,
    tokenExp: iat + 60 * 60 * 2,
  };

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  const sdkJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, sdkSecret);
  return sdkJWT;
}
const meetingId = 5011974152;

const generatedSignature = generateSignature(
  process.env.ZOOM_SDK_KEY,
  process.env.ZOOM_SDK_SECRET,
  meetingId,
  0
);

const Zoom = ({ data }) => {
  const zoomJson = { signature: generatedSignature };

  const meetingId = 5011974152;
  const meetingSDKElement = React.useRef();

  useEffect(() => {
    const client = ZoomMtgEmbedded.createClient();

    client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement.current,
      language: "de-DE",
      customize: {
        video: {
          isResizable: true,
          viewSizes: {
            default: {
              width: 1000,
              height: 600,
            },
            ribbon: {
              width: 300,
              height: 700,
            },
          },
        },

        toolbar: {
          buttons: [
            {
              text: "Custom Button",
              className: "CustomButton",
              onClick: () => {},
            },
          ],
        },
      },
    });

    client.join({
      sdkKey: "lMwMhrMcB0xGf902dO3qWUX23FF0vbuKeA8a",
      signature: zoomJson.signature,
      meetingNumber: meetingId,
      password: "8BDfms",
      userName: `${process.env.USER}`,
    });
  }, [zoomJson.signature]);

  return (
    <>
      <Script
        src="https://source.zoom.us/2.7.0/lib/vendor/react.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://source.zoom.us/2.7.0/lib/vendor/react-dom.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://source.zoom.us/2.7.0/lib/vendor/redux.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://source.zoom.us/2.7.0/lib/vendor/redux-thunk.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://source.zoom.us/2.7.0/lib/vendor/lodash.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://source.zoom.us/2.7.0/zoom-meeting-embedded-2.7.0.min.js"
        strategy="beforeInteractive"
      />

      <div className="container">
        <h1>{data.data.attributes.title}</h1>
        <p>{data.data.attributes.description}</p>
        <div ref={meetingSDKElement} className={zoomcss.meetingSDKElement}></div>
      </div>

      {/*<button>
        <Link href={`https://zoom.us/oauth/authorize?response_type=code&client_id=zbBC5vKTQj22yNSqw67DA&redirect_uri=http://localhost:3000`}>
          authorize access to your zoom account
        </Link>
  </button>*/}
    </>
  );
};

export default Zoom;
