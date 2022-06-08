import React from 'react'
import {useRouter} from 'next/router'
import Articles from '../components/Articles'
import SingleArticles from '../components/Articles/SingleArticles'
import Layout from '../components/Layout'


const Slugs = ({ menuData, data}) => {
  
    const router= useRouter();
    const {slug = []} = router.query;

    if(slug[0]=="artikel"){

      if(slug[1] && slug[1] == data.data.id){
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

     else if(slug[0]=="geschichte"){
       return <div>hello</div>
     }

     else if(slug[0]== "teilnehmen"){
       return <div>teilnehmen</div>
     }

}

export default Slugs




export async function getStaticPaths(){

  const slug0List=[]
  const slug1List=[]
    
//fetch all possible enpoints out of the menu to get access to the possible page components

  const menuData= await fetch(`https://jusos-content.herokuapp.com/api/menus/menu?nested`);
  const menuDataJson = await menuData.json();

  const endpointsToFetchNested= 
   menuDataJson.menu.items.map((item)=>{
   return item.children.map((child)=>{
      return child.url
    })
  })

  let endpointsToFetch= endpointsToFetchNested.flat();

  //fetch the different compontents attributed to the endpoints of the menu


  for(let endpoint of endpointsToFetch){
    const data= await fetch (`https://jusos-content.herokuapp.com/api${endpoint}?populate=*`);
    const json= await data.json()
    slug0List.push(json)
  }

  //return the slugs of the data, if they exist


  let slug0ListFiltered= slug0List.filter((item)=>{
    return item.data!=null;
  })
  
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
    const slug1List=[]
    const slug0List=[]
    const rewriteObject= {}

  //first part the same as in the getStaticPath function to get access to the englisch slugs attributed
  //to the displayed slugs in german

  const menuData= await fetch(`https://jusos-content.herokuapp.com/api/menus/menu?nested`);
  const menuDataJson = await menuData.json();

  const endpointsToFetchNested= 
   menuDataJson.menu.items.map((item)=>{
   return item.children.map((child)=>{
      return child.url
    })
  })

  let endpointsToFetch= endpointsToFetchNested.flat();

  //fetch the different compontents attributed to the endpoints of the menu

  for(let endpoint of endpointsToFetch){
    const data= await fetch (`https://jusos-content.herokuapp.com/api${endpoint}?populate=*`);
    const json= await data.json()
    slug0List.push(json)
  }


  const slugs= slug0List.map((item)=>{
    if(item.data!=null) {
      const attribute= item.data.attributes

   //push the data for nested pages, like articles into the slug1List

      if(attribute.slug== "artikel"){
        slug1List.push(attribute.children.data)
      }

      //return the slugs written in the data, if they exist
      return attribute.slug
    }
    
    else return null
  })
  

  //create an object of the form {displayedSlugs: FetchingSlugs}

  slugs.forEach((item, index)=>{
    rewriteObject[item] = endpointsToFetch[index];
  })

  //push the slugs of the nested pages into the rewrite object

  slug1List[0].forEach((item)=>{
    rewriteObject[[`artikel`,`${item.id}`]]= `/articles/${item.id}`;
  })


  const displayedSlug= context.params.slug;
//fetch the data of the url displayed on the screen by accessing 
//the corresponding endpointToFetch out of the rewrite object

   const response= await fetch(`https://jusos-content.herokuapp.com/api${rewriteObject[displayedSlug]}?populate=*`);
   const responseJson= await response.json();


  return {
    props: {
      menuData: menuDataJson,
      data: responseJson,
    }
  }
}


