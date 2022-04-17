import {useState} from 'react'

const useToggle = (defaultValue) => {
   const [value, setValue]= useState(defaultValue);

   const toggleValue= (valuePassedIntoThisFuction)=>{
       setValue(currentValue=> typeof valuePassedIntoThisFuction === 'boolean'? value: !currentValue)
   }

  return [value, toggleValue]
}

export default useToggle