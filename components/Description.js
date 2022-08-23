import aboutcss from '../styles/about.module.scss'
import React from 'react'
import Image from 'next/image'


const Description = ({data}) => {

    
    return (
        <>
        <div className={aboutcss.überuns}>
        <h2>Über Uns</h2>
        {data}
        </div>
        </>
    )
}

export default Description