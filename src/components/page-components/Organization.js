import { global } from "jusos.config";

import React from "react";
import MeetingTypes from "@components/other-components/MeetingTypes";
import TextBlocks from "@components/other-components/TextBlocks";
import MainImage from "@components/other-components/MainImage";

const Organization = async ({ data }) => {

  // fetch list of meetings listed on organization-page
  const meetingListData = await fetch(`${global.fetchURI}/organization-page?populate=*`, {
    next: { tags: ["/organization-page"] },
  });
  const meetingIDList = (await meetingListData.json()).data.attributes.meeting_types.data.map(
    (meeting) => meeting.id
  );
  // fetch motion data
  const meetingTypesJson = await Promise.all(
    meetingIDList.map(
      async (id) =>
        (
          await (
            await fetch(`${global.fetchURI}/meeting-types/${id}?populate=*`, {
              next: { tags: [`/meeting-types/${id}`] },
            })
          ).json()
        ).data
    )
  );

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
      {<MeetingTypes data={meetingTypesJson} />}
    </div>
  );
};

export default Organization;
