import slideshowcss from '../styles/slideshow.module.scss'
import {useState, useEffect} from 'react'
import Image from 'next/image'
import sleep from '../hooks/sleep'

const Slideshow = () => {
     const imageSource=["/image-2.jpg", "/image-1.jpg", "/image-3.jpg"]


     const length= 3
    const [currentSlide, setCurrentSlide]= useState(0);
    const [next, setNext]= useState(1);
    const [previous, setPrevious]= useState(length)
    const [reduceBoolean, setReduceBoolean]= useState(false);

    

    const handleClick= (number)=>{
     setCurrentSlide(currentCount => (currentCount+number)%length)
     setNext((currentSlide+2*number)%length)
     setPrevious(currentSlide)
  }

useEffect(()=>{
     // const asyncFunction= async (number) =>{
          // while(length) {
               // await sleep(3000);
          //  }
     //   asyncFunction()
       const timer = setTimeout(() => {
          handleClick(1);
          setReduceBoolean(false)
        }, 3000);
        return () => clearTimeout(timer);
     },
     [currentSlide])
  

  useEffect(()=>{
     console.log("current:",currentSlide)
          console.log("next one:",next);
          console.log("previous one:",previous)

  },[currentSlide])
  



  return (
    <div className={slideshowcss.maincontainer}>
         <div className={slideshowcss.imagecontainer}>

        <div>
          <button onClick={()=>{handleClick(-1+ length) 
                          setReduceBoolean(true)}}
          className={slideshowcss.button1}>
          &#60;
          </button>
          </div>

         {imageSource.map((item, index)=>{
              return(      
               <div className={
                    index==currentSlide? slideshowcss.current: 
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
         <button onClick={()=>{handleClick(1)
                          setReduceBoolean(false)}}
        className={slideshowcss.button2}>
             &#60;
             </button>
         </div>

         <div className={slideshowcss.dotcontainer}>
         {imageSource.map((item, index)=> {return (<div className={slideshowcss.dots} key={index}></div>)})}
         </div>

         </div>

    </div>
  )
}

export default Slideshow