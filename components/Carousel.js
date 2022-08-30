import React,{useEffect} from 'react'
import useCounter from '../hooks/useCounter'
import Image from 'next/image'
import carcss from '../styles/component-modules/carousel.module.scss'

/*carouselData:{
        length (integer)
        onClick? (boolean)
        automatic? (boolean)
        timeout (integer)
        image source (array)
        image alt (string)
        dots? (boolean)
        styles:{
            button-type
            dots
        }
    } */

const Carousel = ({carouselData}) => {
    const data= carouselData
    
    const  [handleChange, current, next, previous, reduceBoolean]= useCounter(data.length);

if(data.automatic!==false){
  useEffect(()=>{
    const timer = setTimeout(() => {
       handleChange(1);
     }, data.delay);
     return () => clearTimeout(timer);
  },
  [current])
}


  return (
    <>
          <button onClick={()=>{handleChange(-1+ data.length)}}
          className={carcss.button1+" "+ data.buttonType}>
          &#60;
          </button>

         {data.dataSource.map((item, index)=>{
          if(data.length==2){
            return(      
              <div className={
                   index==current? carcss.current:  carcss.next2}  key={index}>
              
              {<Image
               src={item} 
               alt={data.imageAlt}
               layout="fill"
               objectFit='cover'
               priority
              />}
         
            </div>

             )
          }
              return(      
               <div className={
                    index==current? carcss.current: 
                    index==next? reduceBoolean? carcss.nextreduce: carcss.next: 
                    index==previous? reduceBoolean? carcss.previousreduce: carcss.previous:
                    "none"}  key={index}>
               
               {<Image
                src={item} 
                alt={data.imageAlt}
                layout="fill"
                objectFit='cover'
                priority
               />}
          
             </div>

              )
         })}

         <button onClick={()=>{handleChange(1)}}
        className={carcss.button2+ " " + data.buttonType}>
             &#60;
             </button>

         <div className={carcss.dotcontainer}>
         {data.dataSource.map((item, index)=> {
                return (
                <div className={data.dots? carcss.dots+" "+ (index== current? carcss.dotsactive: ""): "none"} 
                key={index}></div>)  
             
             })}
         </div>


    </>
  )
}

export default Carousel