import React from 'react'
import {useRouter} from 'next/router'
import Articles from '../components/Articles'
import SingleArticles from '../components/Articles/SingleArticles'
import Layout from '../components/Layout'


const Slugs = ({ menuData, data}) => {
  
    const router= useRouter();
    const {slug = []} = router.query;

   if(slug[0]=="artikel"){

      if(slug[1] && slug[1] == data.id){
       return(
          <Layout menuData={menuData}>
          <SingleArticles singleArticle={data}/>
          </Layout>
          )
      } 
     return(
        <Layout menuData={menuData}>
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

}

export default Slugs

const endpointsToFetch=[]
const slug0List=[]
const slug1List=[]

export async function getStaticPaths(){

//fetch all possible enpoints out of the menu to get access to the possible page components

  const menuData= await fetch(`https://jusos-content.herokuapp.com/api/menus/menu?nested`);
  const menuDataJson = await menuData.json();
  
  JSON.stringify(menuDataJson,(key,value) => 
    {if (key=="url") endpointsToFetch.push(value)
    return(value)}
    )


  for(let endpoint of endpointsToFetch){
    const data= await fetch (`https://jusos-content.herokuapp.com/api${endpoint}?populate=*`);
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
      fallback: false
  }
}




export const getStaticProps= async (context)=>{
  console.log(endpointsToFetch)

    const rewriteObject= {}

  //first part the same as in the getStaticPath function to get access to the englisch slugs attributed
  //to the displayed slugs in german

  const menuData= await fetch(`https://jusos-content.herokuapp.com/api/menus/menu?nested`);
  const menuDataJson = await menuData.json();

  JSON.stringify(menuDataJson,(key,value) => 
    {if (key=="url") endpointsToFetch.push(value)
    return(value)}
    )

  //fetch the different components attributed to the endpoints of the menu

  for(let endpoint of endpointsToFetch){
    const data= await fetch (`https://jusos-content.herokuapp.com/api${endpoint}?populate=*`);
    const json= await data.json()
    slug0List.push(json)
  }

  //get the items with null out of the array
  let slug0ListFiltered= slug0List.filter((item) => item.data)

  const slugs= slug0ListFiltered.map((item)=>{

      const attribute= item.data.attributes

      if(attribute.slug== "artikel"){
        slug1List.push(attribute.children.data)
      }
      return attribute.slug
  })
  //create an object of the form {displayedSlugs: data}

  slugs.forEach((item, index)=>{
    rewriteObject[item] = slug0ListFiltered[index];
  })

  //push the data of the nested pages into the rewrite object

  slug1List[0].forEach((item)=>{
    rewriteObject[[`artikel`,`${item.id}`]]= item;
  })

  const displayedSlug= context.params.slug;
   const data= rewriteObject[displayedSlug]

  return {
    props: {
      menuData: menuDataJson,
      data: data,
    }
  }
}
