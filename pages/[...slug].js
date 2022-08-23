import React from 'react'
import {useRouter} from 'next/router'
import {global} from './_app'

import SingleArticles from '../components/Articles/SingleArticles'
import Layout from '../components/Layout'
import SimplePage from '../components/Simple-page'
import kontakt from '../components/Contact'
import artikel from '../components/Articles'
import aktuelles from '../components/TopicsCurrent'
import schwerpunkte from '../components/TopicsGeneral'


const Slugs = ({ menuData, data, links}) => {

    const router= useRouter();
    const {slug = []} = router.query;

    const object={
      artikel: artikel,
      kontakt: kontakt,
      aktuelles: aktuelles,
      schwerpunkte: schwerpunkte,
    }

    var ComponentName= object[slug[0]]

     if(object[slug[0]]==null){
      return(
        <Layout menuData={menuData} links={links}>
          <SimplePage data={data}/>
        </Layout>
        )
     }
     else{

      if(slug[1] && slug[1] == global.endpointSyntax(data.attributes.Title)){
       return(
          <Layout menuData={menuData} links={links}>
          <SingleArticles singleArticle={data}/>
          </Layout>
          )
      } 
     if(data){
     return(
        <Layout menuData={menuData} links={links}>
          <ComponentName data={data}/>
        </Layout>
      )
     }   
    }
}


export default Slugs

const endpointsToFetch=[]
const slug0=[]
const slug1=[]

export async function getStaticPaths(){

const menuData= await fetch(`${global.fetchURI}/menus/menu?nested`);
  const menuDataJson = await menuData.json();
  
  JSON.stringify(menuDataJson,(key,value) => 
    {if (key=="url") endpointsToFetch.push(value)
    return(value)}
    )


  for(let endpoint of endpointsToFetch){
    const data= await fetch (`${global.fetchURI}${endpoint}?populate=*`);
    const json= await data.json()
    slug0.push(json)
  }

  //return the slugs of the data, if they exist


  let slug0Filtered= slug0.filter((item) => item.data)
  
  const slugs= slug0Filtered.map((item)=>{

      const attribute= item.data.attributes;

      if(attribute.slug== "artikel"){
        slug1.push(attribute.children.data)
      }

      return attribute.slug
    
  })
  

  //return params for the fetched slugs, if they exist

  const params=
   slugs.map((slug)=>{
      return {
        params:{slug:[`${slug}`]}
      }
  })


  //create params for the nested slugs out of the slug1List
  const nestedParams=
    slug1[0].map((item)=>{
      return{
        params: {slug:[`artikel`, `${global.endpointSyntax(item.attributes.Title)}`]}
      }
    })

  return{
    paths: [
     ...params,
     ...nestedParams
    ],
      fallback: 'blocking'
  }
}





export const getStaticProps= async (context)=>{
  //same code is rewritten, because it is not possible to 
  //pass down data from getStaticPaths to getStaticProps
  //or create a global function to fetch the data


  const menuData= await fetch(`${global.fetchURI}/menus/menu?nested`);
  const menuDataJson = await menuData.json();

  JSON.stringify(menuDataJson,(key,value) => 
    {if (key=="url") endpointsToFetch.push(value)
    return(value)}
    )

  //fetch the different components attributed to the endpoints of the menu

  for(let endpoint of endpointsToFetch){
    const data= await fetch (`${global.fetchURI}${endpoint}?populate=*`);
    const json= await data.json()
    slug0.push(json)
  }

  const slugs= slug0.map((item)=>{
    if(item.data!=null){

      const attribute= item.data.attributes

      if(attribute.slug== "artikel"){
        slug1.push(attribute.children.data)
      }
      return attribute.slug
    }
    else return null
  })
  //create an object of the form {displayedSlugs: data}
  /* fetch the data for the poups seperately and push it into rewrite["shwerpunkte"]. 
  cannot be fetched with populate=*, because of relation nesting*/

  const popupData= await fetch (`${global.fetchURI}/pop-ups?populate=*`);
  const popupJson= await popupData.json()

  const rewrite={}

  slugs.forEach((item, index)=>{
    rewrite[item] = slug0[index];

    if(item== "schwerpunkte"){
       rewrite[item]= {...slug0[index], ...popupJson}
       console.log("data for general page", rewrite[item])
    }
  })

  //{endpointsToFetch: slug}

  const links={}

  slugs.forEach((item, index)=>{
    links[endpointsToFetch[index]]= item;
  })
  
  //push the data of the nested pages into the rewrite object

  slug1[0].forEach((item)=>{
    rewrite[[`artikel`,`${global.endpointSyntax(item.attributes.Title)}`]]= item;
  })


  const displayedSlug= context.params.slug;
   const data= rewrite[displayedSlug]

   //return 404 page if the displayedSlug does not refer a any data,
   //this is because fallback is set to 'blocking' in the getStaticPaths function

   if (!data){
     return {
       notFound: true
     }
   }

  return {
    props: {
      menuData: menuDataJson,
      data: data,
      links: links,
    },
    revalidate: 30,
  }
}