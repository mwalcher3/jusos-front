"use client";

import introcss from "@styles/component-modules/introduction.module.scss";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const Introduction = ({ data }) => {
    
  return (
    <>
      <div className={introcss.überuns + " " + (data.border == false ? introcss.noborder : "")}>
        {data.title ? <h2>{data.title}</h2> : <></>}
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{data.text}</ReactMarkdown>
      </div>
    </>
  );
};

export default Introduction;
