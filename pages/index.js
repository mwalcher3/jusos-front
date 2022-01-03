import useFetch from '../hooks/useFetch'

export default function Home() {

  const {data, loading} = useFetch('https://jusos-content.herokuapp.com/api/articles')
  console.log(data)

 if(loading){
    return( <p>still loading</p>)
  }
  else{
  return (
     <div>
        {data.data.map((item)=>{
        return (
         item.attributes.article)
      })}  
    </div>
  )
 }
}
