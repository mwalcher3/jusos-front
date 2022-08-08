import React from 'react'
import PopUp from './PopUp'

const TopicsGeneral = ({data}) => {
    const dataAttributes= data.data.attributes
    console.log(data);
  return (
    <div>
      <PopUp />
       topics general
        </div>
  )
}

export default TopicsGeneral