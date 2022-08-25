import React, {useState} from 'react'
import {global} from './_app'
import Description from '../components/Description'
import Slider from '../components/Slider'
import Layout from '../components/Layout'
import Slideshow from '../components/Slideshow'


export const getStaticProps= async ()=>{

  const endpointsToFetch= []
  const slug0= []

  //fetch data for the home page
  const response= await fetch(`${global.fetchURI}/home-page?populate=*`)
  const json= await response.json()

  //fetch the menu data

  const menuData= await fetch(`${global.fetchURI}/menus/menu?nested`);
  const menuDataJson= await menuData.json()

  JSON.stringify(menuDataJson,(key,value) => 
    {if (key=="url") endpointsToFetch.push(value)
    return(value)}
    )

  //fetch the different components attributed to the endpoints of the menu

  for(let endpoint of endpointsToFetch){
    const data= await fetch (`${global.fetchURI}${endpoint}?fields[0]=slug`);
    const json= await data.json()
    slug0.push(json)
  }

  const slugs= slug0.map((item)=>{
    if(item.data!=null) return item.data.attributes.slug
    else return null
  })

  //create an object of the form {endpointsToFetch: slug} for the links in the menu

  const links={}

  slugs.forEach((item, index)=>{
    links[endpointsToFetch[index]]= item;
  })

  
  return {
    props: {
      data: json,
      menuData: menuDataJson,
      links: links,
    },
    revalidate: 30,
  }
}

export default function Home({ data, menuData, links}) {

  const attributes= data.data.attributes

  return (
     <div>
       <Layout menuData={menuData} links={links}>
       <Slideshow data={attributes.slideShowImages}/>
        <Description data={attributes.aboutUs}/>
      {<Slider data={attributes.sliders}/> }
       </Layout>

    </div>

  )
 }


