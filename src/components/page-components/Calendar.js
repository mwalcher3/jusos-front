import { global } from "@/jusos.config";

import React from "react";
import moment from "moment";
import "moment/locale/de";

import Introduction from "@components/other-components/Introduction";
import CalendarDisplay from "../other-components/CalendarDisplay";

const Calendar = async ({ data }) => {
  return <>HILO</>
  const dataAttributes = data.data.attributes;
  // fetch calendar entries data
  const calendarData = await fetch(
    `${global.fetchURI}/calendar-entries?populate=*&pagination[start]=0&pagination[limit]=100000`
  );
  const calendarJson = await calendarData.json();
  const sortedEvents = calendarJson.data.sort(
    (a, b) =>
      new moment(a.attributes.date).format("YYYYMMDD") -
      new moment(b.attributes.date).format("YYYYMMDD")
  );

  return (
    <div>
      <h1 className="header">{dataAttributes.title}</h1>
      <Introduction data={dataAttributes.introduction} />
      <CalendarDisplay displayData={sortedEvents} />
    </div>
  );
};

export default Calendar;
