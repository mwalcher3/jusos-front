"use client";

import { global } from "@/jusos.config";

import React from "react";
import Image from "next/legacy/image";
import mtcss from "@styles/component-modules/meeting-types.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const MeetingTypes = ({ data }) => {
  const [popUpCount, setPopUpCount] = React.useState(-1);

  React.useEffect(() => {
    var body = document.querySelector("#body");
    function preventScroll(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    /*  if(popUpCount!=-1){
      body.addEventListener('wheel', preventScroll, {passive: false});
    console.log("disabled");
     
    } 
    else if(popUpCount == -1){
      body.removeEventListener('wheel', preventScroll, {passive: false});
      console.log("enabled");
    }
    //body.classList.add('burgeropen'):body.classList.remove('burgeropen')*/
  });

  return (
    <div className={mtcss.popupscontainer}>
      {data.map((item, index) => {
        return (
          <div key={index}>
            <section
              className={mtcss.imageBox + " " + (popUpCount == index ? mtcss.imageBoxClicked : "")}
              onClick={() => {
                index == popUpCount ? setPopUpCount(-1) : setPopUpCount(index);
              }}
            >
              {item.attributes.image.data != null ? (
                <div className={mtcss.images}>
                  <Image
                    src={`${global.host}${item.attributes.image.data.attributes.url}`}
                    alt={item.attributes.image.data.attributes.alternativeText}
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </div>
              ) : (
                <></>
              )}

              <h2>{item.attributes.title}</h2>
            </section>

            <div
              onClick={() => {
                if (popUpCount != -1) {
                  setPopUpCount(-1);
                }
              }}
              className={index == popUpCount ? "overlay" : "none"}
            >
              <div
                onClick={(event) => event.stopPropagation()}
                className={index == popUpCount ? mtcss.textcontainer : "none"}
              >
                <FontAwesomeIcon
                  className={mtcss.closingbutton}
                  onClick={() => {
                    if (popUpCount != -1) {
                      setPopUpCount(-1);
                    }
                  }}
                  icon={faCircleXmark}
                />
                <h2>{item.attributes.title}</h2>
                <ReactMarkdown className={mtcss.description} rehypePlugins={[rehypeRaw]}>
                  {item.attributes.text}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MeetingTypes;
