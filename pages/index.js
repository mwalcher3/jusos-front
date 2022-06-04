import React from 'react'
import Description from '../components/Description'
import Slider from '../components/Slider'
import Layout from '../components/Layout'



export const getStaticProps= async ()=>{
  
  const response= await fetch(`https://jusos-content.herokuapp.com/api/home-page?populate=*`)
  const json= await response.json()

  const menuResponse= await fetch(`https://jusos-content.herokuapp.com/api/menus/menu?nested`);
  const menuJson= await menuResponse.json()

  
  return {
    props: {
      data: json,
      menuData: menuJson,
    }
  }
}

export default function Home({ data, menuData}) {

  const attributes= data.data.attributes

  return (
     <div>
       <Layout menuData={menuData}>
        <Description data={attributes.aboutUs}/>
      {<Slider data={attributes.sliders}/> }
       </Layout>

    </div>

  )
 }


