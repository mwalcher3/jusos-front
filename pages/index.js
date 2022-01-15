
import Description from '../components/Description'

export const getStaticProps= async ()=>{
  const res= await fetch(`https://jusos-content.herokuapp.com/api/abouts`)
  const json= await res.json()
  
  //const res1= await fetch(`https://jusos-content.herokuapp.com/api/articles`)
 // const json1= await res1.json()
  
  return {
    props: {text: json,
      //article: json1
    }
  }
}

export default function Home({text}) {
  console.log(text)

  return (
     <div>
       <Description data={text}/>
       
    
    </div>

  )
 }

