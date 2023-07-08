import React, {useState} from 'react'

const useCounter = (length) => {
    const [current, setCurrent]= useState(0);
    const [next, setNext]= useState(1);
    const [previous, setPrevious]= useState(length-1)
    const [reduceBoolean, setReduceBoolean]= useState(false);

     
    const handleChange= (number)=>{
        setCurrent(currentCount => (currentCount+number)%length)
        setNext((current+2*number)%length)
        setPrevious(current)
          if(number==1){
          setReduceBoolean(false)
          }
          else{setReduceBoolean(true)}
     }  

     /* if number is 1 counter will increment, if it is -1+length it will decrement */
  return (
    [handleChange, current, next, previous, reduceBoolean]
  )
}

export default useCounter