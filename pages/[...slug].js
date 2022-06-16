import React from 'react'
import {useRouter} from 'next/router'
import {global} from './_app'
import Articles from '../components/Articles'
import SingleArticles from '../components/Articles/SingleArticles'
import Layout from '../components/Layout'



const Slugs = ({ menuData, data, linkObject}) => {


    const router= useRouter();
    const {slug = []} = router.query;

   if(slug[0]=="artikel"){

      if(slug[1] && slug[1] == data.id){
       return(
          <Layout menuData={menuData} linkObject={linkObject}>
          <SingleArticles singleArticle={data}/>
          </Layout>
          )
      } 
     return(
        <Layout menuData={menuData} linkObject={linkObject}>
          <Articles articlePage={data}/>
        </Layout>
      )
     }

     if(slug[0]=="geschichte"){
       return <div>hello</div>
     }

     else if(slug[0]== "teilnehmen"){
       return <div>teilnehmen</div>
     }

     else if(slug[0] =="satzung"){
       return <div>satzung</div>
     }
     else if(slug[0] =="bilder"){
      return <div>bilder</div>
    }

}

export default Slugs

const endpointsToFetch=[]
const slug0List=[]
const slug1List=[]

export async function getStaticPaths(){

//fetch all possible enpoints out of the menu to get access to the possible page components

  const menuData= await fetch(`${global.fetchURI}/menus/menu?nested`);
  const menuDataJson = await menuData.json();
  
  JSON.stringify(menuDataJson,(key,value) => 
    {if (key=="url") endpointsToFetch.push(value)
    return(value)}
    )


  for(let endpoint of endpointsToFetch){
    const data= await fetch (`${global.fetchURI}${endpoint}?populate=*`);
    const json= await data.json()
    slug0List.push(json)
  }

  //return the slugs of the data, if they exist


  let slug0ListFiltered= slug0List.filter((item) => item.data)
  
  const slugs= slug0ListFiltered.map((item)=>{

      const attribute= item.data.attributes;

      if(attribute.slug== "artikel"){
        slug1List.push(attribute.children.data)
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
    slug1List[0].map((item)=>{
      return{
        params: {slug:[`artikel`, `${item.id}`]}
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

    const rewriteObject= {}

  //first part the same as in the getStaticPath function to get access to the englisch slugs attributed
  //to the displayed slugs in german

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
    slug0List.push(json)
  }

  const slugs= slug0List.map((item)=>{
    if(item.data!=null){

      const attribute= item.data.attributes

      if(attribute.slug== "artikel"){
        slug1List.push(attribute.children.data)
      }
      return attribute.slug
    }
    else return null
  })
  //create an object of the form {displayedSlugs: data}

  slugs.forEach((item, index)=>{
    rewriteObject[item] = slug0List[index];
  })

  //{endpointsToFetch: slug}

  const linkObject={}

  slugs.forEach((item, index)=>{
    linkObject[endpointsToFetch[index]]= item;
  })
  
  //push the data of the nested pages into the rewrite object

  slug1List[0].forEach((item)=>{
    rewriteObject[[`artikel`,`${item.id}`]]= item;
  })

  const displayedSlug= context.params.slug;
   const data= rewriteObject[displayedSlug]

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
      linkObject: linkObject,
    },
    revalidate: 30,
  }
}
