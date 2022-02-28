
import Description from '../components/Description'
import Slider from '../components/Slider'

export const getStaticProps= async ()=>{
  const res= await fetch(`https://jusos-content.herokuapp.com/api/abouts`)
  const json= await res.json()
  
  const resSlider= await fetch(`https://jusos-content.herokuapp.com/api/sliders`)
  const jsonSlider= await resSlider.json()
  
  return {
    props: {text: json,
       sliderData: jsonSlider
    }
  }
}

export default function Home({text, sliderData}) {

  return (
     <div>
       
       <Description data={text}/>
       <Slider data={sliderData}/> 
    </div>

  )
 }

