import { global } from 'jusos.config'


import React from 'react'
import Introduction from '@components/other-components/Introduction'
import Slider from '@components/other-components/Slider'
import Slideshow from '@components/other-components/Slideshow'
import ExternalLinks from '@components/other-components/ExternalLinks'
import InternalLinks from '@components/other-components/InternalLinks'




export default async function FrontPage({ params }) {

    // fetch page data proper
    // const endpoint = "/home-page"
    // const pageData = await fetch(`${global.fetchURI}${endpoint}?populate=*`);
    // const pageJson = await pageData.json()

    // fetch slider and internalLinks data seperately, because the slider data cannot be put in the JSON stringify
    // const extraData = await fetch(`${global.fetchURI}/home-page?populate[internalLinks][populate][0]=image&populate[slider][populate][0]=articles&populate[slider][populate][1]=calendar_entries&populate[slider][populate][2]=topics&populate[slider][populate][3]=meeting_types&populate[slider][populate][4]=quotes`);
    // const extraJson = await extraData.json()

    // const token = process.env.INSTAGRAM_TOKEN
    // const instagramData = await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,username,timestamp,caption,children{media_url}&limit=1&access_token=${token}`);
    // const instagramJson = await instagramData.json()

    // there is only one deep relation on home-page
    // const pageJsonFull = JSON.parse(
    //     JSON.stringify(pageJson, (key, value) => {
    //         switch (key) {
    //             case "sliderInstagram": return instagramJson
    //             default: return value
    //         }
    //     }
    //     ))

    // const attributes = pageJsonFull.data.attributes
    // const extraAttributes = extraJson.data.attributes

    return <>HELLO</>

    return (<>
        <Slideshow data={attributes.slideShowImages} smallScreenData={attributes.slideShowSmallScreens} />
        <Introduction data={attributes.introduction} />
        <Slider data={extraAttributes.slider} instaData={attributes.slider.sliderInstagram} />
        <InternalLinks data={extraAttributes.internalLinks} />
        <ExternalLinks data={attributes.externalLinks} />
    </>

    )
}




