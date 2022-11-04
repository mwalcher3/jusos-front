import aboutcss from '../../styles/component-modules/about.module.scss'
import React from 'react'
import ReactDom from 'react-dom'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";



const Description = ({data}) => {

const markdown = `Just a link: **https://reactjs.com.**
<u>underlined text</u> &nbsp;  
 [title](https://example.com)`

    return (
        <>
        <div className={aboutcss.überuns}>
        <h2>Über Uns</h2>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{JSON.stringify(data)}</ReactMarkdown>,
        </div>
        </>
    )
}

export default Description