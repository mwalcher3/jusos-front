"use client";

import { global } from "jusos.config";

import generalcss from "@styles/page-modules/topics.general.module.scss";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Image from "next/image";

import { useState } from "react";

const Accordion = ({ accordionData }) => {
  const [accordionCount, setAccordionCount] = useState(-1);

  return (
    <section className={generalcss.accordioncontainer}>
      {accordionData.map((item, index) => {
        return (
          <div key={index}>
            <div className={generalcss.accordionbanner}>
              <h2>{item.attributes.title}</h2>

              <span
                onClick={() => {
                  index == accordionCount ? setAccordionCount(-1) : setAccordionCount(index);
                }}
                className={generalcss.more}
              >
                <div className={generalcss.plushorizontal}></div>
                <div
                  className={accordionCount == index ? generalcss.minus : generalcss.plusvertical}
                ></div>
              </span>
            </div>

            <section
              className={
                accordionCount == index ? generalcss.paragraphs : generalcss.paragraphsclosed
              }
            >
              {
                <div className={item.attributes.image.data ? "pimage" : "none"}>
                  {item.attributes.image.data == null ? (
                    <div></div>
                  ) : (
                    <Image
                      src={`https://content.jusoshd.uber.space${item.attributes.image.data.attributes.url}`}
                      // src={`${global.host}${item.attributes.image.data.attributes.url}`}
                      alt={item.attributes.image.data.attributes.alternativeText}
                      fill
                      className="imageCover"
                      priority
                    />
                  )}
                </div>
              }

              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{item.attributes.text}</ReactMarkdown>
            </section>
            <div className="horizontalLine"></div>
          </div>
        );
      })}
    </section>
  );
};

export default Accordion;
