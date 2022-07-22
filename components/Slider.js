import slidercss from'../styles/slider.module.scss'
import {useState, useEffect} from 'react'
import useCounter from '../hooks/useCounter'

const Slider = ({data}) => {  

    const dataLength= data.data.length;
    const  [handleChange, current, next, previous, reduceBoolean]= useCounter(dataLength);

    
return <div className={slidercss.mainslider}>

       <button onClick={()=>{
           handleChange(-1+ length);}} 
           className={slidercss.button1}>&#60;</button>


       {data.data.map((item, index)=>{
           return(
           <div className={
            index==current? slidercss.current: 
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
          handleChange(1);}} 
          className={slidercss.button1 + " " + slidercss.button2}>&#60;</button>
      </div>;
};

export default Slider;
