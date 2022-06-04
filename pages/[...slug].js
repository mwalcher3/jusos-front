import React from 'react'
import {useRouter} from 'next/router'
import Articles from '../components/Articles'
import SingleArticles from '../components/Articles/SingleArrticles'
import Layout from '../components/Layout'


const Slugs = ({data, menuData}) => {
  
    const router= useRouter();
    const {slug = []} = router.query;

    if(slug[0]=="articles"){
      
      if (slug[1] && slug[1]== data.data.id){
        return (<Layout menuData={menuData}>
          <SingleArticles data={data}/>
          </Layout>)
      } 

      return (<Layout menuData={menuData}>
        <Articles article={data}/>
      </Layout>)
      
    }
    
}

export default Slugs




export async function getStaticPaths(){
  const res= await fetch(`https://jusos-content.herokuapp.com/api/articles`)
    const json= await res.json()
    const IdParams= json.data.map((item)=>{
      return {
        params:{slug:['articles', `${item.id}`]}
      }
    })

  return{
    paths: [
      { params: {slug: ['articles'] } },
     ...IdParams,
    ],
      fallback: false
  }
}

export const getStaticProps= async (context)=>{
 const slug= context.params.slug;

 const endpoints= slug.map((item)=>{
   return `${item}/`
 })


  const response= await fetch(`https://jusos-content.herokuapp.com/api/${endpoints.join("")}?populate=*`);
  const resJson= await response.json();

  const menuData= await fetch(`https://jusos-content.herokuapp.com/api/menus/menu?nested`);
  const menuDataJson = await menuData.json();

  return {
    props: {
      data: resJson,
      menuData: menuDataJson
    }
  }
}




