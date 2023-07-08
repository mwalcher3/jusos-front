import React from "react";
import { global } from "jusos.config";
import teamcss from "@styles/page-modules/team.module.scss";
import Image from "next/image";
import Link from "next/link";
import Sprecherkreis from "@components/other-components/SprecherKreis";
import Introduction from "@components/other-components/Introduction";
import MainImage from "@components/other-components/MainImage";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const Team = async ({ data }) => {
  const dataAttributes = data.data.attributes;
  const alternativeImage = dataAttributes.alternativeImage.data.attributes;

  // fetch memberData
  const memberData = await fetch(`${global.fetchURI}/members?populate=*`);
  const memberJson = await memberData.json();

  const sprecher = [];
  const otherMembers = [];

  memberJson.data.forEach((item) => {
    if ((item.attributes.role == "Sprecher") | (item.attributes.role == "Sprecherin")) {
      sprecher.push(item);
    } else {
      otherMembers.push(item);
    }
  });

  return (
    <div className="container">
      <MainImage
        largeImage={dataAttributes.mainImage}
        smallImage={dataAttributes.mainImageSmallScreens}
      />
      <h1 className="header">Sprecher*innenkreis</h1>

      <Introduction data={dataAttributes.introduction} />

      <Sprecherkreis data={sprecher} alternativeImage={alternativeImage} />

      <section className={teamcss.othermembers}>
        <h2>Erweiterter Sprecher*innenkreis</h2>
        <section className={teamcss.otherMembersBoxes}>
          {otherMembers.map((item, index) => {
            const previewImage = item.attributes.previewImage.data;

            return (
              <div className={teamcss.othermember} key={index}>
                <Link href={`/sprecher/${global.endpointSyntax(item.attributes.name)}`} passHref>
                  <div className={teamcss.squareimages}>
                    {
                      <Image
                        src={`${global.host}${
                          previewImage != null ? previewImage.attributes.url : alternativeImage.url
                        }`}
                        alt={`image of a person`}
                        fill
                        className="imageCover"
                        priority
                      />
                    }
                  </div>
                  <section className={teamcss.name}>
                    <h4>{item.attributes.name}</h4>
                    <h4>
                      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                        {item.attributes.otherRoles}
                      </ReactMarkdown>
                    </h4>
                  </section>
                </Link>
              </div>
            );
          })}
        </section>
      </section>
    </div>
  );
};

export default Team;
