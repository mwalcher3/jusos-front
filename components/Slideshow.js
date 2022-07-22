import slideshowcss from '../styles/slideshow.module.scss'
import {useState, useEffect} from 'react'
import Image from 'next/image'
import useCounter from '../hooks/useCounter'

const Slideshow = () => {
     const dataLength= 3
     const  [handleChange, current, next, previous, reduceBoolean]= useCounter(dataLength);
     const imageSource=["/image-2.jpg", "/image-1.jpg", "/image-3.jpg"]

  useEffect(()=>{
       const timer = setTimeout(() => {
          handleChange(1);
        }, 3000);
        return () => clearTimeout(timer);
     },
     [current])


  return (
    <div className={slideshowcss.maincontainer}>
         <div className={slideshowcss.imagecontainer}>

        <div>
          <button onClick={()=>{handleChange(-1+ dataLength)}}
          className={slideshowcss.button1}>
          &#60;
          </button>
          </div>

         {imageSource.map((item, index)=>{
              return(      
               <div className={
                    index==current? slideshowcss.current: 
                    index==next? reduceBoolean? slideshowcss.nextreduce: slideshowcss.next: 
                    index==previous? reduceBoolean? slideshowcss.previousreduce: slideshowcss.previous :
                    slideshowcss.none}  key={index}>
               
               {<Image
                src={item} 
                alt="Spaziergang"
                layout="fill"
                objectFit='cover'
                priority
               />}
          
             </div>

              )
         })}

         <div>
         <button onClick={()=>{handleChange(1)}}
        className={slideshowcss.button2}>
             &#60;
             </button>
         </div>

         <div className={slideshowcss.dotcontainer}>
         {imageSource.map((item, index)=> {return (
         <div className={slideshowcss.dots+" "+ (index== current? slideshowcss.dotsactive: "")} key={index}></div>)})}
         </div>

         </div>

    </div>
  )
}

export default Slideshow