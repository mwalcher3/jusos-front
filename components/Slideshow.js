import slideshowcss from '../styles/component-modules/slideshow.module.scss'
import {useState, useEffect} from 'react'
import Image from 'next/image'
import useCounter from '../hooks/useCounter'
import {global} from '../pages/_app'

const Slideshow = ({data}) => {
     const dataLength= 3
     const  [handleChange, current, next, previous, reduceBoolean]= useCounter(dataLength);

  useEffect(()=>{
       const timer = setTimeout(() => {
          handleChange(1);
        }, 5000);
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

         {data.data.map((item, index)=>{
              return(      
               <div className={
                    index==current? slideshowcss.current: 
                    index==next? reduceBoolean? slideshowcss.nextreduce: slideshowcss.next: 
                    index==previous? reduceBoolean? slideshowcss.previousreduce: slideshowcss.previous :
                    slideshowcss.none}  key={index}>
               
               {<Image
                src={`${global.host}${item.attributes.url}`} 
                alt={item.attributes.alternativeText}
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
         {data.data.map((item, index)=> {return (
         <div className={slideshowcss.dots+" "+ (index== current? slideshowcss.dotsactive: "")} key={index}></div>)})}
         </div>

         </div>

    </div>
  )
}

export default Slideshow