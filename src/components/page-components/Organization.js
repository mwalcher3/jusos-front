import { global } from "jusos.config";

import React from "react";
import MeetingTypes from "@components/other-components/MeetingTypes";
import TextBlocks from "@components/other-components/TextBlocks";
import MainImage from "@components/other-components/MainImage";

const Organization = async ({ data }) => {
  // fetch popupData
  const meetingTypesData = await fetch(`${global.fetchURI}/meeting-types?populate=*`);
  const meetingTypesJson = await meetingTypesData.json();

  const dataAttributes = data.data.attributes;
  return (
    <div>
      <MainImage
        largeImage={dataAttributes.mainImage}
        smallImage={dataAttributes.mainImageSmallScreens}
      />
      <h1 className="header">{dataAttributes.title}</h1>
      <TextBlocks data={dataAttributes.text} />
      <h1>{dataAttributes.titleMeetingTypes}</h1>
      {<MeetingTypes data={meetingTypesJson.data} />}
    </div>
  );
};

export default Organization;
