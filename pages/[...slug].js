import React from 'react'
import {useRouter} from 'next/router'
import {global} from './_app'

import artikel from '../components/Articles'
import singleArticles from '../components/Articles/SingleArticles'
import Layout from '../components/layout-components/Layout'
import SimplePage from '../components/Simple-page'
import kontakt from '../components/Contact'
import aktuelles from '../components/TopicsCurrent'
import schwerpunkte from '../components/TopicsGeneral'
import team from "../components/Team/index"
import singleMember from "../components/Team/SingleMember"
import kalender from "../components/Calendar"


const Slugs = ({ menuData, data, links}) => {

    const router= useRouter();
    const {slug = []} = router.query;

    const object={
      artikel: artikel,
      kontakt: kontakt,
      aktuelles: aktuelles,
      schwerpunkte: schwerpunkte,
      team: team,
      kalender: kalender,
    }

    const subPagesObject={
      team: singleMember,
      artikel: singleArticles
    }

    var ComponentName= object[slug[0]]
    var SubComponentName= subPagesObject[slug[0]]

     if(object[slug[0]]==null){
      if(data){
      return(
        <Layout menuData={menuData} links={links}>
          <SimplePage data={data}/>
        </Layout>
        )
      }
     }
     else{

      if(slug[1] && slug[1] == global.endpointSyntax(data.attributes.Title)){
        if(data){
       return(
          <Layout menuData={menuData} links={links}>
           <SubComponentName data={data}/>
          </Layout>
          )
        } 
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

//slugs from pages with corresponding subpages
const nestedPages= ["/article-page", "/person"]


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
    const data= await fetch (`${global.fetchURI}${endpoint}?fields[0]=slug`);
    const json= await data.json()
    slug0.push(json)
  }
  
  for(let childrenEndpoint of nestedPages){
    const data= await fetch (`${global.fetchURI}${childrenEndpoint}?populate[children][fields][0]=Title`);
    const json= await data.json()
    slug1.push(json.data.attributes)
  }

  //return the slugs of the data, if they exist
  let slug0Filtered= slug0.filter((item) => item.data)
  const slugs= slug0Filtered.map((item)=>{return item.data.attributes.slug})

  //filter sub-routes
  let slug1Filtered= slug1.filter((item) => item.children)

  //return params for the fetched slugs, if they exist

  const params=
   slugs.map((slug)=>{
      return {
        params:{slug:[`${slug}`]}
      }
  })

  //return the title of the articles/teamMembers as a slug for the nested routes

    const nestedParams=
    slug1Filtered.map((item)=>{
      const paramArrays=
      item.children.data.map((subitem)=>{  
          return{
            params: {slug:[`${item.slug}`, `${global.endpointSyntax(subitem.attributes.Title)}`]}
          }
      })
      return(paramArrays)
    })
    const mergedNestedParams = [].concat.apply([], nestedParams);

  return{
    paths: [
     ...params,
     ...mergedNestedParams
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
    if(item.data!=null && item.data!=undefined){

      const attribute= item.data.attributes

      //push data for article subpages into slug1 array
      if(attribute.slug== "artikel"){
        slug1.push(attribute.children.data)
      }

      return attribute.slug
    }
    else return null
  })
  //create an object of the form {displayedSlugs: data}
  /* fetch the data for the poups seperately to push it into rewrite["shwerpunkte"]. 
  cannot be fetched with populate=*, because of relation nesting*/

  const popupData= await fetch (`${global.fetchURI}/pop-ups?populate=*`);
  const popupJson= await popupData.json()

  const memberData= await fetch (`${global.fetchURI}/teams?populate=*`);
  const memberJson= await memberData.json()
  const memData= memberJson.data

  /**/

  /*fetch data from instagram api to push it into rewrite["aktuelles"]*/
  const instagramToken= process.env.INSTAGRAM_TOKEN
  const instagramData= await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp,caption,children{media_url}&access_token=${instagramToken}`);
  const instagramJson= await instagramData.json()

  const instaData= instagramJson.data

  const rewrite={}

  slugs.forEach((item, index)=>{
    rewrite[item] = slug0[index];

    //strapi does not allow populating deap relations, so the deep relation data is being pushed into th json here
    if(item== "schwerpunkte"){
       rewrite[item]= {...slug0[index], ...popupJson}
    }
    else if(item== "aktuelles"){
      rewrite[item]= {...slug0[index], instaData}
   }
   else if(item== "team"){
    rewrite[item]= {...slug0[index], memData}
    //push memData into slug1 for the single member subpages
    slug1.push(memData)
 }
  })


  //{endpointsToFetch: slug}

  const links={}

  slugs.forEach((item, index)=>{
    links[endpointsToFetch[index]]= item;
  })
  
  //push the data of the nested pages into the rewrite object

  //first array with the article data
  slug1[0].forEach((item)=>{
    rewrite[[`artikel`,`${global.endpointSyntax(item.attributes.Title)}`]]= item;
  })

  //second data with the team data
  slug1[1].forEach((item)=>{
    rewrite[[`team`,`${global.endpointSyntax(item.attributes.Title)}`]]= item;
  })


  const displayedSlug= context.params.slug;
  const data= rewrite[displayedSlug];

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

