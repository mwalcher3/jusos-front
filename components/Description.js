import aboutcss from '../styles/about.module.scss'
import{useRef, useEffect, useState} from 'react'
import Navbar from '../components/Navbar'

const Description = ({data}) => {
   /*const imageRef= useRef()
   const [intersection, setIntersection]= useState(false);

   const options={
        threshold: 0.7,
    }

     useEffect(()=>{
        const imageObserver= new IntersectionObserver((entries)=>{
            entries.map((entry)=>{
                if(entry.isIntersecting){
                    setIntersection(true)
                }
                else{
                    setIntersection(false)
                }
                console.log(intersection)
            })
        }, options)

        imageObserver.observe(imageRef.current)
    })*/

    return (
        <div className={aboutcss.main}>
            <img className={aboutcss.spaziergang}
            src="JusosSpaziergangCroped.jpg" 
            alt="Spaziergang">
            </img>
            {data.data.map((item)=>{
                return(
                  <div key= {item.id} className={aboutcss.überuns}>
                      <div>
                      <h2>{item.attributes.Title}</h2>
                      </div>
                      <div>
                      {item.attributes.Text}
                      </div>
                  </div>
                )
            })}

        </div>
    )
}

export default Description