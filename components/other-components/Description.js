import aboutcss from '../../styles/component-modules/about.module.scss'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";



const Description = ({data}) => {

    return (
        <>
        <div className={aboutcss.überuns}>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{data}</ReactMarkdown>
        </div>
        </>
    )
}

export default Description