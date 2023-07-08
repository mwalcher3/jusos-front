import { global } from "jusos.config";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import generalcss from "@styles/page-modules/topics.general.module.scss";
import MainImage from "@components/other-components/MainImage";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

import Accordion from "../other-components/Accordion";

const TopicsGeneral = async ({ data }) => {
  const dataAttributes = data.data.attributes;
  // fetch topicsData
  const topicData = await fetch(
    `${global.fetchURI}/topics?populate=*&pagination[start]=0&pagination[limit]=100000`
  );
  const topicJson = await topicData.json();
  const sortedTopics = topicJson.data.sort((a, b) => a.id - b.id);

  return (
    <div className="container">
      <MainImage
        largeImage={dataAttributes.mainImage}
        smallImage={dataAttributes.mainImageSmallScreens}
      />

      <h1 className="header">{dataAttributes.titleTopics}</h1>

      <Accordion accordionData={sortedTopics} />

      <section>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {dataAttributes.schwerinerManifestText}
        </ReactMarkdown>
        {
          <Link
            className={generalcss.schwerinerManifest}
            href={`${global.host}${dataAttributes.schwerinerManifest.data.attributes.url}`}
            target="_blank"
          >
            <h3>Schweriner Manifest</h3>

            <FontAwesomeIcon icon={faFile} />
          </Link>
        }
      </section>
    </div>
  );
};

export default TopicsGeneral;
