import React from 'react'
import MeetingTypes from '../other-components/MeetingTypes'
import TextBlocks from "../other-components/TextBlocks"
import MainImage from "../other-components/MainImage"

const Organization = ({data}) => {

    const dataAttributes= data.data.attributes
  return (
    <div>
       <MainImage largeImage={dataAttributes.mainImage} smallImage={dataAttributes.mainImageSmallScreens}/>
        <h1 className="header">{dataAttributes.title}</h1>
        <TextBlocks data={dataAttributes.text}/>
        <h1>{dataAttributes.titleMeetingTypes}</h1>
        {<MeetingTypes data={dataAttributes.meeting_types.data} />}  
    </div>
  )
}

export default Organization