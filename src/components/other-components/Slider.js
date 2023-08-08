"use client";

import React, { useEffect } from "react";
import slidercss from "@styles/component-modules/slider.module.scss";
import useCounter from "@hooks/useCounter";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import InternalLinks from "@components/other-components/InternalLinks";
import moment from "moment";
import "moment/locale/de";

const Slider = ({ data, instaData }) => {
  const dataArray = [{ title: "Aktuelles", text: instaData.data[0].caption, link: "/aktuelles" }];
  const relations = [
    { access: data.articles, endpoint: "/artikel" },
    { access: data.topics, endpoint: "/schwerpunkte" },
    { access: data.calendar_entries, endpoint: "/termine" },
    { access: data.meeting_types, endpoint: "/unsere_arbeit" },
  ];

  relations.map((relation) => {
    const { access, endpoint } = relation;

    access.data.map((item) => {
      if (endpoint == "/termine") {
        let m = moment(item.attributes.date, moment.ISO_8601);
        let formatedDate = m.format("dddd, DD MMMM YYYY, H.mm");
        dataArray.push({
          title: item.attributes.title,
          text: item.attributes.text,
          link: endpoint,
          date: formatedDate,
          location: item.attributes.location,
        });
      } else {
        dataArray.push({
          title: item.attributes.title,
          text: item.attributes.text,
          link: endpoint,
        });
      }
    });
  });

  data.quotes.map((quote) => {
    dataArray.push({
      title: quote.title,
      text: quote.text,
      link: quote.link,
      author: quote.author,
    });
  });

  const sliderRef = React.useRef([]);
  const sliderHeights = [];

  useEffect(() => {
    sliderRef.current.forEach((item) => {
      sliderHeights.push(item.offsetHeight);
    });
    var r = document.querySelector(":root");
    r.style.setProperty("--slider-max-height", Math.max(...sliderHeights));
  });

  const dataLength = dataArray.length;
  const [handleChange, current, next, previous, reduceBoolean] = useCounter(dataLength);

  return (
    <div className={slidercss.mainslider}>
      <button
        onClick={() => {
          handleChange(-1 + dataLength);
        }}
        className={slidercss.button1}
      >
        &#60;
      </button>

      {dataArray.map((item, index) => {
        return (
          <div
            className={
              index == current
                ? slidercss.current
                : index == next
                ? reduceBoolean
                  ? slidercss.nextreduce
                  : slidercss.next
                : index == previous
                ? reduceBoolean
                  ? slidercss.previousreduce
                  : slidercss.previous
                : slidercss.none
            }
            key={index}
          >
            <div
              ref={(el) => (sliderRef.current[index] = el)}
              className={item.author ? "" : slidercss.sliderboxes}
            >
              {item.title ? (
                <h3>
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{item.title}</ReactMarkdown>
                </h3>
              ) : (
                <></>
              )}
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{item.text}</ReactMarkdown>
              {item.link == "/termine" ? (
                <i>
                  <div>{item.date}</div>
                  <div>{item.location}</div>
                </i>
              ) : (
                <></>
              )}
              {item.author ? (
                <i>
                  <div>{item.author}</div>
                </i>
              ) : (
                <></>
              )}
            </div>
            {item.link ? (
              <div className={slidercss.viewMore}>
                {
                  <InternalLinks
                    data={[{ displayedText: "weiterlesen", URL: item.link, image: { data: null } }]}
                  />
                }
              </div>
            ) : (
              <></>
            )}
          </div>
        );
      })}

      <button
        onClick={() => {
          handleChange(1);
        }}
        className={slidercss.button1 + " " + slidercss.button2}
      >
        &#60;
      </button>
    </div>
  );
};

export default Slider;
