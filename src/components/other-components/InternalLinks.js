"use client";

import { global } from "@/jusos.config";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import intcss from "@styles/component-modules/internal-links.module.scss";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const InternalLinks = ({ data }) => {
  return (
    <section className={intcss.internalLinkBox}>
      {data.map((item, index) => {
        return (
          <section
            key={index}
            className={
              intcss.internalLinks +
              " " +
              (item.image.data != null || item.description != null ? "" : intcss.internalLinks2)
            }
          >
            <Link href={item.URL} passHref>
              <div>
                {item.image.data != null ? (
                  <div className={intcss.images}>
                    {
                      <Image
                        src={`${global.host}${item.image.data.attributes.url}`}
                        alt={item.image.data.attributes.alternativeText}
                        fill
                        className="imageCover"
                        priority
                      />
                    }
                  </div>
                ) : (
                  <></>
                )}

                <div className={intcss.textarrow}>
                  <h4>{item.displayedText}</h4>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
                {item.description ? (
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{item.description}</ReactMarkdown>
                ) : (
                  <></>
                )}
              </div>
            </Link>
          </section>
        );
      })}
    </section>
  );
};

export default InternalLinks;
