import React from 'react'
import slidercss from'../../styles/component-modules/slider.module.scss'
import useCounter from '../../hooks/useCounter'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";

const Slider = ({data}) => {  

    const dataLength= data.data.length;
    const  [handleChange, current, next, previous, reduceBoolean]= useCounter(dataLength);

    
return <div className={slidercss.mainslider}>

       <button onClick={()=>{
           handleChange(1)}} 
           className={slidercss.button1}>&#60;</button>


       {data.data.map((item, index)=>{
           return(
           <div className={
            index==current? slidercss.current: 
            index==next? reduceBoolean? slidercss.nextreduce: slidercss.next: 
            index==previous? reduceBoolean? slidercss.previousreduce: slidercss.previous :
            "none"} 

              key={item.id}
              >
                  <div className={slidercss.sliderboxes}>
                  <h3><ReactMarkdown rehypePlugins={[rehypeRaw]}>{item.attributes.title}</ReactMarkdown></h3>
               <p>{index}</p>
               <ReactMarkdown rehypePlugins={[rehypeRaw]}>{item.attributes.textBoxes}</ReactMarkdown>
               </div>
            
           </div>)

       })}
      

      <button onClick={()=>{
        handleChange(-1+ dataLength);}} 
          className={slidercss.button1 + " " + slidercss.button2}>&#60;</button>
      </div>;
};

export default Slider;
