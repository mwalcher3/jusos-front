import { global } from "jusos.config";

import React from "react";
import smembercss from "@styles/page-modules/singlemember.module.scss";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const SingleMember = ({ data }) => {
  if (data != null) {
    return (
      <div className={smembercss.maincontainer}>
        <div className={smembercss.image}>
          <Image
            src={`${global.host}${data.attributes.previewImage.data.attributes.url}`}
            alt={`${global.host}${data.attributes.previewImage.data.alternativeText}`}
            fill
            className="imageCover"
            priority
          />
        </div>
        <h1>{data.attributes.name}</h1>

        <section className={smembercss.roles}>
          <div
            className={
              (data.attributes.role == "Sprecher") | (data.attributes.role == "Sprecherin")
                ? "displayBlock"
                : "none"
            }
          >
            {data.attributes.role}
          </div>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{data.attributes.otherRoles}</ReactMarkdown>
        </section>

        <section>
          <ReactMarkdown className={smembercss.description} rehypePlugins={[rehypeRaw]}>
            {data.attributes.description}
          </ReactMarkdown>
          <Link href="/sprecher" passHref>
            <button className="moreButton">weitere Personen</button>
          </Link>
        </section>

        <div className={smembercss.purgeFloats}></div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default SingleMember;
