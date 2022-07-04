import slidercss from'../styles/slider.module.scss'
import {useState} from 'react'

const Slider = ({data}) => {  

    const length= data.data.length
    const [currentSlide, setCurrentSlide]= useState(0);
    const [next, setNext]= useState(1);
    const [previous, setPrevious]= useState(4)
    const [reduceBoolean, setReduceBoolean]= useState(false);
    
    const handleClick= (number)=>{
        setCurrentSlide(currentCount => (currentCount+number)%length)
        setNext((currentSlide+2*number)%length)
        setPrevious(currentSlide)
    }
    
    
return <div className={slidercss.mainslider}>

       <button onClick={()=>{
           handleClick(-1+ length);
           setReduceBoolean(true);
       }} className={slidercss.button1}>&#60;</button>


       {data.data.map((item, index)=>{
           return(
           <div className={
            index==currentSlide? slidercss.current: 
            index==next? reduceBoolean? slidercss.nextreduce: slidercss.next: 
            index==previous? reduceBoolean? slidercss.previousreduce: slidercss.previous :
            slidercss.none} 

              key={item.id}
              >
                  <div className={slidercss.sliderboxes}>
                  <h3>{item.attributes.title}</h3>
               <p>{index}</p>
               <p>{item.attributes.textboxes}</p>
               </div>
            
           </div>)

       })}
      

      <button onClick={()=>{
          handleClick(1);
          setReduceBoolean(false)
      }} className={slidercss.button1 + " " + slidercss.button2}>&#60;</button>
      </div>;
};

export default Slider;
